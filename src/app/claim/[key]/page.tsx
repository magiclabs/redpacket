'use client'

import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
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
    <>
      <BackLanturns />
      <RedFocus />
      <WalletDropdown />

      <Container className="max-w-[520px] justify-center">
        <ClaimPacket />
      </Container>
    </>
  )
}
