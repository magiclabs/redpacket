import { getDefaultLightAccountFactoryAddress } from '@alchemy/aa-accounts'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import {
  getDefaultEntryPointAddress,
  type SmartAccountSigner,
} from '@alchemy/aa-core'
import { gasManagerPolicyId } from 'config/client'
import { getRpcUrl } from 'config/rpc'
import { useCallback, useState } from 'react'
import { type Address, type Chain } from 'viem'
import { baseSepolia } from 'viem/chains'

// const chain = sepolia

const chain: Chain = {
  ...baseSepolia,
  rpcUrls: {
    ...baseSepolia.rpcUrls,
    alchemy: {
      http: ['https://opt-sepolia.g.alchemy.com/v2'],
      webSocket: ['wss://opt-sepolia.g.alchemy.com/v2'],
    },
  },
}

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState(
    new AlchemyProvider({
      chain,
      rpcUrl: getRpcUrl(),
    }),
  )

  const connectProviderToAccount = useCallback(
    (signer: SmartAccountSigner, account?: Address) => {
      const connectedProvider = provider
        .connect((provider) => {
          return new LightSmartContractAccount({
            rpcClient: provider,
            owner: signer,
            chain,
            entryPointAddress: getDefaultEntryPointAddress(chain),
            factoryAddress: getDefaultLightAccountFactoryAddress(chain),
            accountAddress: account,
          })
        })
        .withAlchemyGasManager({
          policyId: gasManagerPolicyId,
        })

      setProvider(connectedProvider)
      return connectedProvider
    },
    [provider],
  )

  const disconnectProviderFromAccount = useCallback(() => {
    const disconnectedProvider = provider.disconnect()

    setProvider(disconnectedProvider)
    return disconnectedProvider
  }, [provider])

  return { provider, connectProviderToAccount, disconnectProviderFromAccount }
}
