import { coinbaseWallet, injected, walletConnect } from '@wagmi/connectors'
import { mumbai } from 'config/client'
import { PROD_URL } from 'config/url'
import { ALCHEMY_RPC_URL } from 'lib/constants'
import { magic } from 'lib/magic'
import { createMagicConector } from 'lib/wagmi/magicConnector'
import { isProd } from 'utils/isProd'
import { createClient } from 'viem'
import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { base } from 'wagmi/chains'

export const projectId = `28adeacdce0cf960683ec30543294091`

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Red Packet',
  description: 'Red Packet',
  url: PROD_URL,
  icons: [`${PROD_URL}/apple-icon.png`],
}

export const wagmiConfig = createConfig({
  ...(isProd()
    ? {
        chains: [base],
        client({ chain }) {
          return createClient({
            chain,
            transport: http(ALCHEMY_RPC_URL['base']),
          })
        },
      }
    : {
        chains: [mumbai],
        client({ chain }) {
          return createClient({
            chain,
            transport: http(ALCHEMY_RPC_URL['mumbai']),
          })
        },
      }),
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
