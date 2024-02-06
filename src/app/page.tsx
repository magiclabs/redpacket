import { ConnectWalletButton } from 'app/ConnectWalletButton'
import { DemoByMagic } from 'app/DemoByMagic'
import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { GTSuper } from 'app/fonts'
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

      <div className="flex flex-col gap-5 px-2">
        <h2
          className={`${GTSuper.className} select-none self-center text-3xl sm:text-4xl md:text-[40px]`}
          style={{
            background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Happy Lunar New Year
        </h2>
        <span className="max-w-[468px] text-balance text-center text-sm text-white opacity-80 sm:text-lg">
          Celebrate the Year of the Dragon by creating digital red packets
          (红包) filled with ETH
        </span>
      </div>

      <div className="flex w-full max-w-[440px] flex-col justify-center gap-5 px-5">
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

      <DemoByMagic />
    </main>
  )
}
