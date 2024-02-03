'use client'

import { RedEthereum } from 'app/claim/packets/[claimId]/lucky/RedEthereum'
import { RedPacketFireworks } from 'app/claim/packets/[claimId]/lucky/RedPacketFireworks'
import { SpakleIcon } from 'components/icons/SpakleIcon'
import { Button } from 'components/ui/button'
import { motion } from 'framer-motion'
import { magic } from 'lib/magic'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ANIMATION_INTERVAL } from 'src/constants'

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
    <>
      {isVisible ? (
        <motion.div
          key="fireworks"
          className="fixed h-screen w-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <RedPacketFireworks />
        </motion.div>
      ) : (
        <motion.div
          key="lucky"
          className="z-30 flex w-[400px] flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <RedEthereum
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          />

          <motion.span
            className="mt-[14px] text-center text-[44px] font-bold leading-normal tracking-[-0.408px] text-white [text-shadow:0px_5px_22px_rgba(255,52,52,0.50)]"
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL },
            }}
          >
            0.0015ETH
          </motion.span>

          <motion.p
            className="mt-6  text-center text-lg font-medium leading-normal tracking-[-0.408px] text-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL * 2 },
            }}
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
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL * 3 },
            }}
          >
            <SpakleIcon />
            <span>Your luck is in the top 10%</span>
          </motion.div>

          <motion.div
            className="mt-10 flex w-full flex-row gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL * 4 },
            }}
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
            animate={{
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL * 5 },
            }}
          >
            Funds can be transferred out or accessed at any time via{' '}
            <b className="text-white">wallet.magic.link</b>
          </motion.span>
        </motion.div>
      )}
    </>
  )
}
