'use client'

import { RedLantern } from 'app/claim/[key]/over/RedLantern'
import { GTSuper } from 'app/fonts'
import { useRedPacket } from 'app/share/[key]/useRedPacket'
import { Button } from 'components/ui/button'
import { motion } from 'framer-motion'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { magic } from 'lib/magic'
import { useParams, useRouter } from 'next/navigation'
import { type Address } from 'viem'

export default function Over() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { isLoggedIn } = useIsLoggedIn()

  const { totalClaimCount } = useRedPacket({ contractAddress })

  const handleLogout = async () => {
    magic.user.logout()
    await push(`/claim/login?id=${key}`)
  }
  const handleCreatePackets = async () => {
    push('/')
  }

  return (
    <div className="z-30 flex w-full max-w-[400px] flex-col items-center px-5">
      <RedLantern />

      <h1
        className={`${GTSuper.className} -mt-4 text-center text-3xl sm:mt-0 sm:text-4xl`}
        style={{
          background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        The festivities are over
      </h1>

      <motion.p
        className="mt-5 text-center text-base font-normal leading-normal tracking-[-0.408px] opacity-80 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: ANIMATION_INTERVAL * 2 }}
      >
        All {totalClaimCount.toLocaleString()} red packets have been claimed.
      </motion.p>

      <motion.p
        className="mt-5 text-balance text-center text-base font-normal leading-normal tracking-[-0.408px] opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: ANIMATION_INTERVAL * 2 }}
      >
        You can still watch a video demo of Magic’s Lunar New Year experience,
        or <span className="font-semibold text-white">build your own.</span>
      </motion.p>

      <motion.div
        className="mt-8 flex aspect-[400/225] w-full items-center justify-center rounded-3xl [background:rgba(255,255,255,0.12)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 3 }}
      ></motion.div>

      <motion.div
        className="mt-6 flex w-full gap-3 sm:mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 4 }}
      >
        {isLoggedIn && (
          <Button
            className="h-12 flex-1 bg-[#FFFFFF1F] text-lg hover:bg-[#FFFFFF33]"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
        <Button className="h-12 flex-1 text-lg" onClick={handleCreatePackets}>
          Create Packets
        </Button>
      </motion.div>
    </div>
  )
}
