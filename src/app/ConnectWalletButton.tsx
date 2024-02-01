'use client'

import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { WALLET_TYPE, useWalletType } from 'hooks/useWalletType'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export function ConnectWalletButton() {
  const modal = useWeb3Modal()
  const { isConnected } = useAccount()
  const [, setType] = useWalletType()

  const { open } = useWeb3ModalState()

  useEffect(() => {
    if (isConnected) {
      setType(WALLET_TYPE.WEB3)
    }
  }, [isConnected])

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
      {open ? <Spinner /> : <>Connect Wallet</>}
    </Button>
  )
}
