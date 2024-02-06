import { ConnectWalletButton } from 'app/ConnectWalletButton'
import { DemoByMagic } from 'app/DemoByMagic'
import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { Container } from 'components/ui/container'
import { MotionHeadline, TypographyBody } from 'components/ui/typography'
import Image from 'next/image'

export default function Home() {
  return (
    <main
      className="flex h-lvh flex-col items-center gap-8"
      style={{
        background:
          'radial-gradient(62.01% 50% at 50% 50%, #480016 0%, #03010B 100%), #FFF',
      }}
    >
      <div className="pointer-events-none absolute h-full w-full justify-self-center overflow-hidden">
        <div className="relative flex justify-center">
          <Image
            priority
            className="absolute aspect-[1280/412] min-w-[1280px] md:w-full"
            src="/Lanterns.png"
            width="1280"
            height="412"
            quality={80}
            alt="Lanterns"
            style={{
              mask: `linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.11) 38.27%, rgba(0, 0, 0, 0.13) 63.16%, #000 100%)`,
              maskMode: 'alpha',
            }}
          />
        </div>
      </div>

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

      <DemoByMagic />
    </main>
  )
}
