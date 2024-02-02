import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { URL } from 'config/url'
import { isProd } from 'utils/isProd'
import { cookieStorage, createStorage, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

export const projectId = `28adeacdce0cf960683ec30543294091`

if (!projectId) throw new Error('Project ID is not defined')

export const CURRENT_CHAIN = isProd() ? 'base' : 'baseSepolia'

export const wagmiConfig = defaultWagmiConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/tbH7VdREUS9E1caIfz0FMCO_DfdJSNZS`,
    ),
    [baseSepolia.id]: http(
      `https://base-sepolia.g.alchemy.com/v2/xtBmbqs4Xe17IVlF65vU6BmTEKLBybir`,
    ),
  },
  projectId,
  metadata: {
    name: 'Red Packet',
    description: 'Red Packet',
    url: URL,
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
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
