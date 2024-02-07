'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form'
import { Input } from 'components/ui/input'
import { magic } from 'lib/magic'
import { createMagicConector } from 'lib/wagmi/magicConnector'
import { useForm } from 'react-hook-form'
import { isProd } from 'utils/isProd'
import { useConnect } from 'wagmi'
import { z } from 'zod'

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(isProd() ? /^[^+]*$/ : /^[*]*/, {
      message: 'Email aliases containing “+” are not allowed',
    }),
})

type FormData = z.infer<typeof formSchema>

export function EmailForm() {
  const { connect } = useConnect()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  })
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form

  const client = useQueryClient()

  const onSubmit = handleSubmit(async ({ email }) => {
    if (isSubmitting) return

    try {
      await new Promise((resolve, reject) => {
        connect(
          {
            connector: createMagicConector({
              magic,
              login: () => magic.auth.loginWithEmailOTP({ email }),
            }),
          },
          {
            onSuccess: async () => {
              client.setQueryData(['is-logged-in'], true)
              client.setQueryData(['email'], email)

              resolve(true)
            },
            onError: reject,
          },
        )
      })
    } catch (e) {
      reset()
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="relative flex">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-14 rounded-xl border-[#ffffff33] bg-[#ffffff14] pr-24 text-lg text-white"
                  placeholder="Your email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#FF4548]" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-[6px] top-2 h-10 w-20 self-center text-base font-semibold"
        >
          {isSubmitting ? (
            <Spinner className="aspect-square h-5 w-5" />
          ) : (
            <>Log in</>
          )}
        </Button>
      </form>
    </Form>
  )
}
