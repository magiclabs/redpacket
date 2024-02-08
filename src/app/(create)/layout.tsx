'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { Container } from 'components/ui/container'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export default function CreateLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <>
      <BackLanturns />
      <RedFocus />
      {!isHome && <WalletDropdown />}

      <Container>{children}</Container>
    </>
  )
}
