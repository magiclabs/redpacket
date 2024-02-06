'use client'

import { ClaimPacket } from 'app/claim/[key]/ClaimPacket'
import { redirect, useParams } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { key } = useParams<{ key: string }>()

  const { isConnecting, isDisconnected } = useAccount()

  if (isConnecting) {
    return <div></div>
  }

  if (isDisconnected) {
    redirect(`/claim/login?id=${key}`)
  }

  return <ClaimPacket />
}
