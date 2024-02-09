'use client'

import { CreatePacketsForm } from 'app/(create)/create/CreatePacketsForm'
import { RedPacket } from 'app/RedPacket'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isDisconnected } = useAccount()

  if (isDisconnected) {
    redirect('/login')
  }

  return (
    <>
      <div className="relative">
        <RedPacket />
        <div
          className="absolute inset-0 z-50 m-auto aspect-square h-[80px] w-[80px] rounded-full bg-blue-200 blur-[40px] sm:h-[100px] sm:w-[100px] sm:blur-[50px]"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(255, 48, 52, 0.7) 0%, rgba(255, 48, 52, 0.7) 100%)',
          }}
        />
      </div>

      <div className="h-6" />

      <CreatePacketsForm />
    </>
  )
}
