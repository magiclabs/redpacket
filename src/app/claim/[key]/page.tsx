'use client'

import { ClaimPacket } from 'app/claim/[key]/ClaimPacket'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnecting } = useAccount()

  if (isConnecting) {
    return <div></div>
  }

  return <ClaimPacket />
}
