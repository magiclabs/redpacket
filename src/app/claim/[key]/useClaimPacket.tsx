import {
  type BatchUserOperationCallData,
  type UserOperationCallData
} from '@alchemy/aa-core'
import { useMutation } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { useRedPacket } from 'app/(create)/share/[key]/useRedPacket'
import { useAlchemyClient } from 'app/claim/[key]/useAlchemyClient'
import { REDPACKET_ABI } from 'lib/constants'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LightAccountABI } from 'src/abis/LightAccountABI'
import { encodeFunctionData, type Address } from 'viem'

export function useClaimPacket() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { totalBalance } = useRedPacket({
    contractAddress,
  })

  const { client, publicAddress } = useAlchemyClient()

  const { mutateAsync: claim, ...rest } = useMutation({
    mutationFn: async () => {
      if (!client || !publicAddress) return

      let uo: UserOperationCallData | BatchUserOperationCallData

      uo = {
        target: contractAddress,
        data: encodeFunctionData({
          abi: REDPACKET_ABI,
          functionName: 'claim',
        }),
      }

      try {
        const { hash } = await client.sendUserOperation(
          { uo, 
            overrides: {
              callGasLimit: { percentage: 5 },
              // maxFeePerGas: { percentage: 100 }, 
              maxPriorityFeePerGas: 50,
            } 
          }
        )
        const tx = await client.waitForUserOperationTransaction({ hash })
      } catch (e: any) {
        const details = JSON.parse(e.details)
        toast.error(details.message)
        return
      }

      push(`/claim/${key}/result`)

      let balance = await client.getBalance({ address: client.getAddress() })

      uo = [
        {
          target: client.account.address,
          data: encodeFunctionData({
            abi: LightAccountABI,
            functionName: 'addDeposit',
          }),
          value: balance,
        },
        {
          target: client.account.address,
          data: encodeFunctionData({
            abi: LightAccountABI,
            functionName: 'withdrawDepositTo',
            args: [publicAddress, balance],
          }),
        },
      ]

      const result = await client.sendUserOperation({ 
        uo, 
        overrides: {
          callGasLimit: { percentage: 5 },
          // maxFeePerGas: { percentage: 100 }, 
          maxPriorityFeePerGas: 50,
        } 
      })
      const tx2 = await client.waitForUserOperationTransaction({
        hash: result.hash,
      })

      track(`Red Packet Claimed`, {
        userAddress: publicAddress,
        claimedAmount: Number(balance),
        totalBalance: Number(totalBalance),
      })
    },
  })

  return {
    claim,
    ...rest,
  }
}
