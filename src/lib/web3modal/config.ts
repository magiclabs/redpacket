import { coinbaseWallet, injected, walletConnect } from '@wagmi/connectors'
import { PROD_URL } from 'config/url'
import {
  ALCHEMY_RPC_URL,
  CURRENT_CHAIN,
  CURRENT_CHAIN_KEY,
} from 'lib/constants'
import { magic } from 'lib/magic'
import { createMagicConector } from 'lib/wagmi/magicConnector'
import { createClient } from 'viem'
import { cookieStorage, createConfig, createStorage, http } from 'wagmi'

export const projectId = `28adeacdce0cf960683ec30543294091`

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Red Packet',
  description: 'Red Packet',
  url: PROD_URL,
  icons: [`${PROD_URL}/apple-icon.png`],
}

export const wagmiConfig = createConfig({
  chains: [CURRENT_CHAIN],
  client({ chain }) {
    return createClient({
      chain,
      transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY]),
    })
  },
  connectors: [
    walletConnect({
      projectId,
      metadata,
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: 'Red Packet',
      appLogoUrl: `${PROD_URL}/apple-icon.png`,
    }),
    createMagicConector({ magic }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
