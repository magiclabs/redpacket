import DeployPacket from "@/components/DeployPacket";
import { WalletContextProvider } from "@/context/wallet";

export default function Home() {
  return (
    <WalletContextProvider>
      <DeployPacket />
    </WalletContextProvider>
  );
}
