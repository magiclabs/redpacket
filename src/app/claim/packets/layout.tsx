'use client'

import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { type PropsWithChildren } from 'react'

export default function ClaimPacketsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <BackLanturns />
      <RedFocus />

      <div className="z-30 flex flex-1 flex-col items-center">{children}</div>
    </>
  )
}
