'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const isLogin = pathname === '/claim/login' || pathname.includes('over')

  return (
    <>
      {!isLogin && <WalletDropdown />}

      {children}
    </>
  )
}
