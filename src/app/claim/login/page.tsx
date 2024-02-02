'use client'

import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { GTSuper } from 'app/fonts'
import { useSearchParams } from 'next/navigation'

export default function Claim() {
  const search = useSearchParams()

  const claimId = search.get('claimId')

  if (typeof claimId !== 'string') {
    throw new Error('claimId is required')
  }

  return (
    <>
      <RedPacket />

      <div className="flex flex-col gap-5 px-2">
        <h2
          className={`${GTSuper.className} select-none self-center text-3xl sm:text-4xl md:text-[40px]`}
          style={{
            background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Open your red packet
        </h2>
        <span className="max-w-[468px] text-balance text-center text-sm text-white opacity-80 sm:text-lg">
          Happy Lunar New Year! You’ve received a special red packet. Log in to
          open it.
        </span>
      </div>

      <div className="flex w-full max-w-[440px] flex-col justify-center gap-5 px-5">
        <EmailForm redirectUri={`/claim/packets/${claimId}`} />
      </div>
    </>
  )
}
