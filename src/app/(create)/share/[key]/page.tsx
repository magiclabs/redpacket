'use client'

import { useCopyToClipboard } from '@uidotdev/usehooks'
import { track } from '@vercel/analytics'
import { RedDragon } from 'app/(create)/share/[key]/RedDragon'
import { useRedPacket } from 'app/(create)/share/[key]/useRedPacket'
import { GTSuper } from 'app/fonts'
import { BackIcon } from 'components/icons/Backicon'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ExternalIcon } from 'components/icons/ExternalIcon'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import { Input } from 'components/ui/input'
import { Progress } from 'components/ui/progress'
import { CHAINS } from 'config/client'
import { PROD_URL } from 'config/url'
import { CURRENT_CHAIN_KEY } from 'lib/constants'
import { redirect, useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { isLocal } from 'utils/isLocal'
import { isServer } from 'utils/isServer'
import { type Address } from 'viem'
import { useAccount } from 'wagmi'

export default function Share() {
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { isDisconnected } = useAccount()
  const [, copyToClipboard] = useCopyToClipboard()

  const link = isServer()
    ? `${PROD_URL.replace(`https://`, '')}/claim/${key}`
    : `${location.host.replace(`https://`, '')}/claim/${key}`

  const [copied, setCopied] = useState(false)

  const { push } = useRouter()

  const {
    totalBalance,
    totalClaimCount,
    remainingBalance,
    remainingPackets,
    isSuccess,
  } = useRedPacket({ contractAddress, refetch: true })

  if (isDisconnected) {
    redirect('/')
  }

  return (
    <div className="flex h-lvh w-full flex-col items-center gap-8">
      <RedDragon />

      <Container className="gap-8">
        <div className="flex flex-col gap-5">
          <h2
            className={`${GTSuper.className} md:text-[40px] select-none self-center text-3xl tracking-[-0.408px] sm:text-4xl`}
            style={{
              background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {totalClaimCount} packets created
          </h2>
        </div>

        <div className="flex w-full flex-col">
          <span className="text-center text-xl font-medium">
            Share your claim link
          </span>

          <div className="relative mt-4 flex w-full">
            <Input
              className="h-14 text-ellipsis rounded-xl border-[#ffffff33] bg-[#ffffff14] px-4 pr-24 text-base font-normal not-italic text-white"
              type="email"
              value={link}
              readOnly
            />

            <Button
              className="absolute right-[6px] h-10 w-20 self-center text-base font-semibold"
              style={{
                boxShadow:
                  '0px 4px 20px 0px rgba(0, 0, 0, 0.10), 0px 4px 36px -8px rgba(0, 0, 0, 0.25), 0px 3px 10px 2px rgba(255, 52, 52, 0.30)',
              }}
              onClick={async () => {
                const text = `http${isLocal() ? '' : 's'}://${link}`
                await copyToClipboard(text)
                setCopied(true)
                toast.success('Link copied to clipboard')

                setTimeout(() => {
                  setCopied(false)
                }, 2000)
              }}
            >
              {copied ? <CheckIcon /> : 'Copy'}
            </Button>
          </div>

          <div className="mt-14">
            <Progress
              value={isSuccess ? (remainingBalance / totalBalance) * 100 : 0}
              className="overflow-auto shadow-[0px_3px_10px_2px_rgba(255,52,52,0.30)] duration-1000"
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold leading-[150%] tracking-[3px] opacity-50">
              REMAINING
            </span>
            <div className="flex items-center gap-3 text-base">
              <span className="">{remainingPackets} packets</span>
              <div className="h-1 w-1 rounded-full bg-white opacity-30" />
              <span className="">
                {parseFloat(remainingBalance.toFixed(5))} ETH
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <Button
              className="h-10 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
              onClick={async () => {
                track(`Create More Clicked`)
                await push(`/create`)
              }}
            >
              <BackIcon />
              Create more
            </Button>
            <Button
              asChild
              className="h-10 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
              onClick={() => {
                track(`View Contract Clicked`)
              }}
            >
              <a
                href={`${CHAINS[CURRENT_CHAIN_KEY].getAccountURL(contractAddress)}`}
                target="_blank"
                rel="noreferrer"
              >
                View contract
                <ExternalIcon />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
