import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy'
// @ts-ignore
import { MagicSigner } from '@alchemy/aa-signers/magic'
import { useQuery } from '@tanstack/react-query'
import { useMagicInfo } from 'hooks/useMagicInfo'
import {
  ALCHEMY_GASMANAGER_POLICY_ID,
  ALCHEMY_RPC_URL,
  CURRENT_CHAIN,
  CURRENT_CHAIN_KEY,
} from 'lib/constants'
import { magic } from 'lib/magic'

export function useAlchemyClient() {
  const { data: result, ...rest1 } = useMagicInfo()

  const { data, ...rest } = useQuery({
    queryKey: ['alchemyClient', result?.publicAddress],
    queryFn: async () => {
      const owner = new MagicSigner({ inner: magic })

      await owner.authenticate({
        authenticate: () => Promise.resolve(),
      })

      const client = await createLightAccountAlchemyClient({
        rpcUrl: ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY],
        owner,
        chain: CURRENT_CHAIN,
        gasManagerConfig: {
          policyId: ALCHEMY_GASMANAGER_POLICY_ID[CURRENT_CHAIN_KEY],
        },
      })

      return client
    },
    enabled: !!result?.publicAddress,
  })

  const isSuccess = !!(result?.publicAddress && data)

  return {
    client: data,
    publicAddress: result?.publicAddress,
    isSuccess,
  }
}
