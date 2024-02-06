'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { CURRENT_CHAIN } from 'lib/constants'
import { projectId, wagmiConfig } from 'lib/web3modal/config'
import { type PropsWithChildren } from 'react'
import { WagmiProvider, type State } from 'wagmi'

createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  defaultChain: CURRENT_CHAIN,
})

type Props = PropsWithChildren<{
  initialState?: State
}>

export function Web3ModalProvider({ children, initialState }: Props) {
  return (
    <WagmiProvider
      config={wagmiConfig}
      initialState={initialState}
      reconnectOnMount={true}
    >
      {children}
    </WagmiProvider>
  )
}
