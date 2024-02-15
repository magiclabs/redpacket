'use client'

import { useQuery } from '@tanstack/react-query'
import { useAlchemyClient } from 'hooks/useAlchemyClient'
import { REDPACKET_ABI } from 'lib/constants'
import ms from 'ms'
import { type Address } from 'viem'

type Params = {
  contractAddress: Address
  refetch?: boolean
}

type GetMetadataResponse = {
  totalClaimCount: bigint
  remainingCount: bigint
  principal: bigint
  balance: bigint
  claimedAmount: bigint
  isClaimed: boolean
  isExpired: boolean
}

export function useRedPacket({ contractAddress, refetch = false }: Params) {
  const { client, isSuccess: enabled } = useAlchemyClient()

  const { data, ...rest } = useQuery({
    queryKey: ['red-packet', contractAddress, client?.account.address],
    queryFn: async () => {
      const metadata = (await client!.readContract({
        address: contractAddress,
        abi: REDPACKET_ABI,
        functionName: 'getMetadata',
      })) as GetMetadataResponse

      return metadata
    },
    ...(refetch && {
      refetchInterval: ms('5s'),
      refetchIntervalInBackground: true,
    }),
    enabled,
  })

  return {
    metadata: data!,
    ...rest,
  }
}
