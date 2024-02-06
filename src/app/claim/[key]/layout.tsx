'use client'

import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { WalletDropdown } from 'app/create/WalletDropdown'
import { redirect, useParams } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function ClaimLayout({ children }: PropsWithChildren) {
  const { key } = useParams<{ key: string }>()
  const { isDisconnected, isConnecting } = useAccount()

  useEffect(() => {
    if (isDisconnected) {
      if (!key) {
        redirect('/')
      }

      redirect('/claim/login?id=' + key)
    }
  }, [isDisconnected])

  if (isConnecting || isDisconnected) {
    return <></>
  }

  return (
    <>
      <BackLanturns />
      <RedFocus />
      <WalletDropdown />

      {children}
    </>
  )
}
