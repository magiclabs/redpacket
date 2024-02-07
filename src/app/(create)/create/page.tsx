'use client'

import { CreatePacketsForm } from 'app/(create)/create/CreatePacketsForm'
import { RedPacket } from 'app/RedPacket'
import { Container } from 'components/ui/container'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isDisconnected } = useAccount()

  if (isDisconnected) {
    redirect('/')
  }

  return (
    <>
      <RedPacket />

      <Container>
        <CreatePacketsForm />
      </Container>
    </>
  )
}
