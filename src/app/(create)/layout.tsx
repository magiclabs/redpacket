'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { DemoByMagic } from 'app/DemoByMagic'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export default function CreateLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <main className="relative flex h-dvh w-full max-w-full flex-col items-center overflow-x-hidden">
      <BackLanturns />
      <RedFocus />
      {!isHome && <WalletDropdown />}

      {children}

      <DemoByMagic />
    </main>
  )
}
