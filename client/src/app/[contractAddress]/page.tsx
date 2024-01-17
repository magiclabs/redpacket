"use client";

import { usePathname } from "next/navigation";
import Packet from "@/components/Packet";
import { WalletContextProvider } from "@/context/wallet";
import { Address } from "@alchemy/aa-core";

export default function Claim() {
  const contractAddress = usePathname()?.replace("/", "").replace("0x", "");

  return (
    <WalletContextProvider>
      <Packet contractAddress={contractAddress as Address} />
    </WalletContextProvider>
  );
}
