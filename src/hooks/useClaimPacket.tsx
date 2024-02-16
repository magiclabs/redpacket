import { useMutation } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { useAlchemyClient } from 'hooks/useAlchemyClient'
import { REDPACKET_ABI } from 'lib/constants'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { encodeFunctionData, type Address } from 'viem'
import { useAccount, useEstimateFeesPerGas } from 'wagmi'

export function useClaimPacket() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { address } = useAccount()
  const { client } = useAlchemyClient()
  const { data: fees } = useEstimateFeesPerGas()

  const { mutateAsync: claim, ...rest } = useMutation({
    mutationKey: ['claim', address],
    mutationFn: async () => {
      if (!client || !address) return

      console.log({ address })

      try {
        console.log({ fees })
        const { hash } = await client.sendUserOperation({
          uo: {
            target: contractAddress,
            data: encodeFunctionData({
              abi: REDPACKET_ABI,
              functionName: 'claim',
              args: [address],
            }),
          },
          overrides: {
            callGasLimit: { percentage: 10 },
            maxFeePerGas: fees?.maxFeePerGas,
          },
        })

        console.log({ hash })
        await client.waitForUserOperationTransaction({ hash })

        track(`Red Packet Claimed`, {
          userAddress: address,
        })

        push(`/claim/${key}/result`)
      } catch (e: any) {
        console.error(e)
        const details = JSON.parse(e.details)
        toast.error(details.message)
        return
      }
    },
  })

  return {
    claim,
    ...rest,
  }
}
