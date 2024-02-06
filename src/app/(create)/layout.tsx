'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { DemoByMagic } from 'app/DemoByMagic'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { useRouter } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function CreateLayout({ children }: PropsWithChildren) {
  const { push } = useRouter()
  const { isConnecting, isConnected, isReconnecting } = useAccount()

  useEffect(() => {
    if (isConnecting || isReconnecting) {
      return
    }

    if (isConnected) {
      push('/create')
    }
  }, [isConnected, push])

  if (isConnecting || isReconnecting) {
    return <></>
  }

  return (
    <main className="relative flex h-dvh w-full max-w-full flex-col items-center overflow-x-hidden">
      <BackLanturns />
      <RedFocus />
      <WalletDropdown />

      {children}

      <DemoByMagic />
    </main>
  )
}
