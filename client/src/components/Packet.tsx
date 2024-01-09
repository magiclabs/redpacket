"use client";

import { useWalletContext } from "@/context/wallet";
import { useRedPacket } from "@/hooks/useRedPacket";
import { formatEther } from "viem";
import { Address } from "@alchemy/aa-core";

const rounding = require('significant-rounding');

type PacketProps = {
    contractAddress: Address;
};

export default function Packet({ contractAddress }: PacketProps) {
    //const { isLoggedIn, provider, scaAddress } = useWalletContext();
    const { loading, expired, totalClaimCount, claimedCount, currentBalance, totalBalance, claimedAmount, handleClaim } = useRedPacket({ contractAddress });
    const remainingClaimCount = (totalClaimCount ?? BigInt(0)) - (claimedCount ?? BigInt(0));

    function formatEtherDisplay(ether: bigint) {
        return `${rounding(Number(formatEther(ether ?? BigInt(0))), 3)}`;
    };

    function userDisplay(count: bigint) {
        if (count > 1) {
            return `${count} users`;
        } else {
            return `${count} user`;
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="/red-packet.png" alt="Red Packet" /></figure>
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
                                    <h1 className="card-title">You've claimed {formatEtherDisplay(claimedAmount)} ETH.</h1>
                                    {expired ? (
                                        <div className="text-md mt-3">
                                            💸 All red packets have been claimed.
                                        </div>
                                    ) : (
                                        <div>
                                            <progress className="progress progress-primary w-full progress-lg h-6 mt-3" value={`${currentBalance as bigint}`} max={`${totalBalance as bigint}`}></progress>
                                            <div className="text-xs">{`${formatEtherDisplay(currentBalance as bigint)} / ${formatEtherDisplay(totalBalance as bigint)} ETH left to claim by ${userDisplay(remainingClaimCount as bigint)}.`}</div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {expired ? (
                                        <div>
                                            <h1 className="card-title">You're too late!</h1>
                                            <div className="text-md mt-3">
                                                💸 All red packets have been claimed.
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className="card-title">🧧 You received a red packet!</h1>
                                            <progress className="progress progress-primary w-full progress-lg h-6 mt-3" value={`${currentBalance as bigint}`} max={`${totalBalance as bigint}`}></progress>
                                            <div className="text-xs">{`${formatEtherDisplay(currentBalance as bigint)} / ${formatEtherDisplay(totalBalance as bigint)} ETH left to claim by ${userDisplay(remainingClaimCount as bigint)}.`}</div>
                                            <div className="card-actions justify-end mt-6">
                                                <button onClick={handleClaim} className="btn btn-primary btn-block btn-lg">Claim</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="text-center mt-3">
                                <a href={`https://basescan.org/address/${contractAddress}`} target="_blank" className="btn btn-link text-base-300 btn-xs">
                                    View Contract
                                </a>
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
}
  