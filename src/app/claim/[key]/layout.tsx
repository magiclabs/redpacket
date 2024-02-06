import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { WalletDropdown } from 'app/create/WalletDropdown'
import { type PropsWithChildren } from 'react'

export default function ClaimLayout({ children }: PropsWithChildren) {
  return (
    <>
      <BackLanturns />
      <RedFocus />
      <WalletDropdown />

      {children}
    </>
  )
}
