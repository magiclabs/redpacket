import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { URL } from 'config/url'
import { ALCHEMY_RPC_URL } from 'lib/constants'
import { isProd } from 'utils/isProd'
import { cookieStorage, createStorage, http } from 'wagmi'
import { base, polygonMumbai } from 'wagmi/chains'

export const projectId = `28adeacdce0cf960683ec30543294091`

if (!projectId) throw new Error('Project ID is not defined')

export const wagmiConfig = defaultWagmiConfig({
  ...(isProd()
    ? {
        chains: [base],
        trabsoirts: {
          [base.id]: http(ALCHEMY_RPC_URL['base']),
        },
      }
    : {
        chains: [polygonMumbai],
        transports: {
          [polygonMumbai.id]: http(ALCHEMY_RPC_URL['mumbai']),
        },
      }),
  projectId,
  metadata: {
    name: 'Red Packet',
    description: 'Red Packet',
    url: URL,
    icons: [`${URL}/apple-icon.png`],
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})
