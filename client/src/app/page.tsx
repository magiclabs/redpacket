import Packet from "@/components/Packet";
import { WalletContextProvider } from "@/context/wallet";
import Image from "next/image";

export default function Home() {
  return (
    <WalletContextProvider>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content">
          <div className="max-w-md">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <Image
                  src="/red-packet.png"
                  width={1424}
                  height={832}
                  alt="Red Packet"
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title mb-6">🧧 Create a red packet!</h1>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="How many packets?"
                />
                <input
                  type="number"
                  step="0.05"
                  className="input input-bordered w-full"
                  placeholder="ETH to deposit"
                />
                <button className="btn btn-primary join-item">
                  Create Red Packet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}
