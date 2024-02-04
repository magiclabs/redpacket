'use client'

import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { GTSuper } from 'app/fonts'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export default function Claim() {
  const search = useSearchParams()

  const key = search.get('id')

  if (typeof key !== 'string') {
    throw new Error('key is required')
  }

  return (
    <>
      <BackLanturns
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      />

      <RedFocus
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 2.5,
        }}
      />

      <div className="relative z-30 flex flex-col items-center">
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/4 transform rounded-full bg-[rgba(255,48,52,0.70)] blur-[58px]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 3,
              duration: 0.5,
            }}
          ></motion.div>
          <RedPacket
            className="z-30 md:h-[260px] md:w-[260px]"
            initial={{ opacity: 0, y: 200, rotate: 30 }}
            animate={{ opacity: 1, y: 0, rotate: 30 }}
            transition={{
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
            delay: 3,
            duration: 0.5,
          }}
        >
          <h2
            className={`${GTSuper.className} mt-5 select-none self-center text-3xl sm:text-4xl md:text-[40px]`}
            style={{
              background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Open your red packet
          </h2>
          <span className="max-w-[468px] text-balance text-center text-sm text-white opacity-80 sm:text-lg">
            Happy Lunar New Year! You’ve received a special red packet. Log in
            to open it.
          </span>
        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-col justify-center gap-5 px-5 sm:px-0"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 3.6,
            duration: 0.5,
          }}
        >
          <EmailForm redirectUri={`/claim/${key}`} />
        </motion.div>
      </div>
    </>
  )
}
