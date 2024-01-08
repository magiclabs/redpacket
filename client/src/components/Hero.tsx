"use client";
import { AlchemyTokenAbi, tokenContractAddress } from "@/config/token-contract";
import { useWalletContext } from "@/context/wallet";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Hash, encodeFunctionData } from "viem";
import RedPacketABI from "@/contracts/RedPacket.json";

type GrabStatus =
  | "Grab"
  | "Requesting"
  | "Grabbing"
  | "Received"
  | "Error Grabbing";

export default function Hero({ contractAddress }: { contractAddress: string }) {
  const { isLoggedIn, provider } = useWalletContext();
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
      <Image
        src="/kit-logo.svg"
        alt="Account Kit Token"
        width={400}
        height={400}
        priority
      />
      <div className="flex flex-col items-start gap-[48px] max-md:items-center">
        <div className="flex flex-col flex-wrap gap-[12px]">
          <div className="flex flex-row max-md:justify-center">
            <a
              href="https://accountkit.alchemy.com"
              target="_blank"
              className="btn bg-black dark:bg-white text-white dark:text-black transition ease-in-out duration-500 transform hover:scale-110 hover:bg-black hover:dark:bg-white"
            >
              <Image
                src="/kit-logo.svg"
                alt="Account Kit Logo"
                width={28}
                height={28}
                priority
              />
              <div className="text-md">Powered By Account Kit</div>
            </a>
          </div>
          <div className="text-5xl font-bold">Account Kit Token</div>
        </div>
        <div className="text-2xl">
          Mint a FREE ERC-20 token with no gas fees!
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
