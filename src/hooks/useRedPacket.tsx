'use client'

import { REDPACKET_ABI } from 'lib/constants'
import ms from 'ms'
import { type Address } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

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

export function useRedPacket({ contractAddress }: Params) {
  const { address } = useAccount()

  const { data, ...rest } = useReadContract({
    account: address,
    address: contractAddress,
    abi: REDPACKET_ABI,
    functionName: 'getMetadata',
    query: {
      refetchInterval: ms('5s'),
      refetchIntervalInBackground: true,
    },
  })

  return {
    metadata: data! as GetMetadataResponse,
    ...rest,
  }
}
