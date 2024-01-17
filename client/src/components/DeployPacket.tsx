"use client";

import Image from "next/image";
import { useWalletContext } from "@/context/wallet";
import RedPacketFactoryContract from "@/contracts/RedPacketFactory.json";
import { Address } from "@alchemy/aa-core";
import {
  parseEther,
  Hash,
  encodeFunctionData,
  decodeEventLog,
  parseAbiItem,
} from "viem";
import { clientEnv } from "@/env/client.mjs";
import Login from "@/components/Login";
import Footer from "@/components/Footer";

export default function DeployPacket() {
  const { isLoggedIn, scaAddress, provider, publicClient } = useWalletContext();

  async function handleCreateRedPacket() {
    if (!provider) {
      throw new Error("Provider not initialized");
    }
    publicClient.watchEvent({
      address:
        clientEnv.NEXT_PUBLIC_REDPACKET_CONTRACT_FACTORY_ADDRESS as Address,
      event: parseAbiItem(
        "event RedPacketCreated(address redPacketAddress, address indexed creator, uint256 totalClaimCount, uint256 totalBalance)",
      ),
      args: {
        creator: scaAddress as Address,
      },
      onLogs: (logs) => {
        const topics = decodeEventLog({
          abi: RedPacketFactoryContract.abi,
          data: logs[0].data,
          topics: logs[0].topics,
        });
        console.log(logs);
        console.log(topics);
      },
    });
    //setIsClaiming(true);
    const uoHash = await provider.sendUserOperation({
      target:
        clientEnv.NEXT_PUBLIC_REDPACKET_CONTRACT_FACTORY_ADDRESS as Address,
      data: encodeFunctionData({
        abi: RedPacketFactoryContract.abi,
        functionName: "createRedPacket",
        args: [BigInt(3)],
      }),
      value: parseEther("0.001"),
    });
    console.log(uoHash);
    let txnHash: Hash;
    try {
      txnHash = await provider.waitForUserOperationTransaction(uoHash.hash);
      console.log(txnHash);

      //setClaimTxnHash(txnHash);
      //fetchContractData();
    } catch (e) {
      setTimeout(() => {
        //setIsClaiming(false);
      }, 5000);
      return;
    }
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
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
          {isLoggedIn ? (
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">How many packets?</span>
                </div>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="3"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">How much ETH to deposit?</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="0.05"
                />
              </label>
              <button
                onClick={handleCreateRedPacket}
                className="btn btn-primary btn-lg mt-3 btn-block"
              >
                Create Red Packet
              </button>
            </div>
          ) : (
            <div>
              <div className="text-md mb-6">
                You need to be logged in to create a red packet.
              </div>
              <Login />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
