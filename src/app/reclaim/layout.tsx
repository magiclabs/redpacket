'use client'

import { last, pipe, split } from '@fxts/core'
import { BackLanturns } from 'components/BackLanterns'
import { RedFocus } from 'components/RedFocus'
import { WalletDropdown } from 'components/WalletDropdown'
import { usePathname } from 'next/navigation'
import { useMemo, type PropsWithChildren } from 'react'

export default function ReclaimLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const showDropdown = useMemo(() => {
    const subpath = pipe(pathname, split('/'), last)
    return subpath !== 'login'
  }, [pathname])

  return (
    <>
      <BackLanturns />
      <RedFocus />
      {showDropdown && <WalletDropdown />}

      {children}
    </>
  )
}
