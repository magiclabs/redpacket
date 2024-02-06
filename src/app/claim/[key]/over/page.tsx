'use client'

import { track } from '@vercel/analytics/react'
import { useRedPacket } from 'app/(create)/share/[key]/useRedPacket'
import { RedLantern } from 'app/claim/[key]/over/RedLantern'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import { MotionHeadline } from 'components/ui/typography'
import { motion } from 'framer-motion'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { useParams, useRouter } from 'next/navigation'
import { type Address } from 'viem'
import { useAccount, useDisconnect } from 'wagmi'

export default function Over() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        push('/claim/login?id=' + key)
      },
    },
  })

  const { totalClaimCount } = useRedPacket({ contractAddress })

  return (
    <Container>
      <div className="relative flex">
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
        All packets claimed
      </MotionHeadline>

      <motion.p
        className="mt-5 text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc] opacity-80 sm:text-lg"
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
        Use the link below to watch a video demo of the experience, or{' '}
        <span className="font-semibold text-white">build your own.</span>
      </motion.div>

      <motion.div
        className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_INTERVAL * 4 }}
      >
        {isConnected && (
          <Button
            className="order-2 min-h-14 flex-1 bg-[#FFFFFF1F] text-lg font-semibold hover:bg-[#FFFFFF33] sm:order-1"
            onClick={() => {
              track('Log Out Clicked')
              disconnect()
            }}
          >
            Log Out
          </Button>
        )}
        <Button
          className="order-1 min-h-14 flex-1 text-lg font-semibold sm:order-2"
          onClick={() => {
            track('Watch Demo Clicked')
          }}
        >
          <a href="" target="_blank" rel="noopener noreferrer">
            Watch demo
          </a>
        </Button>
      </motion.div>
    </Container>
  )
}
