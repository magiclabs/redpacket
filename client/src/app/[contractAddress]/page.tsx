"use client";

import { usePathname } from "next/navigation";
import Packet from "@/components/Packet";
import { WalletContextProvider } from "@/context/wallet";
import { Address } from "@alchemy/aa-core";

export default function Claim() {
  const contractAddress = usePathname()?.replace("/", "").replace("0x", "");

  return (
    <WalletContextProvider>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content">
          <div className="max-w-md">
            <Packet contractAddress={contractAddress as Address} />
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}
