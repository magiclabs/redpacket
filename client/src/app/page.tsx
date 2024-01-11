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
                <h1 className="card-title mb-3">🧧 Create a red packet!</h1>
                <div className="text-sm">How many packets?</div>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="3"
                />
                <div className="text-sm">How much ETH to deposit?</div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="0.05"
                />
                <button className="btn btn-primary btn-lg mt-3">
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
