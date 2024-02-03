'use client'

import Fireworks from '@fireworks-js/react'
import { RedEthereum } from 'app/claim/packets/[claimId]/lucky/RedEthereum'
import { SpakleIcon } from 'components/icons/SpakleIcon'
import { Button } from 'components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { magic } from 'lib/magic'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Lucky() {
  const { push } = useRouter()
  const { claimId } = useParams<{ claimId: string }>()
  const [isVisible, setIsVisible] = useState(true)

  const handleLogout = async () => {
    await magic.user.logout()

    push('/claim/login?claimId=' + claimId)
  }
  const handleOpenWallet = async () => {
    await magic.wallet.showUI()
  }

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div
          key="fireworks"
          className="fixed h-screen w-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Fireworks
            className="h-full w-full"
            options={{
              hue: {
                min: 0,
                max: 40,
              },
              acceleration: 1.05,
              brightness: {
                min: 50,
                max: 81,
              },
              decay: {
                min: 0.015,
                max: 0.033,
              },
              delay: {
                min: 30.0,
                max: 60.52,
              },
              explosion: 5,
              flickering: 30.05,
              intensity: 47.67,
              friction: 0.97,
              gravity: 1.94,
              opacity: 0.7,
              particles: 126,
              traceLength: 4.48,
              traceSpeed: 73,
              rocketsPoint: {
                min: 50,
                max: 60,
              },
              lineWidth: {
                explosion: {
                  min: 1,
                  max: 5,
                },
                trace: {
                  min: 0,
                  max: 0.1,
                },
              },
              lineStyle: 'round',
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="luckey"
          className="flex w-[400px] flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <RedEthereum />
          </motion.div>

          <motion.span
            className="mt-[14px] text-center text-[44px] font-bold leading-normal tracking-[-0.408px] text-white [text-shadow:0px_5px_22px_rgba(255,52,52,0.50)]"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          >
            0.0015ETH
          </motion.span>

          <motion.p
            className="mt-6  text-center text-lg font-medium leading-normal tracking-[-0.408px] text-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
          >
            Happy Net Year! <br />
            You won 0.0015 ETH ($3.43) <br />
            <span className="font-normal opacity-70">
              Total prize pool: 1 ETH ($2,331.63)
            </span>
          </motion.p>

          <motion.div
            className="mt-8 inline-flex items-center gap-3 rounded-[58px] border border-solid border-[#FD3E42] px-6 py-3 shadow-[0px_3px_10px_2px_rgba(255,52,52,0.30)] [background:rgba(245,170,52,0.13)]"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.9 } }}
          >
            <SpakleIcon />
            <span>Your luck is in the top 10%</span>
          </motion.div>

          <motion.div
            className="mt-10 flex w-full flex-row gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1.2 } }}
          >
            <Button
              className="h-12 flex-1 gap-2 bg-[#FFFFFF1F] hover:bg-[#FFFFFF33]"
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <Button className="h-12 flex-1" onClick={handleOpenWallet}>
              Open Wallet
            </Button>
          </motion.div>

          <motion.span
            className="mt-4  w-[333px] text-center text-base font-semibold leading-normal tracking-[-0.408px] text-[rgba(255,255,255,0.70)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1.5 } }}
          >
            Funds can be transferred out or accessed at any time via{' '}
            <b className="text-white">wallet.magic.link</b>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
