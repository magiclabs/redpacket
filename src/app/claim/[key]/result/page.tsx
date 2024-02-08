'use client'

import { useMutation } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { WalletDropdown } from 'app/(create)/create/WalletDropdown'
import { useETHPrice } from 'app/(create)/create/useETHPrice'
import { useRedPacket } from 'app/(create)/share/[key]/useRedPacket'
import { BackLanturns } from 'app/claim/BackLanterns'
import { RedFocus } from 'app/claim/RedFocus'
import { RedEthereum } from 'app/claim/[key]/result/RedEthereum'
import { RedPacketFireworks } from 'app/claim/[key]/result/RedPacketFireworks'
import { useClaimedAmount } from 'app/claim/[key]/result/useClaimedAmount'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import { AnimatePresence, motion } from 'framer-motion'
import { ANIMATION_INTERVAL, CURRENT_CHAIN_KEY } from 'lib/constants'
import { magic } from 'lib/magic'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toUSD } from 'utils/toUSD'
import { formatEther, type Address } from 'viem'
import { useAccount, useDisconnect } from 'wagmi'

export default function Lucky() {
  const { key } = useParams<{ key: string }>()

  const { isDisconnected } = useAccount()

  const contractAddress: Address = `0x${key}`

  const { ethPrice } = useETHPrice()
  const { totalBalance } = useRedPacket({ contractAddress })

  const { disconnect } = useDisconnect()

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
      redirect('/claim/login?id=' + key)
    }
  }, [isDisconnected, key])

  const isLoading = useMemo(() => {
    return claimedAmount === 0n || isVisible
  }, [claimedAmount, isVisible])

  return (
    <>
      <BackLanturns />
      <RedFocus />
      <WalletDropdown />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute h-full w-full"
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
        {!isLoading && (
          <Container
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
              {parseFloat(Number(formatEther(claimedAmount)).toFixed(6))} ETH
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
              {parseFloat(Number(formatEther(claimedAmount)).toFixed(6))} ETH (
              {ethPrice && toUSD(Number(formatEther(claimedAmount)), ethPrice)}
              ) <br />
              <span className="font-normal opacity-70">
                Total prize pool:{' '}
                {totalBalance ? parseFloat(totalBalance.toFixed(6)) : 0} ETH
                {` `}({ethPrice && toUSD(totalBalance, ethPrice)})
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
                  disconnect()
                }}
              >
                Log Out
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
                href={`https://wallet.magic.link/?network=${CURRENT_CHAIN_KEY}`}
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
          </Container>
        )}
      </AnimatePresence>
    </>
  )
}
