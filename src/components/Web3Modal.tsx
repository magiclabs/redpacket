'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { projectId, wagmiConfig } from 'lib/web3modal/config'
import { type PropsWithChildren } from 'react'
import { isProd } from 'utils/isProd'
import { base, baseSepolia } from 'viem/chains'
import { WagmiProvider, type State } from 'wagmi'

createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  defaultChain: isProd() ? base : baseSepolia,
})

type Props = PropsWithChildren<{
  initialState?: State
}>

export function Web3ModalProvider({ children, initialState }: Props) {
  return (
    <WagmiProvider
      config={wagmiConfig}
      initialState={initialState}
      // reconnectOnMount
    >
      {children}
    </WagmiProvider>
  )
}
