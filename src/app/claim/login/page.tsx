'use client'

import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import BackLanturns from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { GTSuper } from 'app/fonts'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export default function Claim() {
  const search = useSearchParams()

  const claimId = search.get('claimId')

  if (typeof claimId !== 'string') {
    throw new Error('claimId is required')
  }

  return (
    <>
      <motion.div
        className="z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <RedPacket />
      </motion.div>

      <BackLanturns
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      <RedFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      />

      <motion.div
        className="z-30 flex flex-col gap-5 px-2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ delay: 1 }}
      >
        <h2
          className={`${GTSuper.className} select-none self-center text-3xl sm:text-4xl md:text-[40px]`}
          style={{
            background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Open your red packet
        </h2>
        <span className="max-w-[468px] text-balance text-center text-sm text-white opacity-80 sm:text-lg">
          Happy Lunar New Year! You’ve received a special red packet. Log in to
          open it.
        </span>
      </motion.div>

      <motion.div
        className="mt-10 flex w-full max-w-[440px] flex-col justify-center gap-5 px-5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ delay: 1.5 }}
      >
        <EmailForm redirectUri={`/claim/packets/${claimId}`} />
      </motion.div>
    </>
  )
}
