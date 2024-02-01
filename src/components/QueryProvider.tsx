'use client'

import {
  QueryClient,
  QueryClientProvider,
  type QueryClientProviderProps,
} from '@tanstack/react-query'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

type Props = Partial<QueryClientProviderProps>

export function QueryProvider(props: Props) {
  return <QueryClientProvider {...props} client={client} />
}
