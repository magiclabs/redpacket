import { useMutation } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { useAlchemyClient } from 'hooks/useAlchemyClient'
import { useRedPacket } from 'hooks/useRedPacket'
import { REDPACKET_ABI } from 'lib/constants'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { encodeFunctionData, type Address } from 'viem'
import { useEstimateFeesPerGas } from 'wagmi'

export function useClaimPacket() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { metadata } = useRedPacket({
    contractAddress,
  })

  const { client, publicAddress } = useAlchemyClient()
  const { data: fees } = useEstimateFeesPerGas()

  const { mutateAsync: claim, ...rest } = useMutation({
    mutationFn: async () => {
      if (!client || !publicAddress || !metadata) return

      console.log({ publicAddress })

      try {
        console.log({ fees })
        const { hash } = await client.sendUserOperation({
          uo: {
            target: contractAddress,
            data: encodeFunctionData({
              abi: REDPACKET_ABI,
              functionName: 'claim',
              args: [publicAddress],
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
          userAddress: publicAddress,
          principalAmount: Number(metadata.principal),
        })

        push(`/claim/${key}/result`)
      } catch (e: any) {
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
