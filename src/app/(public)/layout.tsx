'use client'

import { useRouter } from 'next/navigation'
import { useEffect, type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function CreateLayout({ children }: PropsWithChildren) {
  const { push } = useRouter()
  const { isConnecting, isConnected, isReconnecting } = useAccount()

  useEffect(() => {
    if (isConnected) {
      push('/create')
    }
  }, [isConnected])

  if (isConnecting || isReconnecting) {
    return <></>
  }

  return <>{children}</>
}
