import { ConnectWalletButton } from 'app/ConnectWalletButton'
import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { Container } from 'components/ui/container'
import { MotionHeadline, TypographyBody } from 'components/ui/typography'

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <RedPacket />

      <Container>
        <div className="flex flex-col gap-5">
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
      </Container>
    </div>
  )
}
