'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { ClaimPacket } from 'app/claim/[key]/ClaimPacket'
import { redirect, useParams } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { key } = useParams<{ key: string }>()
  const { isDisconnected } = useAccount()

  if (isDisconnected) {
    redirect('/claim/login?id=' + key)
  }

  return (
    <>
      <WalletDropdown />
      <ClaimPacket />
    </>
  )
}
