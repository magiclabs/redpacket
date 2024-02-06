'use client'

import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { track } from '@vercel/analytics'
import { Loader } from 'components/Loader'
import { CopyIcon } from 'components/icons/CopyIcon'
import { LogoutIcon } from 'components/icons/LogoutIcon'
import { QRCodeIcon } from 'components/icons/QRCodeIcon'
import { WalletIcon } from 'components/icons/WalletIcon'
import { Button } from 'components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { WALLET_TYPE } from 'hooks/useWalletType'
import { magic } from 'lib/magic'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { isProd } from 'utils/isProd'
import { formatEther } from 'viem'
import { useAccount, useBalance, useBlockNumber, useDisconnect } from 'wagmi'

export function WalletDropdown() {
  const client = useQueryClient()
  const { address, isConnecting, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  const { data: balance, queryKey } = useBalance({ address })

  useEffect(() => {
    client.invalidateQueries({ queryKey })
  }, [blockNumber])

  const [, copyToClipboard] = useCopyToClipboard()

  if (isConnecting || !balance) {
    return <Loader className="absolute right-4 top-4 aspect-square h-6 w-6" />
  }

  return address && balance ? (
    <div className="absolute right-4 top-4 z-50 flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-10 justify-center gap-2 rounded-3xl border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF14] p-2 pr-4 font-mono text-base font-light text-white shadow-[0px_4px_28px_8px_rgba(0,0,0,0.25)] backdrop-blur-[18px] focus-visible:outline-none">
          <div
            className="aspect-square h-6 w-6 rounded-full"
            style={{
              background:
                'radial-gradient(66.02% 77.37% at 31.25% 32.81%, #FF2227 0%, #A30128 100%)',
            }}
          />
          {parseFloat(Number(formatEther(balance?.value)).toFixed(5))} ETH
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-2xl border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF14] text-white shadow-[0px_4px_28px_8px_rgba(0,0,0,0.25)] backdrop-blur-[18px]"
        >
          <DropdownMenuItem
            className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white"
            onClick={async () => {
              await copyToClipboard(address)
              toast.success('Address copied to clipboard')
            }}
          >
            <CopyIcon className="opacity-80 hover:opacity-100" />
            Copy Address
          </DropdownMenuItem>
          {connector?.type === WALLET_TYPE.MAGIC ? (
            <>
              <DropdownMenuItem
                className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white"
                onClick={async () => {
                  await magic.wallet.showAddress()
                }}
              >
                <QRCodeIcon className="opacity-80 hover:opacity-100" />
                QR Code
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white"
                onClick={async () => {
                  await magic.wallet.showUI()
                }}
              >
                <WalletIcon className="opacity-80 hover:opacity-100" />
                Open Wallet
              </DropdownMenuItem>
            </>
          ) : null}
          <DropdownMenuItem
            className="flex cursor-pointer gap-2 rounded-xl bg-transparent opacity-80 hover:opacity-100 data-[highlighted]:bg-transparent data-[highlighted]:text-white"
            onClick={() => {
              track(`Log Out Clicked`)
              disconnect()
            }}
          >
            <LogoutIcon className="opacity-80 hover:opacity-100" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!isProd() && (
        <div className="mt-4 flex flex-col gap-px">
          <Button className="w-fit self-end">
            <a
              href="https://mumbaifaucet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Mumbai Faucet
            </a>
          </Button>
          <span className="mr-px self-end text-xs">(Show only in Testnet)</span>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}
