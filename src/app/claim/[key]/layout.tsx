'use client'

import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function ClaimLayout({ children }: PropsWithChildren) {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()
  const { isConnecting, isConnected, isReconnecting } = useAccount()

  useEffect(() => {
    if (isConnecting || isReconnecting) {
      return
    }

    if (!isConnected) {
      push(`/claim/login?id=${key}`)
    }
  }, [isConnected, isConnecting, isReconnecting, key, push])

  return (
    <>
      <BackLanturns />
      <RedFocus />

      {children}
    </>
  )
}
