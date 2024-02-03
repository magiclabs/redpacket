'use client'

import { RedPacket } from 'app/RedPacket'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { Progress } from 'components/ui/progress'
import { motion } from 'framer-motion'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import { redirect, useParams, useRouter } from 'next/navigation'

export default function ClaimPacket() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const { isLoggedIn } = useIsLoggedIn()

  const handleOpen = () => {
    push(`/claim/${key}/result`)
  }

  if (!isLoggedIn) {
    redirect(`/claim/login?id=${key}`)
  }

  return (
    <>
      <BackLanturns />
      <RedFocus />

      <div className="z-10 flex flex-1 flex-col items-center justify-center">
        <div
          role="button"
          className="relative z-50 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-8px] hover:transform"
          onClick={handleOpen}
        >
          <motion.div
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <RedPacket className="h-[480px] w-[480px] rotate-0" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 inline-flex h-14 shrink-0 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-xl border border-solid border-[rgba(255,255,255,0.20)] px-10 py-[19px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.14),0px_6px_44px_8px_rgba(0,0,0,0.28)] backdrop-blur [background:rgba(255,255,255,0.08)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, ease: 'easeInOut' }}
          >
            <span>Open</span>
          </motion.div>
        </div>

        <motion.div
          className="mt-[15px] flex w-full flex-col items-center px-5 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, ease: 'easeInOut' }}
        >
          <span className="self-stretch text-center text-xs font-semibold leading-normal tracking-[3px] text-white opacity-50">
            FEELING LUCKY?
          </span>

          <div className="mt-2 text-white">
            <span className="font-mono font-medium leading-normal tracking-[-0.408px]">
              {Number(1).toFixed(5)} ETH
            </span>
            <span className="opacity-70">{` / 1 ETH up for grabs`}</span>
          </div>

          <Progress
            value={100}
            className="mt-[19px] w-full"
            style={{
              background: 'linear-gradient(90deg, #DF0005 0%, #FF3C40 100%)',
              boxShadow: '0px 3px 10px 2px rgba(255, 52, 52, 0.30)',
            }}
          />
        </motion.div>
      </div>
    </>
  )
}
