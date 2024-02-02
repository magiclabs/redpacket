'use client'

import { RedPacket } from 'app/RedPacket'
import { Progress } from 'components/ui/progress'
import { useParams, useRouter } from 'next/navigation'

export default function ClaimPacket() {
  const { push } = useRouter()
  const { claimId } = useParams<{ claimId: string }>()

  const handleOpen = () => {
    push(`/claim/packets/${claimId}/lucky`)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div
        role="button"
        className="relative cursor-pointer"
        onClick={handleOpen}
      >
        <RedPacket className="h-[480px] w-[480px] rotate-0" />
        <div className="absolute left-1/2 top-1/2 inline-flex h-14 shrink-0 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-xl border border-solid border-[rgba(255,255,255,0.20)] px-10 py-[19px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.14),0px_6px_44px_8px_rgba(0,0,0,0.28)] backdrop-blur [background:rgba(255,255,255,0.08)]">
          <span>Open</span>
        </div>
      </div>

      <div className="mt-[15px] flex flex-col items-center">
        <span className="self-stretch text-center text-xs font-semibold leading-normal tracking-[3px] text-white opacity-50">
          FEELING LUCKY?
        </span>

        <div className="mt-2">
          <span className="text-center font-mono text-base font-medium leading-normal tracking-[-0.408px] text-white">
            1.00000 ETH{' '}
            <span className="text-white opacity-70">/ 1 ETH up for grabs</span>
          </span>
        </div>

        <div className="mt-2">
          <span className="text-center text-sm font-medium leading-normal tracking-[-0.408px] text-white opacity-70">
            You have 1 unopened red packet
          </span>
        </div>

        <Progress
          value={10}
          max={10}
          className="mt-[19px]"
          style={{
            background: 'linear-gradient(90deg, #DF0005 0%, #FF3C40 100%)',
            boxShadow: '0px 3px 10px 2px rgba(255, 52, 52, 0.30)',
          }}
        />
      </div>
    </div>
  )
}
