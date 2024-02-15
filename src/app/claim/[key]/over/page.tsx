'use client'

import { track } from '@vercel/analytics/react'
import { RedLantern } from 'app/claim/[key]/over/RedLantern'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import { MotionHeadline } from 'components/ui/typography'
import { motion } from 'framer-motion'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { useRouter } from 'next/navigation'
import { useAccount, useDisconnect } from 'wagmi'

export default function Over() {
  const { push } = useRouter()

  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect({
    mutation: {
      onSettled: () => {
        track('Logged Out')
        push('/login')
      },
    },
  })

  return (
    <>
      <Container>
        <RedLantern />

        <MotionHeadline
          className="mt-2.5 sm:-mt-[14px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_INTERVAL * 1 }}
        >
          All packets claimed
        </MotionHeadline>

        <motion.div
          className="mt-8 text-balance text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_INTERVAL * 2 }}
        >
          Use the link below to gift red packets to your friends and family this
          Lunar New Year!
        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_INTERVAL * 3 }}
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
              track('Create Clicked')
              push('/login')
            }}
          >
            Create
          </Button>
        </motion.div>
      </Container>
    </>
  )
}
