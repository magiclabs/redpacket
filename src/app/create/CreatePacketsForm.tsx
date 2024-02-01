'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { TotalPacketsInput } from 'app/create/TotalPacketsInput'
import { AlertIcon } from 'components/icons/AlertIcon'
import { Button } from 'components/ui/button'
import { Form } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { useForm } from 'react-hook-form'
import { formatEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import { z } from 'zod'

export const MAXIMUM_PACKETS = 99999
export const MINIMUM_PACKETS = 1
export const MINIMUM_ETH = 0.001

export const DEFAULT_PACKETS = 10
export const DEFAULT_ETH = 0.02

const formSchema = z.object({
  packets: z
    .number()
    .int()
    .max(MAXIMUM_PACKETS, {
      message: `Total packets must be at most ${MAXIMUM_PACKETS}.`,
    })
    .min(MINIMUM_PACKETS, {
      message: `Total packets must be at least ${MINIMUM_PACKETS}.`,
    }),
  eth: z.number().min(MINIMUM_ETH, {
    message: `Total ETH must be at least ${MINIMUM_ETH}.`,
  }),
})

export type FormValues = z.infer<typeof formSchema>

export function CreatePacketsForm() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const defaultValues = {
    packets: DEFAULT_PACKETS,
    eth: Math.max(
      MINIMUM_ETH,
      balance?.value ? Number(formatEther(balance.value)) : DEFAULT_ETH,
    ),
  }

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const {
    handleSubmit,
    register,
    formState: { isValid },
    watch,
  } = form

  const eth = watch('eth')

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const isInsufficientFunds = balance?.value
    ? Number(formatEther(balance.value)) < eth
    : false

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[440px] flex-col px-5"
        onSubmit={onSubmit}
      >
        <TotalPacketsInput />

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
              id="eth"
              {...register('eth', {
                required: true,
                valueAsNumber: true,
                min: MINIMUM_ETH,
              })}
              inputMode="numeric"
              defaultValue={defaultValues.eth}
            />
            <span className="absolute right-4 text-sm font-medium opacity-50">
              ETH
            </span>
          </div>
        </div>

        {isInsufficientFunds && balance?.value ? (
          <div className="mt-4 flex gap-3 rounded-2xl border-none bg-[#ff191e1f] px-4 py-3 sm:mt-5">
            <div className="flex flex-1 flex-col gap-0.5 leading-[150%] tracking-[-0.408px]">
              <h2 className="text-sm font-bold">Insufficient funds</h2>
              <span className="text-sm opacity-60">
                Top up your wallet with Base ETH to continue. Current balance:{' '}
                {formatEther(balance.value)} ETH
              </span>
            </div>
            <AlertIcon className="aspect-square h-10 w-10 self-center" />
          </div>
        ) : null}

        <Button
          disabled={!isValid}
          type="submit"
          className="mt-4 h-14 w-full max-w-[400px] rounded-2xl bg-[#FF191E] text-lg font-semibold sm:mt-10"
        >
          Create Packets
        </Button>
      </form>
    </Form>
  )
}
