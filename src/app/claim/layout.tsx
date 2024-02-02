import { DemoByMagic } from 'app/DemoByMagic'
import Image from 'next/image'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
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

      {children}

      <DemoByMagic />
    </main>
  )
}
