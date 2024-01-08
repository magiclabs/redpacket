"use client";

import { usePathname } from 'next/navigation';
import Root from "@/components/Root";
import PacketClosed from "@/components/PacketClosed";
import { WalletContextProvider } from "@/context/wallet";

export default function Grab() {
  const contractAddress = usePathname()?.replace('/', '').replace('0x', '');

  return (
    <WalletContextProvider>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-md">
          <PacketClosed contractAddress={contractAddress as string} />
          </div>
        </div>
      </div>
      {/* <Root contractAddress={contractAddress as string} /> */}
    </WalletContextProvider>
  );
}
