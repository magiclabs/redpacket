'use client'

import { RedLantern } from 'app/claim/[key]/over/RedLantern'
import { useRedPacket } from 'app/share/[key]/useRedPacket'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import { MotionHeadline } from 'components/ui/typography'
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
    <Container>
      <div className="relative">
        <motion.div
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[rgba(255,48,52,0.70)] blur-[58px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
        ></motion.div>
        <RedLantern />
      </div>

      <MotionHeadline
        className="mt-2.5 sm:-mt-[14px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 1 }}
      >
        The festivities are over
      </MotionHeadline>

      <motion.p
        className="mt-5 text-center text-base font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc] opacity-80 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: ANIMATION_INTERVAL * 2 }}
      >
        All {totalClaimCount.toLocaleString()} red packets have been claimed.
      </motion.p>

      <motion.div
        className="mt-5 text-balance text-center text-base font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 3 }}
      >
        You can still watch a video demo of Magic’s Lunar New Year experience,
        or <span className="font-semibold text-white">build your own.</span>
      </motion.div>

      <motion.div
        className="mt-8 flex aspect-[400/225] w-full items-center justify-center rounded-3xl [background:rgba(255,255,255,0.12)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 3 }}
      ></motion.div>

      <motion.div
        className="mt-6 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row"
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
    </Container>
  )
}
