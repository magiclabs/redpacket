'use client'

import { REDPACKET_ABI } from 'lib/constants'
import ms from 'ms'
import { formatEther, type Address } from 'viem'
import { useReadContracts } from 'wagmi'

type Params = {
  contractAddress: Address
  refetch?: boolean
}

export function useRedPacket({ contractAddress, refetch = false }: Params) {
  const contract = {
    address: contractAddress,
    abi: REDPACKET_ABI,
  }

  const { data, isSuccess, ...rest } = useReadContracts({
    contracts: [
      { ...contract, functionName: `totalClaimCount` },
      { ...contract, functionName: `getClaimedCount` },
      { ...contract, functionName: `totalBalance` },
      { ...contract, functionName: `getCurrentBalance` },
      { ...contract, functionName: `getClaimedAddresses` },
      { ...contract, functionName: `expired` },
      { ...contract, functionName: `creator` },
    ],
    ...(refetch
      ? {
          query: {
            refetchInterval: ms('5s'),
            refetchIntervalInBackground: true,
          },
        }
      : {}),
  })

  const totalClaimCount = isSuccess ? Number(data?.[0].result) : 0

  const totalBalance =
    isSuccess && data?.[2].result
      ? Number(formatEther(data?.[2].result as bigint))
      : 0

  const remainingPackets =
    isSuccess && data?.[0].result
      ? Number((data?.[0].result as bigint) - (data[1].result as bigint))
      : 0

  const remainingBalance =
    isSuccess && data?.[3].result
      ? Number(formatEther(BigInt(Number(data?.[3].result))))
      : 0

  const claimedAddresses = (isSuccess ? data?.[4].result : []) as Address[]

  const isExpired = isSuccess ? data?.[5].result : false

  return {
    totalClaimCount,
    totalBalance,
    remainingPackets,
    remainingBalance,
    isExpired,
    isSuccess,
    claimedAddresses,
    ...rest,
  }
}
