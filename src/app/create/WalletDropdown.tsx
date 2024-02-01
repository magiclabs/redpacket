'use client'

import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Loader } from 'components/Loader'
import { CopyIcon } from 'components/icons/CopyIcon'
import { LogoutIcon } from 'components/icons/LogoutIcon'
import { QRCodeIcon } from 'components/icons/QRCodeIcon'
import { WalletIcon } from 'components/icons/WalletIcon'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { WALLET_TYPE, useWalletType } from 'hooks/useWalletType'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { formatEther } from 'viem'
import { useAccount, useBalance, useBlockNumber, useDisconnect } from 'wagmi'

export function WalletDropdown() {
  const client = useQueryClient()
  const { address, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  const [walletType] = useWalletType()

  const { data: balance, queryKey } = useBalance({ address })

  useEffect(() => {
    client.invalidateQueries({ queryKey })
  }, [blockNumber])

  const [, copyToClipboard] = useCopyToClipboard()

  if (isDisconnected) {
    redirect('/')
  }

  if (isConnecting || !balance) {
    return <Loader className="absolute right-4 top-4 aspect-square h-6 w-6" />
  }

  return address && balance ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute right-4 top-4 z-10 flex h-10 justify-center gap-2 rounded-3xl border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF14] p-2 pr-4 font-mono text-base font-light text-white shadow-[0px_4px_28px_8px_rgba(0,0,0,0.25)] backdrop-blur-[18px] focus-visible:outline-none">
        <div
          className="aspect-square h-6 w-6 rounded-full"
          style={{
            background:
              'radial-gradient(66.02% 77.37% at 31.25% 32.81%, #FF2227 0%, #A30128 100%)',
          }}
        />
        {Number(formatEther(balance?.value)).toFixed(5)} ETH
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-2xl border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF14] text-white shadow-[0px_4px_28px_8px_rgba(0,0,0,0.25)] backdrop-blur-[18px]"
      >
        <DropdownMenuItem
          className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white"
          onClick={async () => {
            await copyToClipboard(address)
            toast('Address copied to clipboard')
          }}
        >
          <CopyIcon className="opacity-80 hover:opacity-100" />
          Copy Address
        </DropdownMenuItem>
        {walletType === WALLET_TYPE.MAGIC ? (
          <>
            <DropdownMenuItem className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white">
              <QRCodeIcon className="opacity-80 hover:opacity-100" />
              QR Code
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white">
              <WalletIcon className="opacity-80 hover:opacity-100" />
              Open Wallet
            </DropdownMenuItem>
          </>
        ) : null}
        <DropdownMenuItem
          className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white"
          onClick={async () => {
            await disconnect()
          }}
        >
          <LogoutIcon className="opacity-80 hover:opacity-100" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <></>
  )
}
