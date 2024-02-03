import { useSuspenseQuery } from '@tanstack/react-query'
import { magic } from 'lib/magic'

export const useIsLoggedIn = () => {
  const { data: isLoggedIn } = useSuspenseQuery({
    queryKey: ['is-logged-in'],
    queryFn: async () => {
      if (!magic) {
        console.log('Called server side')
        return false
      }

      return !!magic.user.isLoggedIn()
    },
  })

  return { isLoggedIn }
}
