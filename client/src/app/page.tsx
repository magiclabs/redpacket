import PacketClosed from "@/components/PacketClosed";
import { WalletContextProvider } from "@/context/wallet";

export default function Home() {
  return (
    <WalletContextProvider>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-md">
            <PacketClosed contractAddress="123" />
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}
