'use client'

import { ClaimPacket } from 'app/claim/[key]/ClaimPacket'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import { redirect, useParams } from 'next/navigation'

export default function Home() {
  const { key } = useParams<{ key: string }>()

  const { isLoggedIn, isPending } = useIsLoggedIn()

  console.log({
    isLoggedIn,
    isPending,
  })

  if (isPending) {
    return <div></div>
  }

  if (!isLoggedIn) {
    redirect(`/claim/login?id=${key}`)
  }

  return <ClaimPacket />
}
