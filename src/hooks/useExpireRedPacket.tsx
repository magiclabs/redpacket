'use client'

import { find, map, pipe } from '@fxts/core'
import { useMutation } from '@tanstack/react-query'
import { REDPACKET_ABI } from 'lib/constants'
import { publicClient } from 'lib/viem/publicClient'
import ms from 'ms'
import { useState } from 'react'
import {
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  decodeEventLog,
  formatEther,
  type Address,
} from 'viem'
import { useWriteContract } from 'wagmi'

type Params = {
  id: string
}

type RedPacketExpiredEventArgs = {
  creator: Address
  remainingBalance: bigint
}

export function useExpireRedPacket() {
  const { writeContractAsync } = useWriteContract()
  const [lastTxHash, setLastTxHash] = useState('')

  const { mutateAsync: expireRedPacket, ...rest } = useMutation({
    mutationFn: ({ id }: Params) => {
      const contractAddress: Address = `0x${id}`

      return new Promise<string>(async (resolve, reject) => {
        const unwatch = publicClient.watchContractEvent({
          pollingInterval: ms('1s'),
          address: contractAddress,
          abi: REDPACKET_ABI,
          eventName: 'PacketExpired',
          batch: false,
          onLogs: (logs) => {
            console.log({ logs })
            const targetLog = pipe(
              logs,
              map((log) =>
                decodeEventLog({
                  abi: REDPACKET_ABI,
                  data: log.data,
                  topics: log.topics,
                }),
              ),
              find((v) => v.eventName === 'PacketExpired'),
            )

            if (!targetLog) {
              return
            }

            const remainingBalance = (
              targetLog.args as unknown as RedPacketExpiredEventArgs
            ).remainingBalance

            console.log({ remainingBalance })
            resolve(formatEther(remainingBalance))
            unwatch()
          },

          onError: (error) => {
            reject(error)
            unwatch()
          },
        })

        try {
          const hash = await writeContractAsync({
            address: contractAddress,
            abi: REDPACKET_ABI,
            functionName: 'expire',
          })
          setLastTxHash(hash)

          await publicClient.waitForTransactionReceipt({ hash })
        } catch (e) {
          if (e instanceof ContractFunctionRevertedError) {
            reject(new Error(e.reason))
          } else if (e instanceof ContractFunctionExecutionError) {
            reject(new Error(e.shortMessage.split('reason:')[1]))
          } else if (e instanceof Error) {
            reject(e)
          } else {
            reject('Unknown error')
          }

          unwatch()
        }
      })
    },
  })

  return {
    expireRedPacket,
    lastTxHash,
    ...rest,
  }
}
