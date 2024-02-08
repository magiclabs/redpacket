'use client'

import { ClaimPacket } from 'app/claim/[key]/ClaimPacket'
import { Container } from 'components/ui/container'
import { redirect, useParams } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { key } = useParams<{ key: string }>()
  const { isDisconnected, connector } = useAccount()

  if (isDisconnected || connector?.type !== 'magic') {
    redirect('/claim/login?id=' + key)
  }

  return (
    <Container className="max-w-[520px] justify-center">
      <ClaimPacket />
    </Container>
  )
}
