'use client'

import { useMutation } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { useETHPrice } from 'app/(create)/create/useETHPrice'
import { useRedPacket } from 'app/(create)/share/[key]/useRedPacket'
import { RedEthereum } from 'app/claim/[key]/result/RedEthereum'
import { RedPacketFireworks } from 'app/claim/[key]/result/RedPacketFireworks'
import { useClaimedAmount } from 'app/claim/[key]/result/useClaimedAmount'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ANIMATION_INTERVAL } from 'lib/constants'
import { magic } from 'lib/magic'
import { redirect, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatEther, type Address } from 'viem'
import { useAccount } from 'wagmi'

export default function Lucky() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { isDisconnected } = useAccount()
  const { ethPrice } = useETHPrice()
  const { totalBalance } = useRedPacket({ contractAddress })

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

  const { claimedAmount } = useClaimedAmount()

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  useEffect(() => {
    if (isDisconnected) {
      if (!key) {
        redirect('/')
      }

      redirect('/claim/login?id=' + key)
    }
  }, [isDisconnected, key])

  return (
    <>
      <WalletDropdown />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute h-dvh w-screen"
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
            className="z-10 flex w-full max-w-[400px] flex-col items-center"
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
              {parseFloat(Number(formatEther(claimedAmount)).toFixed(5))} ETH
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
              Happy New Year!
              <br />
              You won{' '}
              {parseFloat(Number(formatEther(claimedAmount)).toFixed(5))} ETH (
              {ethPrice &&
                `$${parseFloat(
                  (Number(formatEther(claimedAmount)) * +ethPrice).toFixed(2),
                ).toLocaleString()}`}
              ) <br />
              <span className="font-normal opacity-70">
                Total prize pool:{' '}
                {totalBalance ? parseFloat(totalBalance.toFixed(5)) : 0} ETH
                {` `}
                {ethPrice &&
                  `($${parseFloat((totalBalance * +ethPrice).toFixed(2)).toLocaleString()})`}
              </span>
            </motion.p>

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
                onClick={() => {
                  track(`Log Out Clicked`)
                  handleLogout()
                }}
              >
                {isLoggingOut ? (
                  <Spinner className="aspect-square h-7 w-7" />
                ) : (
                  'Log Out'
                )}
              </Button>
              <Button
                className="h-14 flex-1 text-lg"
                onClick={() => {
                  track(`Open Wallet Clicked`)
                  handleOpenWallet()
                }}
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
                onClick={() => {
                  track(`wallet.magic.link Clicked`)
                }}
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
