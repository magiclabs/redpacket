import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { URL } from 'config/url'
import { cookieStorage, createStorage } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

export const projectId = `28adeacdce0cf960683ec30543294091`

if (!projectId) throw new Error('Project ID is not defined')

export const wagmiConfig = defaultWagmiConfig({
  chains: [base, baseSepolia],
  projectId,
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
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
