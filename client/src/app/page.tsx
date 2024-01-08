import Root from "@/components/Root";
import { WalletContextProvider } from "@/context/wallet";

export default function Home() {
  return (
    <WalletContextProvider>
      <h1>TEST</h1>
    </WalletContextProvider>
  );
}
