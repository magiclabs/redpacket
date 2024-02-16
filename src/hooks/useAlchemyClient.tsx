import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy'
import { useQuery } from '@tanstack/react-query'
// @ts-ignore
import { MagicSigner } from '@alchemy/aa-signers/magic'
import {
  ALCHEMY_GASMANAGER_POLICY_ID,
  ALCHEMY_RPC_URL,
  CURRENT_CHAIN,
  CURRENT_CHAIN_KEY,
} from 'lib/constants'
import { magic } from 'lib/magic'
import { useAccount } from 'wagmi'

export function useAlchemyClient() {
  const { address } = useAccount()

  const { data, ...rest } = useQuery({
    queryKey: ['alchemyClient', address],
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
    enabled: !!address,
  })

  return {
    client: data,
    ...rest,
  }
}
