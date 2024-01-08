"use client";

import { usePathname } from 'next/navigation';
import Root from "@/components/Root";
import { WalletContextProvider } from "@/context/wallet";

export default function Grab() {
  const contractAddress = usePathname()?.replace('/', '').replace('0x', '');
  console.log(contractAddress);

  return (
    <WalletContextProvider>
      <Root contractAddress={contractAddress as string} />
    </WalletContextProvider>
  );
}
