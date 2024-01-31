'use client'

import { last, pipe, split } from '@fxts/core'
import { BackLanturns } from 'components/BackLanterns'
import { RedFocus } from 'components/RedFocus'
import { WalletDropdown } from 'components/WalletDropdown'
import { redirect, usePathname } from 'next/navigation'
import { useMemo, type PropsWithChildren } from 'react'

const DEAD_LINE = process.env.NEXT_PUBLIC_DEAD_LINE

export default function CreateLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const showDropdown = useMemo(() => {
    const subpath = pipe(pathname, split('/'), last)
    return subpath !== 'login'
  }, [pathname])

  if (pathname !== '/dead' && DEAD_LINE && new Date() > new Date(DEAD_LINE)) {
    redirect('/dead')
  }

  return (
    <>
      <BackLanturns />
      <RedFocus />
      {showDropdown && <WalletDropdown />}

      {children}
    </>
  )
}
