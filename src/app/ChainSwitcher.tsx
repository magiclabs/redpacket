'use client'

import { CURRENT_CHAIN } from 'lib/constants'
import { useEffect, type PropsWithChildren } from 'react'
import { useSwitchChain } from 'wagmi'

export const ChainSwitcher = ({ children }: PropsWithChildren) => {
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    switchChain({ chainId: CURRENT_CHAIN.id })
  }, [switchChain])

  return <>{children}</>
}
