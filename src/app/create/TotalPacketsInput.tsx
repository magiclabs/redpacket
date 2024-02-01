'use client'

import {
  DEFAULT_PACKETS,
  MAXIMUM_PACKETS,
  MINIMUM_PACKETS,
  type FormValues,
} from 'app/create/CreatePacketsForm'
import { MinusIcon } from 'components/icons/MinusIcon'
import { PlusIcon } from 'components/icons/PlusIcon'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { cn } from 'lib/utils'
import { useFormContext } from 'react-hook-form'

export function TotalPacketsInput() {
  const { register, setValue, watch } = useFormContext<FormValues>()

  const packets = watch('packets')

  return (
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
              setValue('packets', packets - 1)
            }
          }}
        >
          <MinusIcon className="aspect-square h-5 w-5" />
        </Button>
        <Input
          className="h-14 w-full rounded-lg border border-solid border-[rgba(255,255,255,0.20)] bg-[#FFFFFF1F] text-center font-mono text-2xl font-light"
          {...register('packets', {
            required: true,
            valueAsNumber: true,
            min: MINIMUM_PACKETS,
            max: MAXIMUM_PACKETS,
          })}
          type="number"
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
              setValue('packets', Number(packets) + 1)
            }
          }}
        >
          <PlusIcon className="aspect-square h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
