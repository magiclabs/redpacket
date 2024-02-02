'use client'

import { useCopyToClipboard } from '@uidotdev/usehooks'
import { DemoByMagic } from 'app/DemoByMagic'
import { WalletDropdown } from 'app/create/WalletDropdown'
import { GTSuper } from 'app/fonts'
import { RedDragon } from 'app/share/[key]/RedDragon'
import { BackIcon } from 'components/icons/Backicon'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ExternalIcon } from 'components/icons/ExternalIcon'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Progress } from 'components/ui/progress'
import { CHAINS } from 'config/client'
import { URL } from 'config/url'
import { REDPACKET_ABI } from 'lib/constants'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { formatEther, type Address } from 'viem'
import { useReadContracts } from 'wagmi'

export default function Home() {
  const { key } = useParams<{ key: string }>()

  const address: Address = `0x${key.split('').reverse().join('')}`

  const [, copyToClipboard] = useCopyToClipboard()

  const link = `${URL.replace(`https://`, '')}/claim/${key}`

  const [copied, setCopied] = useState(false)

  const { push } = useRouter()

  const contract = {
    address,
    abi: REDPACKET_ABI,
  }

  const { data, isSuccess } = useReadContracts({
    contracts: [
      { ...contract, functionName: `totalClaimCount` },
      { ...contract, functionName: `getClaimedCount` },
      { ...contract, functionName: `totalBalance` },
      { ...contract, functionName: `getCurrentBalance` },
      { ...contract, functionName: `getClaimedAddresses` },
      { ...contract, functionName: `expired` },
      { ...contract, functionName: `creator` },
    ],
  })

  const totalClaimCount = isSuccess ? Number(data?.[0].result) : 0

  const totalBalance = isSuccess
    ? Number(formatEther(data?.[2].result as bigint))
    : 0

  const remainingPackets = isSuccess
    ? Number((data[0].result as bigint) - (data[1].result as bigint))
    : 0

  const remainingBalance = isSuccess
    ? Number(
        formatEther(BigInt(Number(data[3].result) - Number(data[4].result))),
      )
    : 0

  return (
    <main
      className="flex h-lvh flex-col items-center gap-8"
      style={{
        background:
          'radial-gradient(62.01% 50% at 50% 50%, #480016 0%, #03010B 100%), #FFF',
      }}
    >
      <WalletDropdown />

      <div className="pointer-events-none absolute h-full w-full select-none justify-self-center overflow-hidden">
        <div className="relative flex justify-center">
          <Image
            priority
            className="absolute aspect-[1280/412] min-w-[1280px] md:w-full"
            src="/Lanterns.png"
            width="1280"
            height="412"
            quality={80}
            alt="Lanterns"
            style={{
              mask: `linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.11) 38.27%, rgba(0, 0, 0, 0.13) 63.16%, #000 100%)`,
              maskMode: 'alpha',
            }}
          />
        </div>
      </div>

      <RedDragon />

      <div className="flex flex-col gap-5 px-2">
        <h2
          className={`${GTSuper.className} select-none self-center text-3xl tracking-[-0.408px] sm:text-4xl md:text-[40px]`}
          style={{
            background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {totalClaimCount} packets created
        </h2>
      </div>

      <div className="flex w-full max-w-[440px] flex-col px-5">
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
              const text = `https://${link}`
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
            className="overflow-auto shadow-[0px_3px_10px_2px_rgba(255,52,52,0.30)]"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold leading-[150%] tracking-[3px] opacity-50">
            REMAINING
          </span>
          <div className="flex items-center gap-3 text-base">
            <span className="">{remainingPackets} packets</span>
            <div className="h-1 w-1 rounded-full bg-white opacity-30" />
            <span className="">{remainingBalance} ETH</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            className="h-10 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
            onClick={() => {
              push(`/create`)
            }}
          >
            <BackIcon />
            Create more
          </Button>
          <Button
            asChild
            className="h-10 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
          >
            <a
              href={`${CHAINS['baseSepolia'].getAccountURL(address)}`}
              target="_blank"
              rel="noreferrer"
            >
              View contract
              <ExternalIcon />
            </a>
          </Button>
        </div>
      </div>

      <DemoByMagic />
    </main>
  )
}
