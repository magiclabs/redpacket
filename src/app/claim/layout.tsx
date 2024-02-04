import { DemoByMagic } from 'app/DemoByMagic'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative flex h-dvh w-full max-w-full flex-col items-center overflow-x-hidden bg-[#03010B]">
      {children}

      <DemoByMagic />
    </main>
  )
}
