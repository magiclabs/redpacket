'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateRedPacket } from 'app/create/useCreateRedPacket'
import { useETHPrice } from 'app/create/useETHPrice'
import { AlertIcon } from 'components/icons/AlertIcon'
import { InfiniteLoadingSpinner } from 'components/icons/InfiniteLoadingSpinner'
import { MinusIcon } from 'components/icons/MinusIcon'
import { PlusIcon } from 'components/icons/PlusIcon'
import { Button } from 'components/ui/button'
import { Form } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { cn } from 'lib/utils'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { formatEther, parseEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import { z } from 'zod'

export const MAXIMUM_PACKETS = 999
export const MINIMUM_PACKETS = 1
export const MINIMUM_ETH = 0.001

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

    return true
  }),
  eth: z.custom<string>((v) => {
    if (typeof v !== 'string') {
      return false
    }

    if (Number(v) < MINIMUM_ETH) {
      return false
    }

    if (!parseEther(v)) {
      return false
    }

    return true
  }),
})

export type FormValues = z.infer<typeof formSchema>

export function CreatePacketsForm() {
  const { address, connector } = useAccount()
  const { data: balance } = useBalance({ address })

  const defaultValues = {
    packets: `${DEFAULT_PACKETS}`,
    eth: `${Math.min(
      MINIMUM_ETH,
      balance?.value ? Number(formatEther(balance.value)) : DEFAULT_ETH,
    )}`,
  }

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const {
    handleSubmit,
    register,
    formState: { isValid: isFormValid },
    setValue,
    watch,
  } = form

  const eth = +watch('eth')
  const packets = +watch('packets')

  const isInsufficientFunds = balance?.value
    ? Number(formatEther(balance.value)) < +eth
    : false

  const isValid = isFormValid && !isInsufficientFunds

  const { createRedPacket, isWaitingApproval, isGenerating } =
    useCreateRedPacket({ eth, packets, isValid })

  const isLoading = isWaitingApproval || isGenerating

  const { push } = useRouter()

  const onSubmit = handleSubmit(async () => {
    if (isLoading) return

    try {
      const address = await createRedPacket()

      push(`/share/${address.slice(2)}`)
    } catch (e) {
      toast.error('Failed to create red packets, please try again.')
      console.error(e)
    }
  })

  const { ethPrice } = useETHPrice()

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[440px] flex-col px-5"
        onSubmit={onSubmit}
      >
        <div className="grid w-full items-center gap-3 sm:grid-flow-col sm:justify-between">
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
              disabled={isLoading}
              {...register('packets', {
                required: true,
              })}
              maxLength={4}
              id="packets"
              inputMode="numeric"
              defaultValue={DEFAULT_PACKETS}
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

        <div className="mt-4 grid w-full items-center gap-3 sm:mt-5 sm:grid-flow-col sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="eth" className="text-lg font-medium">
              Total ETH
            </Label>
            <span className="text-sm opacity-60">
              Distributed between packets
            </span>
          </div>
          <div className="relative flex h-14 items-center sm:max-w-[180px]">
            <Input
              className="h-14 rounded-lg border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF1F] pr-14 text-right font-mono text-2xl font-light"
              disabled={isLoading}
              id="eth"
              {...register('eth', {
                required: true,
                maxLength: 9,
              })}
              maxLength={9}
              inputMode="numeric"
              defaultValue={defaultValues.eth}
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
              ≈ ${(+ethPrice * +eth).toFixed(2)}
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

        {isWaitingApproval || isGenerating ? (
          <div className="mt-3 flex flex-col">
            <InfiniteLoadingSpinner className="aspect-square h-12 w-12" />
            <span className="-mt-1 text-center text-sm opacity-60">
              {isWaitingApproval
                ? 'Waiting for approval...'
                : isGenerating
                  ? 'Generating red packets....'
                  : ''}
            </span>
          </div>
        ) : (
          <Button
            disabled={!isValid}
            type="submit"
            className="mt-4 h-14 w-full max-w-[400px] rounded-2xl bg-[#FF191E] text-lg font-semibold sm:mt-10"
          >
            Create Packets
          </Button>
        )}
      </form>
    </Form>
  )
}
