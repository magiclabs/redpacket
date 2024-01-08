"use client";

import { useWalletContext } from "@/context/wallet";
import { useRedPacket } from "@/hooks/useRedPacket";
import { useCallback, useState } from "react";
import { Hash, encodeFunctionData, formatEther } from "viem";
import RedPacketABI from "@/contracts/RedPacket.json";

type HeroProps = {
  contractAddress: string;
};

export default function Hero({ contractAddress }: HeroProps) {
  const { isLoggedIn, provider } = useWalletContext();
  const { packetCount, balance, grabberCount, grabberList, handleGrab, grabStatus } = useRedPacket({ contractAddress, provider });
  console.log(grabberList);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="">
        Total Balance Left: {formatEther(balance ?? BigInt(0))} ETH
        {(packetCount !== undefined && grabberCount !== undefined) && (
          <div>
            Grabs Remaining: {`${packetCount - grabberCount}`}
          </div>
        )}
      </div>
      <div className="">
        <button
          disabled={!isLoggedIn || grabStatus !== "Grab"}
          onClick={handleGrab}
          className="btn btn-primary btn-wide btn-lg"
        >
          {grabStatus}
          {(grabStatus === "Requesting" || grabStatus === "Grabbing") && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </button>
      </div>
    </div>
  );
}
