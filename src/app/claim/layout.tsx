import { DemoByMagic } from 'app/DemoByMagic'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-dvh flex-col items-center bg-[#03010B]">
      {children}

      <DemoByMagic />
    </main>
  )
}
