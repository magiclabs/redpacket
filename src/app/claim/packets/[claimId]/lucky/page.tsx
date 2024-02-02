'use client'

import { RedEthereum } from 'app/claim/packets/[claimId]/lucky/RedEthereum'
import { SpakleIcon } from 'app/claim/packets/[claimId]/lucky/SpakleIcon'
import { Button } from 'components/ui/button'
import { magic } from 'lib/magic'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Lucky() {
  const { push } = useRouter()
  const serach = useSearchParams()

  const handleLogout = async () => {
    await magic.user.logout()

    const claimId = serach.get('claimId')
    push('/claim/login?claimId=' + claimId)
  }
  const handleOpenWallet = async () => {
    await magic.wallet.showUI()
  }

  return (
    <div className="flex w-[400px] flex-col items-center">
      <RedEthereum />

      <span className="mt-[14px] text-center text-[44px] font-bold leading-normal tracking-[-0.408px] text-white [text-shadow:0px_5px_22px_rgba(255,52,52,0.50)]">
        0.0015ETH
      </span>

      <p className="mt-6  text-center text-lg font-medium leading-normal tracking-[-0.408px] text-white">
        Happy Net Year! <br />
        You won 0.0015 ETH ($3.43) <br />
        <span className="font-normal opacity-70">
          Total prize pool: 1 ETH ($2,331.63)
        </span>
      </p>

      <div className="mt-8 inline-flex items-center gap-3 rounded-[58px] border border-solid border-[#FD3E42] px-6 py-3 shadow-[0px_3px_10px_2px_rgba(255,52,52,0.30)] [background:rgba(245,170,52,0.13)]">
        <SpakleIcon />
        <span>Your luck is in the top 10%</span>
      </div>

      <div className="mt-10 flex w-full flex-row gap-3">
        <Button
          className="h-12 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
          onClick={handleLogout}
        >
          Log Out
        </Button>
        <Button className="h-12 flex-1" onClick={handleOpenWallet}>
          Open Wallet
        </Button>
      </div>

      <span className="mt-4  w-[333px] text-center text-base font-semibold leading-normal tracking-[-0.408px] text-[rgba(255,255,255,0.70)]">
        Funds can be transferred out or accessed at any time via{' '}
        <b className="text-white">wallet.magic.link</b>
      </span>
    </div>
  )
}
