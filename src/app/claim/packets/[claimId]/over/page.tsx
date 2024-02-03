'use client'

import { FestivitiesAreOver } from 'app/claim/packets/[claimId]/over/FestivitiesAreOver'
import { RedLantern } from 'app/claim/packets/[claimId]/over/RedLantern'
import { Button } from 'components/ui/button'
import { useParams, useRouter } from 'next/navigation'

export default function Over() {
  const { push } = useRouter()
  const { claimId } = useParams<{ claimId: string }>()

  // const { logout, isLoggedIn } = useWalletContext()
  const isLoggedIn = true
  console.log({ claimId })

  const handleLogout = async () => {
    // await logout()

    push('/claim/login?claimId=' + claimId)
  }
  const handleCreatePackets = async () => {
    push('/')
  }

  return (
    <div className="flex w-[400px] flex-col items-center">
      <RedLantern />

      <FestivitiesAreOver />

      <p className="mt-5  text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[rgba(255,255,255,0.80)]">
        All 1,000 red packets have been claimed.
        <br />
        <br />
        You can still watch a video demo of Magic’s Lunar New Year experience,
        or <span className="font-semibold text-white">build your own.</span>
      </p>

      <div className="mt-8 flex h-[225px] w-[400px] shrink-0 items-center justify-center rounded-3xl [background:rgba(255,255,255,0.12)]"></div>

      <div className="mt-10 flex w-full flex-row gap-3">
        {isLoggedIn && (
          <Button
            className="h-12 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
        <Button className="h-12 flex-1" onClick={handleCreatePackets}>
          Create Packets
        </Button>
      </div>
    </div>
  )
}
