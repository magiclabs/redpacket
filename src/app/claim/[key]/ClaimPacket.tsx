'use client'

import { track } from '@vercel/analytics'
import { useRedPacket } from 'app/(create)/share/[key]/useRedPacket'
import { RedPacket } from 'app/RedPacket'
import { useAlchemyClient } from 'app/claim/[key]/useAlchemyClient'
import { useClaimPacket } from 'app/claim/[key]/useClaimPacket'
import { InfiniteLoadingSpinner } from 'components/icons/InfiniteLoadingSpinner'
import { Progress } from 'components/ui/progress'
import { motion } from 'framer-motion'
import { redirect, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { type Address } from 'viem'

export function ClaimPacket() {
  const { key } = useParams<{ key: string }>()

  const contractAddress: Address = `0x${key}`

  const {
    remainingBalance,
    totalBalance,
    isExpired,
    refetch,
    claimedAddresses,
    isLoading,
  } = useRedPacket({
    contractAddress,
  })

  const { client } = useAlchemyClient()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (
      client?.account.address &&
      claimedAddresses?.includes(client.account.address)
    ) {
      redirect(`/claim/${key}/result`)
    }

    if (isExpired) {
      redirect(`/claim/${key}/over`)
    }
  }, [claimedAddresses, client, isExpired, isLoading, key])

  const { claim, isPending } = useClaimPacket()

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <InfiniteLoadingSpinner className="aspect-square h-16 w-16" />
        <span className="text-sm font-semibold">
          Available packets checking...
        </span>
        <motion.span
          className="mt-1 text-center text-sm text-[#ffffffcc]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          This takes a few seconds
        </motion.span>
      </div>
    )
  }

  return (
    <>
      {!isPending ? (
        <>
          <div
            role="button"
            className="relative z-50 aspect-square w-full cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-8px] hover:transform"
            onClick={async () => {
              track(`Red Packet Open Clicked`)
              await claim()
              await refetch()
            }}
          >
            <RedPacket
              className="h-full w-full rotate-0 sm:h-[480px] sm:w-[480px]"
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />

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
                {parseFloat(remainingBalance.toFixed(5))} ETH
              </span>
              <span className="opacity-70">{` / ${totalBalance} ETH up for grabs`}</span>
            </div>

            <Progress
              value={
                remainingBalance > 0
                  ? (remainingBalance / totalBalance) * 100
                  : 0
              }
              className="mt-5 w-full"
              style={{
                boxShadow: '0px 3px 10px 2px rgba(255, 52, 52, 0.30)',
              }}
            />
          </motion.div>
        </>
      ) : (
        <div className="flex flex-col">
          <InfiniteLoadingSpinner className="aspect-square h-16 w-16" />
          <span className="text-sm font-semibold">
            Confirming packet details...
          </span>
          <span className="mt-1 text-center text-sm opacity-60">
            This takes a few seconds
          </span>
        </div>
      )}
    </>
  )
}
