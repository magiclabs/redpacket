'use client'

import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { redirect, useParams } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function ClaimLayout({ children }: PropsWithChildren) {
  const { key } = useParams<{ key: string }>()
  const { isDisconnected } = useAccount()

  if (isDisconnected) {
    redirect(key ? '/claim/login?id=' + key : '/')
  }

  return (
    <>
      <BackLanturns />
      <RedFocus />

      {children}
    </>
  )
}
