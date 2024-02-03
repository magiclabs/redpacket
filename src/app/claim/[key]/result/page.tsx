'use client'

import { useMutation } from '@tanstack/react-query'
import { RedEthereum } from 'app/claim/[key]/result/RedEthereum'
import { RedPacketFireworks } from 'app/claim/[key]/result/RedPacketFireworks'
import { Spinner } from 'components/Spinner'
import { SpakleIcon } from 'components/icons/SpakleIcon'
import { Button } from 'components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { magic } from 'lib/magic'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Lucky() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const { mutateAsync: handleLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await magic.user.logout()

      await push(`/claim/login?id=${key}`)
    },
  })

  const { mutateAsync: handleOpenWallet, isPending } = useMutation({
    mutationFn: async () => {
      await magic.wallet.showUI()
    },
  })

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed h-screen w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <RedPacketFireworks />
            <RedPacketFireworks />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            className="flex w-full max-w-[400px] flex-col items-center"
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
              0.0015 ETH
            </motion.span>

            <motion.p
              className="mt-6 text-center text-lg font-medium leading-normal tracking-[-0.408px] text-white"
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
              className="mt-10 flex w-full gap-3 px-5"
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: ANIMATION_INTERVAL * 4 },
              }}
            >
              <Button
                className="h-14 flex-1 bg-[#FFFFFF1F] text-lg hover:bg-[#FFFFFF33]"
                onClick={() => handleLogout()}
              >
                {isLoggingOut ? (
                  <Spinner className="aspect-square h-7 w-7" />
                ) : (
                  'Log Out'
                )}
              </Button>
              <Button
                className="h-14 flex-1 text-lg"
                onClick={() => handleOpenWallet()}
              >
                {isPending ? (
                  <Spinner className="aspect-square h-7 w-7" />
                ) : (
                  'Open Wallet'
                )}
              </Button>
            </motion.div>

            <motion.span
              className="mt-4 w-[333px] text-center text-base font-normal leading-normal tracking-[-0.408px] text-[rgba(255,255,255,0.70)]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: ANIMATION_INTERVAL * 5 },
              }}
            >
              Funds can be transferred out or accessed at any time via{' '}
              <a
                href="https://wallet.magic.link"
                target="_blank"
                rel="noopener"
                className="font-semibold text-white hover:opacity-80"
              >
                wallet.magic.link
              </a>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
