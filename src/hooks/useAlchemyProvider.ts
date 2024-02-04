import { getDefaultLightAccountFactoryAddress } from '@alchemy/aa-accounts'
import {
  createAlchemySmartAccountClient,
  createLightAccountAlchemyClient,
} from '@alchemy/aa-alchemy'
import {
  getDefaultEntryPointAddress,
  type SmartAccountSigner,
} from '@alchemy/aa-core'
import { getRpcUrl } from 'config/rpc'
import { ALCHEMY_GASMANAGER_POLICY_ID, CURRENT_CHAIN } from 'lib/constants'
import { useCallback, useState } from 'react'
import { type Chain } from 'viem'

const chain: Chain = CURRENT_CHAIN

export const useAlchemyProvider = () => {
  const client = createAlchemySmartAccountClient({
    chain,
    rpcUrl: getRpcUrl(),
  })

  const [connectedClient, setConnectedClient] = useState<Awaited<
    ReturnType<typeof createLightAccountAlchemyClient>
  > | null>(null)

  const connectClientToAccount = useCallback(
    async (signer: SmartAccountSigner) => {
      const client = await createLightAccountAlchemyClient({
        rpcUrl: getRpcUrl(),
        owner: signer,
        chain,
        entrypointAddress: getDefaultEntryPointAddress(chain),
        factoryAddress: getDefaultLightAccountFactoryAddress(chain),
        gasManagerConfig: {
          policyId: ALCHEMY_GASMANAGER_POLICY_ID,
        },
      })

      setConnectedClient(client)
      return client
    },
    [client],
  )

  return {
    client,
    connectedClient,
    connectClientToAccount,
  }
}
