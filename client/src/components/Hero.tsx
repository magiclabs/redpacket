"use client";

import { useWalletContext } from "@/context/wallet";
import useRedPacket from "@/hooks/useRedPacket";
import { useCallback, useState } from "react";
import { Hash, encodeFunctionData, getContract, parseEther, formatEther } from "viem";
import RedPacketABI from "@/contracts/RedPacket.json";

type HeroProps = {
  contractAddress: string;
};

type GrabStatus =
  | "Grab"
  | "Requesting"
  | "Grabbing"
  | "Received"
  | "Error Grabbing";

export default function Hero({ contractAddress }: HeroProps) {
  const { isLoggedIn, provider } = useWalletContext();
  const { packetCount, balance, grabberCount } = useRedPacket({ contractAddress, provider });
  const [grabTxHash, setGrabTxHash] = useState<Hash>();
  const [grabStatus, setGrabStatus] = useState<GrabStatus>("Grab");

  const handleGrab = useCallback(async () => {
    if (!provider) {
      throw new Error("Provider not initialized");
    }
    setGrabTxHash(undefined);
    setGrabStatus("Requesting");
    const uoHash = await provider.sendUserOperation({
      target: `0x${contractAddress}`,
      data: encodeFunctionData({
        abi: RedPacketABI,
        functionName: "grab"
      }),
    });

    setGrabStatus("Grabbing");
    let txHash: Hash;
    try {
      txHash = await provider.waitForUserOperationTransaction(uoHash.hash);
    } catch (e) {
      setGrabStatus("Error Grabbing");
      setTimeout(() => {
        setGrabStatus("Grab");
      }, 5000);
      return;
    }

    setGrabTxHash(txHash);
    setGrabStatus("Received");
    setTimeout(() => {
      setGrabStatus("Grab");
    }, 5000);
  }, [provider, setGrabTxHash]);

  return (
    <div className="flex flex-row items-center gap-[64px] max-md:flex-col max-md:text-center">
      <div className="flex flex-col items-start gap-[48px] max-md:items-center">
        <div className="flex flex-col flex-wrap gap-[12px]">
          <div className="text-5xl font-bold">0x{contractAddress}</div>
        </div>
        <div className="text-2xl">
          Grab Some Red Packet!
          Total Balance Left: {formatEther(balance ?? BigInt(0))} ETH
          {(packetCount !== undefined && grabberCount !== undefined) && (
            <div>
              Grabs Remaining: {`${packetCount - grabberCount}`}
            </div>
          )}
        </div>
        <div className="flex flex-row flex-wrap gap-[12px]">
          <button
            disabled={!isLoggedIn || grabStatus !== "Grab"}
            onClick={handleGrab}
            className="btn text-white bg-gradient-1 disabled:opacity-25 disabled:text-white transition ease-in-out duration-500 transform hover:scale-110 max-md:w-full"
          >
            {grabStatus}
            {(grabStatus === "Requesting" || grabStatus === "Grabbing") && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
          {grabTxHash && (
            <a
              href={`https://basescan.org/address/${grabTxHash}`}
              className="btn text-white bg-gradient-2 disabled:opacity-25 disabled:text-white transition ease-in-out duration-500 transform hover:scale-110 max-md:w-full"
            >
              Your Txn Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
