'use client'

import { last, pipe, split } from '@fxts/core'
import { BackLanturns } from 'components/BackLanterns'
import { RedFocus } from 'components/RedFocus'
import { WalletDropdown } from 'components/WalletDropdown'
import { redirect, useParams, usePathname } from 'next/navigation'
import { useMemo, type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function ClaimLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const { key } = useParams<{ key: string }>()
  const { isDisconnected, connector } = useAccount()

  const showDropdown = useMemo(() => {
    const subpath = pipe(pathname, split('/'), last)
    return subpath !== 'over'
  }, [pathname])

  if (isDisconnected || connector?.type !== 'magic') {
    if (pathname.includes('/over')) {
      redirect('/login')
    } else {
      redirect('/claim/login?id=' + key)
    }
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
