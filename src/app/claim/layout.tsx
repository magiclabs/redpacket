import { DemoByMagic } from 'app/DemoByMagic'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative flex h-dvh w-full max-w-full flex-col items-center overflow-x-hidden bg-[#03010B]">
      <BackLanturns />
      <RedFocus />

      <div className="z-30 flex w-full max-w-[400px] flex-col items-center">
        {children}
      </div>

      <DemoByMagic />
    </main>
  )
}
