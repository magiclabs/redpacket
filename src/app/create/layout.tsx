'use client'

import { redirect } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function CreateLayout({ children }: PropsWithChildren) {
  const { isConnecting, isDisconnected, isReconnecting } = useAccount()

  if (isConnecting || isReconnecting) {
    return <></>
  }

  if (isDisconnected) {
    redirect('/')
  }

  return <>{children}</>
}
