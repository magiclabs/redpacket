'use client'

import { type Address } from '@alchemy/aa-core'
import Packet from 'components/Packet'
import { WalletContextProvider } from 'context/wallet'
import { usePathname } from 'next/navigation'

export default function Claim() {
  const contractAddress = usePathname()?.replace('/', '').replace('0x', '')

  return (
    <WalletContextProvider>
      <Packet contractAddress={contractAddress as Address} />
    </WalletContextProvider>
  )
}
