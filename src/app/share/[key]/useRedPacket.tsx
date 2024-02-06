'use client'

import { REDPACKET_ABI } from 'lib/constants'
import ms from 'ms'
import { type Address } from 'viem'
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

  console.log({ data })

  const totalClaimCount = isSuccess ? Number(data?.[0].result) : 0

  const totalBalance = isSuccess
    ? 0
    : // ? Number(formatEther(data?.[2].result as bigint))
      0

  const remainingPackets = isSuccess
    ? 0 // Number((data[0].result as bigint) - (data[1].result as bigint))
    : 0

  const remainingBalance = isSuccess
    ? 0 //Number(formatEther(BigInt(Number(data[3].result))))
    : 0

  const isExpired = isSuccess ? data[5].result : false

  return {
    totalClaimCount,
    totalBalance,
    remainingPackets,
    remainingBalance,
    isExpired,
    isSuccess,
    ...rest,
  }
}
