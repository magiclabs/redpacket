'use client'

import { find, map, pipe } from '@fxts/core'
import { useMutation } from '@tanstack/react-query'
import { CHAINS } from 'config/client'
import { CURRENT_CHAIN_KEY, REDPACKET_FACTORY_ABI } from 'lib/constants'
import { publicClient } from 'lib/viem/publicClient'
import ms from 'ms'
import { useState } from 'react'
import { decodeEventLog, parseEther, type Address } from 'viem'
import { useAccount, useEstimateFeesPerGas, useWriteContract } from 'wagmi'

type Params = {
  totalClaimCount: number
  principal: number
}

type RedPacketCreatedEventArgs = {
  creator: Address
  redPacketAddress: Address
  totalBalance: bigint
  totalClaimCount: number
}

const CREATE_RED_PACKET_STATUS = {
  NONE: 'NONE',
  GENERATING: 'GENERATING',
  WAITING_APPROVAL: 'WAITING_APPROVAL',
  DONE: 'DONE',
} as const

export function useCreateRedPacket() {
  const [status, setStatus] = useState<keyof typeof CREATE_RED_PACKET_STATUS>(
    CREATE_RED_PACKET_STATUS.NONE,
  )

  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { data: fees } = useEstimateFeesPerGas()

  const { mutateAsync: createRedPacket, isSuccess } = useMutation({
    mutationFn: ({ totalClaimCount, principal }: Params) => {
      setStatus(CREATE_RED_PACKET_STATUS.GENERATING)

      return new Promise<Address>(async (resolve, reject) => {
        const unwatch = publicClient.watchContractEvent({
          pollingInterval: ms('1s'),
          address: CHAINS[CURRENT_CHAIN_KEY].getRedPacketFactoryAddress(),
          abi: REDPACKET_FACTORY_ABI,
          eventName: 'RedPacketCreated',
          args: { creator: address },
          batch: false,
          onLogs: (logs) => {
            const targetLog = pipe(
              logs,
              map((log) =>
                decodeEventLog({
                  abi: REDPACKET_FACTORY_ABI,
                  data: log.data,
                  topics: log.topics,
                }),
              ),
              find((v) => v.eventName === 'RedPacketCreated'),
            )

            if (!targetLog) {
              return
            }

            const redPacketAddress = (
              targetLog.args as unknown as RedPacketCreatedEventArgs
            ).redPacketAddress

            console.log({ redPacketAddress })
            resolve(redPacketAddress)
            unwatch()
          },

          onError: (error) => {
            reject(error)
            unwatch()
          },
        })

        try {
          const hash = await writeContractAsync({
            address: CHAINS[CURRENT_CHAIN_KEY].getRedPacketFactoryAddress(),
            abi: REDPACKET_FACTORY_ABI,
            functionName: 'createRedPacket',
            args: [totalClaimCount],
            value: parseEther(principal.toString()),
            maxFeePerGas: fees?.maxFeePerGas,
            maxPriorityFeePerGas: fees?.maxPriorityFeePerGas,
          })

          setStatus(CREATE_RED_PACKET_STATUS.WAITING_APPROVAL)
          await publicClient.waitForTransactionReceipt({ hash })
        } catch (e) {
          unwatch()
          reject(e)
        }
      })
    },
    onSuccess: () => {
      setStatus(CREATE_RED_PACKET_STATUS.DONE)
    },
    onError: () => {
      setStatus(CREATE_RED_PACKET_STATUS.NONE)
    },
  })

  return {
    createRedPacket,
    isIdle: status === CREATE_RED_PACKET_STATUS.NONE,
    isWaitingApproval: status === CREATE_RED_PACKET_STATUS.WAITING_APPROVAL,
    isGenerating: status === CREATE_RED_PACKET_STATUS.GENERATING,
    isSuccess,
  }
}
