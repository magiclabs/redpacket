"use client";

import { useWalletContext } from "@/context/wallet";
import { useRedPacket } from "@/hooks/useRedPacket";
import { formatEther } from "viem";

const rounding = require('significant-rounding');

type PacketClosedProps = {
    contractAddress: string;
};

export default function PacketClosed({ contractAddress }: PacketClosedProps) {
    const { isLoggedIn, provider } = useWalletContext();
    const { packetCount, balance, totalBalance, grabberCount, grabberList, handleGrab, grabStatus } = useRedPacket({ contractAddress, provider });

    function formatEtherDisplay(ether: bigint) {
        return `${rounding(Number(formatEther(ether ?? BigInt(0))), 3)}`;
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="/red-packet.png" alt="Red Packet" /></figure>
            <div className="card-body">
                <h1 className="card-title">🧧 You received a Red Packet!</h1>
                <progress className="progress progress-primary w-full progress-lg h-6 mt-3" value={`${balance as bigint}`} max={`${totalBalance as bigint}`}></progress>
                <div className="text-sm">{`${formatEtherDisplay(balance as bigint)} / ${formatEtherDisplay(totalBalance as bigint)} ETH left to claim.`}</div>
                <div className="card-actions justify-end mt-6">
                    <button className="btn btn-primary btn-block btn-lg">Open</button>
                </div>
            </div>
        </div>
    );
}
  