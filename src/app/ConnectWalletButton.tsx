'use client'

import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { redirect } from 'next/navigation'
import { useAccount } from 'wagmi'

export function ConnectWalletButton() {
  const modal = useWeb3Modal()
  const { isConnecting, isConnected } = useAccount()

  const { open } = useWeb3ModalState()

  if (isConnected) {
    redirect('/create')
  }

  return (
    <Button
      className="h-14 w-full max-w-[400px] rounded-2xl bg-[#FF191E] text-lg font-semibold"
      onClick={async () => {
        await modal.open()
      }}
    >
      {isConnecting || open ? <Spinner /> : <>Connect Wallet</>}
    </Button>
  )
}
