'use client'

import { Loading } from 'components/Loading'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { isServer } from 'utils/isServer'
import { useAccount } from 'wagmi'

export const WagmiAuth = ({ children }: PropsWithChildren) => {
  const { isReconnecting } = useAccount()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isServer() || isReconnecting || !isMounted) {
    return <Loading />
  }

  return <>{children}</>
}
