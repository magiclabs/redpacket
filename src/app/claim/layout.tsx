import { DemoByMagic } from 'app/DemoByMagic'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative flex h-dvh w-full max-w-full flex-col items-center overflow-x-hidden bg-[#03010B]">
      <BackLanturns
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL }}
      />
      <RedFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: ANIMATION_INTERVAL * 2 }}
      />

      <div className="z-30 flex h-dvh w-full max-w-[400px] flex-col items-center">
        {children}
      </div>

      <DemoByMagic />
    </main>
  )
}
