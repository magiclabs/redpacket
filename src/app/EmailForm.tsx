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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useConnect } from 'wagmi'
import { z } from 'zod'

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/^[^+]*$/, {
      message: 'Email aliases containing “+” are not allowed',
    }),
})

// const formSchema = z.object({
//   email: z.custom<string>((v) => {
//     return (
//       typeof v === 'string' &&
//       z.string().email().safeParse(v).success &&
//       // Prevent user from entering a "+" in their email (aliasing)
//       (!isProd() ? true : !v.includes('+'))
//     )
//   }, ''),
// })

type FormData = z.infer<typeof formSchema>

type Props = {
  redirectUri?: string
}

export function EmailForm({ redirectUri = '/create' }: Props) {
  const { connect } = useConnect()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })
  const {
    register,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
  } = form

  const { push } = useRouter()

  const client = useQueryClient()

  const onSubmit = handleSubmit(async ({ email }) => {
    if (isSubmitting) return

    await new Promise((resolve) => {
      connect(
        {
          connector: createMagicConector({
            magic,
            login: () => magic.auth.loginWithEmailOTP({ email }),
          }),
        },
        {
          onSuccess: async () => {
            console.log('SUCCESS!')
            client.setQueryData(['is-logged-in'], true)
            client.setQueryData(['email'], email)

            resolve(true)
          },
        },
      )
    })
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
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
