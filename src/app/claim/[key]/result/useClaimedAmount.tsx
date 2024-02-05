import { useQuery } from '@tanstack/react-query'
import { useAlchemyClient } from 'app/claim/[key]/useAlchemyClient'
import { REDPACKET_ABI } from 'lib/constants'
import { useParams } from 'next/navigation'
import { type Address } from 'viem'

export function useClaimedAmount() {
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { client, publicAddress, isSuccess: enabled } = useAlchemyClient()

  const { data, isSuccess } = useQuery({
    queryKey: ['claimedAmount', publicAddress],
    queryFn: async () => {
      const claimedAmount = await client?.readContract({
        address: contractAddress,
        abi: REDPACKET_ABI,
        functionName: `getClaimedAmount`,
      })

      return claimedAmount as bigint
    },
    enabled,
  })

  const claimedAmount = isSuccess ? data! : 0n

  return {
    claimedAmount,
    isSuccess,
  }
}
