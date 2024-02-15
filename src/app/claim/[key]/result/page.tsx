'use client'

import { useMutation } from '@tanstack/react-query'
import { track } from '@vercel/analytics/react'
import { RedEthereum } from 'app/claim/[key]/result/RedEthereum'
import { RedPacketFireworks } from 'app/claim/[key]/result/RedPacketFireworks'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import { AnimatePresence, motion } from 'framer-motion'
import { useETHPrice } from 'hooks/useETHPrice'
import { useRedPacket } from 'hooks/useRedPacket'
import { ANIMATION_INTERVAL, CURRENT_CHAIN_KEY } from 'lib/constants'
import { magic } from 'lib/magic'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toUSD } from 'utils/toUSD'
import { formatEther, type Address } from 'viem'
import { useDisconnect } from 'wagmi'

export default function Lucky() {
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const { ethPrice } = useETHPrice()
  const {
    metadata,
    isPending: isRedPacketPending,
    isError,
    isSuccess,
  } = useRedPacket({
    contractAddress,
  })

  const { disconnect } = useDisconnect()

  const { mutateAsync: handleOpenWallet, isPending: isOpenWalletPending } =
    useMutation({
      mutationFn: async () => {
        await magic.wallet.showUI()
      },
    })

  const [isVisible, setIsVisible] = useState(true)

  const isPending = useMemo(() => {
    return isRedPacketPending || isVisible
  }, [isRedPacketPending, isVisible])

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isPending && (
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

      {isError && (
        <Container>
          <div>Error</div>
        </Container>
      )}

      {!isPending && isSuccess && (
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
            {formatEther(metadata.claimedAmount)} ETH
          </motion.span>

          <motion.p
            className="mt-6 text-center text-lg font-medium leading-normal tracking-[-0.408px] text-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL * 1 },
            }}
          >
            Happy New Year!
            <br />
            You won{' '}
            {parseFloat(
              Number(formatEther(metadata.claimedAmount)).toFixed(6),
            )}{' '}
            ETH (
            {ethPrice &&
              toUSD(Number(formatEther(metadata.claimedAmount)), ethPrice)}
            ) <br />
            <span className="font-normal opacity-70">
              Total prize pool:{' '}
              {metadata.principal
                ? parseFloat(Number(formatEther(metadata.principal)).toFixed(6))
                : 0}{' '}
              ETH
              {` `}(
              {ethPrice &&
                toUSD(Number(formatEther(metadata.principal)), ethPrice)}
              )
            </span>
          </motion.p>

          <motion.div
            className="mt-10 flex w-full gap-3 px-5"
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: ANIMATION_INTERVAL * 2 },
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
              {isOpenWalletPending ? (
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
              transition: { delay: ANIMATION_INTERVAL * 3 },
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
  )
}
