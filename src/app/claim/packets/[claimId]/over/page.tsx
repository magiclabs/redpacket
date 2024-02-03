'use client'

import { FestivitiesAreOver } from 'app/claim/packets/[claimId]/over/FestivitiesAreOver'
import { RedLantern } from 'app/claim/packets/[claimId]/over/RedLantern'
import { Button } from 'components/ui/button'
import { motion } from 'framer-motion'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { magic } from 'lib/magic'
import { useParams, useRouter } from 'next/navigation'

export default function Over() {
  const { push } = useRouter()
  const { claimId } = useParams<{ claimId: string }>()

  const isLoggedIn = true
  console.log({ claimId })

  const handleLogout = async () => {
    await magic.user.logout()
    push('/claim/login?claimId=' + claimId)
  }
  const handleCreatePackets = async () => {
    push('/')
  }

  return (
    <div className="flex w-[400px] flex-col items-center">
      <RedLantern />

      <FestivitiesAreOver
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL }}
      />

      <motion.p
        className="mt-5  text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[rgba(255,255,255,0.80)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 2 }}
      >
        All 1,000 red packets have been claimed.
        <br />
        <br />
        You can still watch a video demo of Magic’s Lunar New Year experience,
        or <span className="font-semibold text-white">build your own.</span>
      </motion.p>

      <motion.div
        className="mt-8 flex h-[225px] w-[400px] shrink-0 items-center justify-center rounded-3xl [background:rgba(255,255,255,0.12)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 3 }}
      ></motion.div>

      <motion.div
        className="mt-10 flex w-full flex-row gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 4 }}
      >
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
      </motion.div>
    </div>
  )
}
