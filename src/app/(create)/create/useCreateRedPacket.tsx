'use client'

import {
  QueryObserver,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { CHAINS } from 'config/client'
import { CURRENT_CHAIN_KEY, REDPACKET_FACTORY_ABI } from 'lib/constants'
import { publicClient } from 'lib/viem/publicClient'
import ms from 'ms'
import {
  decodeEventLog,
  parseEther,
  type SimulateContractReturnType,
} from 'viem'
import { useAccount, useEstimateFeesPerGas, useSimulateContract, useWriteContract } from 'wagmi'

type Params = {
  isValid: boolean
  eth: number
  packets: number
}

export function useCreateRedPacket({ eth, packets, isValid }: Params) {
  const { writeContractAsync, isPending } = useWriteContract()

  const { address } = useAccount()

  const fees = useEstimateFeesPerGas({ chainId: CHAINS[CURRENT_CHAIN_KEY].chain.id})

  const { data, queryKey } = useSimulateContract({
    address: CHAINS[CURRENT_CHAIN_KEY].getRedPacketFactoryAddress(),
    abi: REDPACKET_FACTORY_ABI,
    functionName: 'createRedPacket',
    args: [packets],
    value: isValid ? parseEther(`${eth}`) : undefined,
    query: {
      enabled: isValid,
    },
    maxFeePerGas: fees.data?.maxFeePerGas,
    maxPriorityFeePerGas: fees.data?.maxPriorityFeePerGas,
  })

  const client = useQueryClient()

  const { mutateAsync: getRedPacketAddress, isPending: isGenerating } =
    useMutation({
      mutationFn: () =>
        new Promise<string>(async (resolve, reject) => {
          const unwatch = publicClient.watchContractEvent({
            pollingInterval: ms('1s'),
            address: CHAINS[CURRENT_CHAIN_KEY].getRedPacketFactoryAddress(),
            abi: REDPACKET_FACTORY_ABI,
            eventName: 'RedPacketCreated',
            args: { creator: address },
            batch: false,
            onLogs: (logs) => {
              const topics = decodeEventLog({
                abi: REDPACKET_FACTORY_ABI,
                data: logs[0].data,
                topics: logs[0].topics,
              })

              resolve((topics.args as any).redPacketAddress as string)
              unwatch()
            },
            onError: (error) => {
              console.error(error)
              unwatch()
              reject(error)
            },
          })
          console.log({ address })
        }),
    })

  const { mutateAsync: createRedPacket } = useMutation({
    mutationFn: () =>
      new Promise<string>(async (resolve, reject) => {
        const result = client.getQueryData<SimulateContractReturnType>(queryKey)
        try {
          if (result) {
            const hash = await writeContractAsync(result.request)
            const address = await getRedPacketAddress()
            resolve(address)
            return
          }

          const unsubscribe = new QueryObserver<SimulateContractReturnType>(
            client,
            { queryKey },
          ).subscribe(async ({ isSuccess, data }) => {
            if (isSuccess) {
              const hash = await writeContractAsync(data.request)
              const address = await getRedPacketAddress()
              resolve(address)
              unsubscribe()
            }
          })
        } catch (error) {
          reject(error)
        }
      }),
  })

  return {
    isWaitingApproval: isPending,
    isGenerating,
    createRedPacket,
  }
}
