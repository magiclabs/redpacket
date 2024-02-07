'use client'

import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { Container } from 'components/ui/container'
import { MotionHeadline } from 'components/ui/typography'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export default function Claim() {
  const { push } = useRouter()
  const search = useSearchParams()
  const { isConnected } = useAccount()

  const key = search.get('id')

  if (typeof key !== 'string') {
    throw new Error('key is required')
  }

  useEffect(() => {
    if (isConnected) {
      push(`/claim/${key}`)
    }
  }, [isConnected, key, push])

  return (
    <>
      <BackLanturns
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />

      <RedFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 2,
        }}
      />

      <Container>
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/4 transform rounded-full bg-[rgba(255,48,52,0.70)] blur-[58px]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 2,
              duration: 0.5,
            }}
          ></motion.div>
          <RedPacket
            className="md:h-[260px] md:w-[260px] z-30"
            initial={{ opacity: 0, y: 200, rotate: 30 }}
            animate={{ opacity: 1, y: 0, rotate: 30 }}
            transition={{
              ease: 'easeInOut',
              type: 'spring',
              duration: 1.2,
              stiffness: 50,
            }}
          />
        </div>

        <motion.div
          className="flex flex-col gap-5 px-2"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.4,
            duration: 0.5,
          }}
        >
          <MotionHeadline className="mt-5">Open your red packet</MotionHeadline>
          <span className="max-w-[468px] text-balance text-center text-sm text-white opacity-80 sm:text-lg">
            Happy Lunar New Year! You’ve received a special red packet. Log in
            to open it.
          </span>
        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-col justify-center gap-5 sm:px-0"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.8,
            duration: 0.5,
          }}
        >
          <EmailForm />
        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-col justify-center gap-5 text-pretty sm:px-0"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.5 }}
        >
          <span className="max-w-[354px] self-center text-center text-xs text-[#FFFFFF80] sm:text-sm">
            {`By proceeding, you consent to Magic's `}
            <a
              href="https://magic.link/legal/privacy-policy"
              target="_blank"
              rel="noopener"
              className="font-semibold text-[#FFFFFFBF] hover:text-white"
            >
              Privacy Policy
            </a>
            {` and `}
            <a
              href="https://magic.link/legal/terms-of-service"
              target="_blank"
              rel="noopener"
              className="font-semibold text-[#FFFFFFBF] hover:text-white"
            >
              Terms of Service
            </a>
            {` Limited Time offer. One (1) entry per person. Must be 18 years or older to participate. Void where prohibited. See complete `}
            <a
              href="https://magic.link/legal/red-packet-terms-conditions"
              target="_blank"
              rel="noopener"
              className="font-semibold text-[#FFFFFFBF] hover:text-white"
            >
              Giveaway Terms and Conditions
            </a>
            {` for details.`}
          </span>
        </motion.div>
      </Container>
    </>
  )
}
