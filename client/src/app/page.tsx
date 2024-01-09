import PacketClosed from "@/components/Packet";
import { WalletContextProvider } from "@/context/wallet";

export default function Home() {
  return (
    <WalletContextProvider>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-md"></div>
        </div>
      </div>
    </WalletContextProvider>
  );
}
