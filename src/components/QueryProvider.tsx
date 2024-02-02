'use client'

import {
  QueryClient,
  QueryClientProvider,
  type QueryClientProviderProps,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isLocal } from 'utils/isLocal'
import { hashFn } from 'wagmi/query'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      queryKeyHashFn: hashFn,
    },
  },
})

type Props = Partial<QueryClientProviderProps>

export function QueryProvider({ children, ...props }: Props) {
  return (
    <QueryClientProvider {...props} client={client}>
      {children}
      {isLocal() && <ReactQueryDevtools initialIsOpen />}
    </QueryClientProvider>
  )
}
