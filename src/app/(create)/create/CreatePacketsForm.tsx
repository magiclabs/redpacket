'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { track } from '@vercel/analytics'
import { AlertIcon } from 'components/icons/AlertIcon'
import { InfiniteLoadingSpinner } from 'components/icons/InfiniteLoadingSpinner'
import { MinusIcon } from 'components/icons/MinusIcon'
import { PlusIcon } from 'components/icons/PlusIcon'
import { Button } from 'components/ui/button'
import { Form } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { MotionHeadline } from 'components/ui/typography'
import { useCreateRedPacket } from 'hooks/useCreateRedPacket'
import { useETHPrice } from 'hooks/useETHPrice'
import { cn } from 'lib/utils'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { formatEther, parseEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import { z } from 'zod'

export const MAXIMUM_PACKETS = 100
export const MINIMUM_PACKETS = 1
export const MINIMUM_ETH = 0.001
export const MAXIMUM_ETH = 4

export const DEFAULT_PACKETS = 10
export const DEFAULT_ETH = 0.02

const formSchema = z.object({
  packets: z.custom<string>((v) => {
    if (typeof v !== 'string') {
      return false
    }

    if (Number(v) < MINIMUM_PACKETS) {
      return false
    }

    if (Number(v) > MAXIMUM_PACKETS) {
      return false
    }

    if (isNaN(Number(v))) {
      return false
    }

    if (Number(v) % 1 !== 0) {
      return false
    }

    return true
  }),
  eth: z
    .string()
    .refine((v) => {
      return Number(v) >= MINIMUM_ETH
    }, 'ETH amount is too low')
    .refine((v) => {
      return Number(v) <= MAXIMUM_ETH
    }, 'ETH amount is too high')
    .refine((v) => {
      return parseEther(v)
    }, 'Invalid ETH amount'),
})

export type FormValues = z.infer<typeof formSchema>

export function CreatePacketsForm() {
  const { push } = useRouter()
  const { address: publicAddress } = useAccount()
  const { data: balance } = useBalance({ address: publicAddress })
  const { ethPrice } = useETHPrice()

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      packets: DEFAULT_PACKETS.toString(),
      eth: MINIMUM_ETH.toString(),
    },
  })

  const {
    handleSubmit,
    register,
    formState: { isValid: isFormValid, isSubmitting },
    setValue,
    watch,
  } = form

  const eth = +watch('eth')
  const packets = +watch('packets')

  const isInsufficientFunds = useMemo(() => {
    return balance ? +formatEther(balance.value) < +eth : false
  }, [balance, eth])

  const isValid = isFormValid && !isInsufficientFunds

  const {
    createRedPacket,
    isWaitingApproval,
    isGenerating,
    isIdle,
    isSuccess,
  } = useCreateRedPacket()

  const onSubmit = handleSubmit(async ({ eth, packets }) => {
    try {
      const address = await createRedPacket({
        totalClaimCount: +packets,
        principal: +eth,
      })

      console.log({ address })

      track(`Red Packet Created`, {
        userAddress: publicAddress as string,
        contractAddress: address,
        packets,
        eth,
      })

      push(`/share/${address.slice(2)}`)
      toast.success(`Red packets created successfully!`)
    } catch (e: any) {
      toast.error('Failed to create red packets, please try again.')
      console.error(e)

      track(`Red Packet Creation Failed`, {
        userAddress: publicAddress as string,
        packets,
        eth,
        message: e?.shortMessage || e?.name || e?.message,
      })
    }
  })

  return (
    <Form {...form}>
      <form className="flex w-full flex-col" onSubmit={onSubmit}>
        <MotionHeadline>
          Create your <span className="inline-block">red packets</span>
        </MotionHeadline>

        <div className="mt-8 grid w-full items-center gap-3 sm:grid-flow-col sm:justify-between">
          <Label htmlFor="packets" className="text-lg font-medium">
            Total Packets
          </Label>
          <div className="relative flex h-14 items-center sm:max-w-[180px]">
            <Button
              type="button"
              className={cn(
                'absolute left-2 flex aspect-square h-10 w-10 rounded-sm bg-[#FFFFFF1f] p-0 hover:bg-[#FFFFFF33]',
                packets <= MINIMUM_PACKETS &&
                  `cursor-not-allowed disabled:pointer-events-auto disabled:opacity-50`,
              )}
              disabled={packets <= MINIMUM_PACKETS}
              onClick={() => {
                if (packets > MINIMUM_PACKETS) {
                  setValue('packets', `${packets - 1}`)
                }
              }}
            >
              <MinusIcon className="aspect-square h-5 w-5" />
            </Button>
            <Input
              className="h-14 w-full rounded-lg border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF1F] text-center font-mono text-2xl font-light"
              disabled={isSubmitting}
              {...register('packets', {
                required: true,
                onChange: (e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '')
                  setValue('packets', value)
                },
              })}
              maxLength={3}
              id="packets"
              inputMode="numeric"
            />
            <Button
              type="button"
              disabled={packets >= MAXIMUM_PACKETS}
              className={cn(
                'absolute right-2 aspect-square h-10 w-10 rounded-sm bg-[#FFFFFF1f] p-0 hover:bg-[#FFFFFF33]',
                packets >= MAXIMUM_PACKETS &&
                  `cursor-not-allowed disabled:pointer-events-auto`,
              )}
              onClick={() => {
                if (packets < MAXIMUM_PACKETS) {
                  setValue('packets', `${packets + 1}`)
                }
              }}
            >
              <PlusIcon className="aspect-square h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 grid w-full items-center gap-3 sm:mt-5 sm:grid-flow-col sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="eth" className="text-lg font-medium">
              Total ETH
            </Label>
            <span className="text-sm opacity-60">Divided between packets</span>
          </div>
          <div className="relative flex h-14 items-center sm:max-w-[180px]">
            <Input
              className="h-14 rounded-lg border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF1F] pr-14 text-right font-mono text-2xl font-light"
              disabled={isSubmitting}
              id="eth"
              {...register('eth', {
                required: true,
                maxLength: 9,
                onChange: (e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  const dotCount = value.split('.').length - 1

                  if (dotCount > 1) {
                    return
                  }

                  setValue('eth', value)
                },
              })}
              maxLength={9}
              inputMode="numeric"
            />
            <span className="absolute right-4 text-sm font-medium opacity-50">
              ETH
            </span>
          </div>
        </div>

        <div className="mt-1 flex w-full justify-end pr-1">
          {!ethPrice || isNaN(+ethPrice * +eth) ? (
            <div className="my-0.5 h-4 w-10 animate-pulse rounded-full bg-gray-500" />
          ) : (
            <span className="text-right text-sm tabular-nums opacity-60">
              ≈ ${Number((+ethPrice * +eth).toFixed(2)).toLocaleString()}
            </span>
          )}
        </div>

        {isInsufficientFunds && balance?.value ? (
          <div className="mt-4 flex gap-3 rounded-2xl border-none bg-[#ff191e1f] px-4 py-3 sm:mt-5">
            <div className="flex flex-1 flex-col gap-0.5 leading-[150%] tracking-[-0.408px]">
              <h2 className="text-sm font-bold">Insufficient funds</h2>
              <span className="text-sm opacity-60">
                Top up your wallet with Base ETH to continue. Current balance:{' '}
                {Number(formatEther(balance.value)).toFixed(5)} ETH
              </span>
            </div>
            <AlertIcon className="aspect-square h-10 w-10 self-center" />
          </div>
        ) : null}

        {isIdle && (
          <Button
            disabled={isSubmitting || !isValid}
            type="submit"
            className="mt-8 h-14 w-full max-w-[400px] rounded-2xl bg-[#FF191E] text-lg font-semibold sm:mt-10"
          >
            Create Packets
          </Button>
        )}
        {isGenerating && (
          <div className="mt-3 flex flex-col">
            <InfiniteLoadingSpinner className="aspect-square h-12 w-12" />
            <span className="-mt-1 text-center text-sm opacity-60">
              Generating red packets....
            </span>
          </div>
        )}
        {(isWaitingApproval || isSuccess) && (
          <div className="mt-3 flex flex-col">
            <InfiniteLoadingSpinner className="aspect-square h-12 w-12" />
            <span className="-mt-1 text-center text-sm opacity-60">
              Waiting for approval...
            </span>
          </div>
        )}
      </form>
    </Form>
  )
}
