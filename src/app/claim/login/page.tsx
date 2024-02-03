'use client'

import { EmailForm } from 'app/EmailForm'
import { RedPacket } from 'app/RedPacket'
import { GTSuper } from 'app/fonts'
import { Button } from 'components/ui/button'
import { motion } from 'framer-motion'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { magic } from 'lib/magic'
import { useSearchParams } from 'next/navigation'

export default function Claim() {
  const search = useSearchParams()

  const key = search.get('id')

  const { isLoggedIn } = useIsLoggedIn()

  console.log({ isLoggedIn })

  if (typeof key !== 'string') {
    throw new Error('key is required')
  }

  return (
    <>
      <RedPacket initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

      <motion.div
        className="flex flex-col gap-5 px-2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ delay: ANIMATION_INTERVAL * 2 }}
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
          Happy Lunar New Year! You’ve received a special red packet. Log in to
          open it.
        </span>
      </motion.div>

      <motion.div
        className="mt-10 flex w-full flex-col justify-center gap-5 px-5 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ delay: ANIMATION_INTERVAL * 3 }}
      >
        <EmailForm redirectUri={`/claim/${key}`} />
      </motion.div>

      <Button
        onClick={async () => {
          await magic.user.logout()
        }}
      >
        Logout
      </Button>
    </>
  )
}
