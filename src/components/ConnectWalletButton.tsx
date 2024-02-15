'use client'

import { track } from '@vercel/analytics'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { WALLET_TYPE } from 'hooks/useWalletType'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export function ConnectWalletButton() {
  const modal = useWeb3Modal()
  const { open } = useWeb3ModalState()
  const { isConnected, connector } = useAccount()

  if (isConnected && connector?.type !== WALLET_TYPE.MAGIC) {
    redirect('/create')
  }

  return (
    <Button
      className="h-14 w-full max-w-[400px] rounded-2xl bg-[#FF191E] text-lg font-semibold"
      onClick={async () => {
        track(`Connect Wallet Button Clicked`)

        await modal.open()
      }}
    >
      {open ? <Spinner /> : <>Connect Wallet</>}
    </Button>
  )
}
