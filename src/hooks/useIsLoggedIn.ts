import { useQuery } from '@tanstack/react-query'
import { magic } from 'lib/magic'
import { isServer } from 'utils/isServer'

export const useIsLoggedIn = () => {
  const { data: isLoggedIn, ...rest } = useQuery({
    queryKey: ['is-logged-in'],
    queryFn: async () => {
      if (isServer()) {
        console.log('Called server side')
        return false
      }

      return magic.user.isLoggedIn()
    },
  })

  return { isLoggedIn, ...rest }
}
