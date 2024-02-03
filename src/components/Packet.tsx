'use client'

import { type Address } from '@alchemy/aa-core'
import Footer from 'components/Footer'
import Login from 'components/Login'
import { useWalletContext } from 'context/wallet/index.test'
import { useRedPacket } from 'hooks/useRedPacket'
import Image from 'next/image'
import { formatEtherDisplay } from 'utils/formatEtherDisplay'
import { type Hash } from 'viem'

type PacketProps = {
  contractAddress: Address
}

export default function Packet({ contractAddress }: PacketProps) {
  const { isLoggedIn, logout, username, scaAddress, userBalance } =
    useWalletContext()

  const {
    loading,
    isClaiming,
    expired,
    totalClaimCount,
    claimedCount,
    currentBalance,
    totalBalance,
    claimedAmount,
    claimTxnHash,
    isCreator,
    handleClaim,
  } = useRedPacket({ contractAddress })

  const remainingClaimCount =
    (totalClaimCount ?? BigInt(0)) - (claimedCount ?? BigInt(0))

  function userDisplay(count: bigint) {
    if (count > 1) {
      return `${count} users`
    } else {
      return `${count} user`
    }
  }

  function ClaimProgressBar() {
    return (
      <div>
        <progress
          className="progress progress-primary progress-lg mt-6 h-3 w-full"
          value={`${currentBalance as bigint}`}
          max={`${totalBalance as bigint}`}
        ></progress>
        <div className="text-xs">{`${formatEtherDisplay(
          currentBalance as bigint,
        )} / ${formatEtherDisplay(
          totalBalance as bigint,
        )} ETH left to claim by ${userDisplay(
          remainingClaimCount as bigint,
        )}.`}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <Image
            src="/red-packet.png"
            width={1424}
            height={832}
            alt="Red Packet"
          />
        </figure>
        <div className="card-body">
          {loading ? (
            <div>
              <div className="flex w-full flex-col gap-3">
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>
            </div>
          ) : (
            <div>
              {claimedAmount ? (
                <div>
                  <h1 className="card-title">
                    You&apos;ve claimed {formatEtherDisplay(claimedAmount)} ETH.
                  </h1>
                  {expired ? (
                    <div className="text-md mt-6">
                      💸 All red packets have been claimed.
                    </div>
                  ) : (
                    <ClaimProgressBar />
                  )}
                </div>
              ) : (
                <div>
                  {expired ? (
                    <div>
                      <h1 className="card-title">You&apos;re too late!</h1>
                      <div className="text-md mt-3">
                        💸 All red packets have been claimed.
                      </div>
                    </div>
                  ) : (
                    <div>
                      {isCreator ? (
                        <div>
                          <h1 className="card-title">
                            🧧 Share URL with your friends!
                          </h1>
                          <div className="text-md mt-3">
                            You can&apos;t claim your own red packet.
                          </div>
                          <ClaimProgressBar />
                        </div>
                      ) : (
                        <div>
                          <h1 className="card-title">
                            🧧 You received a red packet!
                          </h1>
                          <ClaimProgressBar />
                          <div className="card-actions mt-6 justify-end">
                            {isLoggedIn ? (
                              <div className="w-full">
                                {isClaiming ? (
                                  <button
                                    disabled={true}
                                    className="btn btn-primary btn-block btn-lg"
                                  >
                                    Claiming
                                    <span className="loading loading-infinity loading-lg"></span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={handleClaim}
                                    className="btn btn-primary btn-block btn-lg"
                                  >
                                    Claim
                                  </button>
                                )}
                              </div>
                            ) : (
                              <Login />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer
        contractAddress={contractAddress}
        claimTxnHash={claimTxnHash as Hash}
      />
    </div>
  )
}
