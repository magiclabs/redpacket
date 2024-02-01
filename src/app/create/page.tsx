import { DemoByMagic } from 'app/DemoByMagic'
import { RedPacket } from 'app/RedPacket'
import { CreatePacketsForm } from 'app/create/CreatePacketsForm'
import { WalletDropdown } from 'app/create/WalletDropdown'
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
      <WalletDropdown />

      <div className="pointer-events-none absolute h-full w-full select-none justify-self-center overflow-hidden">
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
          className={`${GTSuper.className} select-none self-center text-3xl tracking-[-0.408px] sm:text-4xl md:text-[40px]`}
          style={{
            background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Create your red packets
        </h2>
      </div>

      <CreatePacketsForm />

      <DemoByMagic />
    </main>
  )
}
