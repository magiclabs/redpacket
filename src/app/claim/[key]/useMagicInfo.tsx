import { useQuery, useQueryClient } from '@tanstack/react-query'
import { magic } from 'lib/magic'
import { getAddress } from 'viem'

export function useMagicInfo() {
  const client = useQueryClient()

  const { data, ...rest } = useQuery({
    queryKey: ['magicInfo', client.getQueryData(['email'])],
    queryFn: async () => {
      const info = await magic.user.getInfo()

      const publicAddress = getAddress(info.publicAddress!)

      return {
        ...info,
        publicAddress,
      }
    },
  })

  return {
    data,
    ...rest,
  }
}
