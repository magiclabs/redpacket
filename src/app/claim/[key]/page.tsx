'use client'

import { ClaimPacket } from 'app/claim/[key]/ClaimPacket'
import { redirect, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export default function Home() {
  const { key } = useParams<{ key: string }>()
  const { isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    if (isDisconnected) {
      if (!key) {
        redirect('/')
      }

      redirect('/claim/login?id=' + key)
    }
  }, [isDisconnected, key])

  if (isConnecting) {
    return <div></div>
  }

  return <ClaimPacket />
}
