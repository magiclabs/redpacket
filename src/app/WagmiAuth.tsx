'use client'

import { Loading } from 'components/Loading'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export const WagmiAuth = ({ children }: PropsWithChildren) => {
  const { isReconnecting } = useAccount()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isReconnecting || !isMounted) {
    return <Loading />
  }

  return <>{children}</>
}
