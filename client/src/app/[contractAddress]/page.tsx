"use client";

import { usePathname } from 'next/navigation';
import Root from "@/components/Root";
import Navbar from "@/components/Navbar";
import Packet from "@/components/Packet";
import { WalletContextProvider } from "@/context/wallet";
import { Address } from "@alchemy/aa-core";

export default function Claim() {
  const contractAddress = usePathname()?.replace('/', '').replace('0x', '');

  return (
    <WalletContextProvider>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-md">
            <Packet contractAddress={contractAddress as Address} />
          </div>
        </div>
      </div>
      {/* <Root contractAddress={contractAddress as string} /> */}
    </WalletContextProvider>
  );
}
