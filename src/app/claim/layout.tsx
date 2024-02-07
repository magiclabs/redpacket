'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { DemoByMagic } from 'app/DemoByMagic'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const isLogin = pathname === '/claim/login'

  return (
    <main className="relative flex h-dvh w-full max-w-full flex-col items-center overflow-x-hidden ">
      {!isLogin && <WalletDropdown />}
      {children}

      <DemoByMagic />
    </main>
  )
}
