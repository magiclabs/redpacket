import { REDPACKET_ABI } from 'lib/constants'
import { formatEther, type Address } from 'viem'
import { useReadContracts } from 'wagmi'

type Params = {
  contractAddress: Address
  address?: Address
}

export function useRedPacket({ contractAddress, address }: Params) {
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
      address
        ? { ...contract, functionName: `claimedAmounts`, args: [address] }
        : {},
    ],
  })

  const totalClaimCount = isSuccess ? Number(data?.[0].result) : 0

  const totalBalance = isSuccess
    ? Number(formatEther(data?.[2].result as bigint))
    : 0

  const remainingPackets = isSuccess
    ? Number((data[0].result as bigint) - (data[1].result as bigint))
    : 0

  const remainingBalance = isSuccess
    ? Number(formatEther(BigInt(Number(data[3].result))))
    : 0

  const isExpired = isSuccess ? data[5].result : false

  const claimedAmounts = isSuccess ? data[6].result : 0

  console.log({
    // totalClaimCount,
    // totalBalance,
    // remainingPackets,
    // remainingBalance,
    // isExpired,
    claimedAmounts,
  })

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
