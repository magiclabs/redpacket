'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from 'components/Spinner'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { magic } from 'lib/magic'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.custom<string>((v) => {
    return (
      typeof v === 'string' &&
      z.string().email().safeParse(v).success &&
      // Prevent user from entering a "+" in their email (aliasing)
      !v.includes('+')
    )
  }),
})

type FormData = z.infer<typeof formSchema>

type Props = {
  redirectUri?: string
}

export function EmailForm({ redirectUri = '/create' }: Props) {
  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const { push } = useRouter()

  const onSubmit = handleSubmit(async ({ email }) => {
    if (isSubmitting) return

    const result = await magic.auth.loginWithEmailOTP({ email })

    const isConnected = await magic.user.isLoggedIn()

    console.log({ isConnected })

    await push(redirectUri)
  })

  return (
    <form className="relative flex" onSubmit={onSubmit}>
      <Input
        className="h-14 rounded-xl border-[#ffffff33] bg-[#ffffff14] pr-24 text-lg text-white"
        placeholder="Your email"
        type="email"
        {...register('email', {
          required: true,
        })}
      />

      <Button
        disabled={!isValid || isSubmitting}
        className="absolute right-[6px] h-10 w-20 self-center text-base font-semibold"
      >
        {isSubmitting ? (
          <Spinner className="aspect-square h-5 w-5" />
        ) : (
          <>Log in</>
        )}
      </Button>
    </form>
  )
}
