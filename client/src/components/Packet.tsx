"use client";
import { useCallback } from "react";
import { useWalletContext } from "@/context/wallet";
import { useRedPacket } from "@/hooks/useRedPacket";
import { Hash } from "viem";
import { Address } from "@alchemy/aa-core";
import Image from "next/image";
import Login from "@/components/Login";
import Footer from "@/components/Footer";
import { formatEtherDisplay } from "@/utils/formatEtherDisplay";

type PacketProps = {
  contractAddress: Address;
};

export default function Packet({ contractAddress }: PacketProps) {
  const { isLoggedIn, logout, username, scaAddress, userBalance } =
    useWalletContext();
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
    handleClaim,
  } = useRedPacket({ contractAddress });

  const remainingClaimCount =
    (totalClaimCount ?? BigInt(0)) - (claimedCount ?? BigInt(0));

  function userDisplay(count: bigint) {
    if (count > 1) {
      return `${count} users`;
    } else {
      return `${count} user`;
    }
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
              <div className="flex flex-col gap-3 w-full">
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
                    <div>
                      <progress
                        className="progress progress-primary w-full progress-lg h-3 mt-6"
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
                      <h1 className="card-title">
                        🧧 You received a red packet!
                      </h1>
                      <progress
                        className="progress progress-primary w-full progress-lg h-3 mt-6"
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
                      <div className="card-actions justify-end mt-6">
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
      </div>
      <Footer
        contractAddress={contractAddress}
        claimTxnHash={claimTxnHash as Hash}
      />
    </div>
  );
}
