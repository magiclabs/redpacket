'use client'

import { redirect } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export default function CreateLayout({ children }: PropsWithChildren) {
  const { isDisconnected } = useAccount()

  if (isDisconnected) {
    redirect('/')
  }

  return <>{children}</>
}
