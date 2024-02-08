'use client'

import { ConnectWalletButton } from 'app/ConnectWalletButton'
import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import {
  MotionHeadline,
  TypographyBody,
  TypographyLink,
  TypographySmall,
} from 'components/ui/typography'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  if (isConnected) {
    redirect('/create')
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

      <div className="mt-8 flex flex-col gap-5">
        <MotionHeadline>Happy Lunar New Year</MotionHeadline>
        <TypographyBody>
          Celebrate the Year of the Dragon by creating digital red packets
          (红包) filled with ETH
        </TypographyBody>
      </div>

      <div className="mt-10 flex w-full flex-col gap-5">
        <ConnectWalletButton />

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[#FFFFFF33]" />
          <span className="text-sm font-medium text-white opacity-60">
            Or, create a wallet
          </span>
          <div className="h-px flex-1 bg-[#FFFFFF33]" />
        </div>

        <EmailForm />
      </div>

      <TypographySmall className="mt-8 w-full max-w-[354px]">
        By proceeding, you consent to Magic’s{' '}
        <TypographyLink href="" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </TypographyLink>{' '}
        and
        <TypographyLink href="" target="_blank" rel="noopener noreferrer">
          Terms of Service.
        </TypographyLink>{' '}
        See complete{' '}
        <TypographyLink href="" target="_blank" rel="noopener noreferrer">
          Terms and Conditions
        </TypographyLink>{' '}
        for details.
      </TypographySmall>
    </>
  )
}
