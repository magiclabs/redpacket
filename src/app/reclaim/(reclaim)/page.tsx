'use client'

import { isEmpty } from '@fxts/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { track } from '@vercel/analytics/react'
import { RedLantern } from 'app/claim/[key]/over/RedLantern'
import { MagnifyingGlass } from 'app/reclaim/(reclaim)/MagnifyingGlass'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { Container } from 'components/ui/container'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form'
import { Input } from 'components/ui/input'
import { MotionHeadline } from 'components/ui/typography'
import { CHAINS } from 'config/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useExpireRedPacket } from 'hooks/useExpireRedPacket'
import { ANIMATION_INTERVAL, CURRENT_CHAIN_KEY } from 'lib/constants'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addProtocol } from 'utils/addProtocol'
import { validateUrl } from 'utils/validateUrl'
import { useAccount, useDisconnect } from 'wagmi'
import { z } from 'zod'

const formSchema = z.object({
  url: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function Reclaim() {
  const search = useSearchParams()
  const { isConnected, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { expireRedPacket, lastTxHash } = useExpireRedPacket()
  const [remainingBalance, setRemainingBalance] = useState('')

  const id = search.get('id')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      url: id ? `redpacket.magic.link/claim/${id}` : '',
    },
  })
  const {
    formState: { isSubmitting, isSubmitSuccessful },
    setError,
    handleSubmit,
  } = form

  const onSubmit = handleSubmit(async ({ url }) => {
    try {
      const urlWithProtocol = addProtocol(url)
      const isValid = validateUrl(urlWithProtocol)
      if (!isValid) {
        throw new Error('URL is invalid')
      }

      const parts = urlWithProtocol.split('/')
      if (parts.length !== 5 || isEmpty(parts[4])) {
        throw new Error('URL is invalid')
      }

      const id = parts[4]
      console.log(id)

      const balance = await expireRedPacket({ id })
      setRemainingBalance(balance)
    } catch (e) {
      setError('url', {
        message: e instanceof Error ? e.message : 'An error occurred',
      })
    }
  })

  if (isDisconnected) {
    redirect('/reclaim/login')
  }

  return (
    <AnimatePresence mode="wait">
      {isSubmitSuccessful ? (
        <Container
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <RedLantern />

          <MotionHeadline
            className="mt-2.5 sm:-mt-[14px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ANIMATION_INTERVAL * 1 }}
          >
            Packets archived
          </MotionHeadline>

          <motion.div
            className="mt-8 text-balance text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ANIMATION_INTERVAL * 2 }}
          >
            Claim URL has been archived and {remainingBalance} ETH has been
            transferred back to your wallet.
          </motion.div>

          <motion.div
            className="mt-10 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ANIMATION_INTERVAL * 3 }}
          >
            {isConnected && (
              <Button
                className="order-2 min-h-14 flex-1 bg-[#FFFFFF1F] text-lg font-semibold hover:bg-[#FFFFFF33] sm:order-1"
                onClick={() => {
                  track('Log Out Clicked')
                  disconnect()
                }}
              >
                Disconnect
              </Button>
            )}
            <Button
              asChild
              className="order-1 min-h-14 flex-1 text-lg font-semibold sm:order-2"
              onClick={() => {
                track('View Txn Clicked')
              }}
            >
              <a
                href={CHAINS[CURRENT_CHAIN_KEY].getTxURL(lastTxHash)}
                target="_blank"
                rel="noreferrer"
              >
                View Txn
              </a>
            </Button>
          </motion.div>
        </Container>
      ) : (
        <Container
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <MagnifyingGlass className="md:h-[260px] md:w-[260px] z-30" />

          <div className="flex flex-col gap-5 px-2">
            <MotionHeadline className="mt-5">Enter claim URL</MotionHeadline>
            <span className="max-w-[468px] text-balance text-center text-sm text-white opacity-80 sm:text-lg">
              Enter the shareable URL for packet collection you wish to archive
              and reclaim tokens from
            </span>
          </div>

          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="mt-10 flex w-full flex-col justify-center gap-5 sm:px-0"
            >
              <FormField
                disabled={isSubmitting || isSubmitSuccessful}
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="h-14 rounded-xl border-[#ffffff33] bg-[#ffffff14] text-lg text-white"
                        placeholder="redpacket.magic.link/claim/123..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF4548]" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitSuccessful}
                className="h-14 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <Spinner className="aspect-square h-5 w-5" />
                ) : (
                  <>Archive Packets</>
                )}
              </Button>
            </form>
          </Form>
        </Container>
      )}
    </AnimatePresence>
  )
}
