'use client'

import { CreatePacketsForm } from 'app/(create)/create/CreatePacketsForm'
import { RedPacket } from 'components/RedPacket'
import { Container } from 'components/ui/container'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isDisconnected } = useAccount()

  if (isDisconnected) {
    redirect('/login')
  }

  return (
    <Container>
      <RedPacket />

      <div className="h-6" />

      <CreatePacketsForm />
    </Container>
  )
}
