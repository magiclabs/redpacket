'use client'

import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { EmailForm } from 'components/EmailForm'
import { RedPacket } from 'components/RedPacket'
import { Container } from 'components/ui/container'
import {
  MotionHeadline,
  TypographyBody,
  TypographyLink,
  TypographySmall,
} from 'components/ui/typography'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function CreateLogin() {
  const { isConnected } = useAccount()

  if (isConnected) {
    redirect('/create')
  }

  return (
    <Container>
      <RedPacket />

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
        <TypographyLink
          href="https://magic.link/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </TypographyLink>{' '}
        and{' '}
        <TypographyLink
          href="https://magic.link/legal/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service.
        </TypographyLink>{' '}
        See complete{' '}
        <TypographyLink
          href="https://magic.link/legal/red-packet-terms-conditions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </TypographyLink>{' '}
        for details.
      </TypographySmall>
    </Container>
  )
}
