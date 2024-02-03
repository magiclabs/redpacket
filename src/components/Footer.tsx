'use client'

import { type Address } from '@alchemy/aa-core'
import { useWalletContext } from 'context/wallet/index.test'
import { useCallback } from 'react'
import { formatEtherDisplay } from 'utils/formatEtherDisplay'
import { type Hash } from 'viem'

type FooterProps = {
  contractAddress?: Address
  claimTxnHash?: Hash
}

export default function Footer({ contractAddress, claimTxnHash }: FooterProps) {
  const { isLoggedIn, logout, username, scaAddress, userBalance } =
    useWalletContext()

  const handleLogout = useCallback(async () => {
    await logout()
  }, [logout])

  return (
    <div className="mt-6 text-center">
      {contractAddress && (
        <a
          href={`https://basescan.org/address/${contractAddress}`}
          target="_blank"
          className="btn btn-link btn-block text-base-300 btn-xs"
        >
          View Contract
        </a>
      )}
      {isLoggedIn && (
        <div>
          {claimTxnHash && (
            <a
              href={`https://basescan.org/tx/${claimTxnHash}`}
              target="_blank"
              className="btn btn-link btn-block text-base-300 btn-xs"
            >
              View Transaction
            </a>
          )}
          <a
            href={`https://basescan.org/address/${scaAddress}`}
            target="_blank"
            className="btn btn-link btn-block text-base-300 btn-xs"
          >
            Your Balance {`${formatEtherDisplay(userBalance as bigint)} ETH`}
          </a>
          <a
            onClick={handleLogout}
            target="_blank"
            className="btn btn-link text-base-300 btn-xs"
          >
            Logout: {username}
          </a>
        </div>
      )}
    </div>
  )
}
