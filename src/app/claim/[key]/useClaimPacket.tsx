import {
  type BatchUserOperationCallData,
  type UserOperationCallData,
} from '@alchemy/aa-core'
import { useMutation } from '@tanstack/react-query'
import { useAlchemyClient } from 'app/claim/[key]/useAlchemyClient'
import { CHAINS } from 'config/client'
import { CURRENT_CHAIN_KEY, REDPACKET_ABI } from 'lib/constants'
import { useParams, useRouter } from 'next/navigation'
import { LightAccountABI } from 'src/abis/LightAccountABI'
import { encodeFunctionData, type Address } from 'viem'

export function useClaimPacket() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

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

      const { hash } = await client.sendUserOperation({ uo })
      const tx = await client.waitForUserOperationTransaction({ hash })

      console.log(CHAINS[CURRENT_CHAIN_KEY].getTxURL(tx))

      push(`/claim/${key}/result`)

      let balance = await client.getBalance({ address: client.getAddress() })

      console.log({ balance })

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

      const result = await client.sendUserOperation({ uo })
      const tx2 = await client.waitForUserOperationTransaction({
        hash: result.hash,
      })

      console.log(`Finished`)
    },
  })

  return {
    claim,
    ...rest,
  }
}
