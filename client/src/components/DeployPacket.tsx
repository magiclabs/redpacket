"use client";

import Image from "next/image";
import { useWalletContext } from "@/context/wallet";
import RedPacketContract from "@/contracts/RedPacket.json";
import RedPacketFactoryContract from "@/contracts/RedPacketFactory.json";
import { Address } from "@alchemy/aa-core";
import { parseEther, encodeDeployData, Hash, getContractAddress, encodeFunctionData, fromHex, decodeEventLog, parseAbiItem } from "viem";
import { clientEnv } from "@/env/client.mjs";

export default function DeployPacket() {
    const { isLoggedIn, login, logout, username, scaAddress, userBalance, provider, walletClient, publicClient } = useWalletContext();
  
    async function handleCreateRedPacket() {
        if (!provider) {
            throw new Error("Provider not initialized");
        }
        console.log(scaAddress);
        const unwatch = publicClient.watchEvent({ 
            address: clientEnv.NEXT_PUBLIC_REDPACKET_CONTRACT_FACTORY_ADDRESS as Address, 
            event: parseAbiItem('event RedPacketCreated(address redPacketAddress, address indexed creator, uint256 totalClaimCount, uint256 totalBalance)'),
            args: { 
                creator: scaAddress as Address,
            },
            onLogs: (logs) => {
                const topics = decodeEventLog({
                    abi: RedPacketFactoryContract.abi,
                    data: logs[0].data,
                    topics: logs[0].topics
                })
                console.log(logs);
                console.log(topics);
            }
        });
        //setIsClaiming(true);
        const uoHash = await provider.sendUserOperation({
            target: clientEnv.NEXT_PUBLIC_REDPACKET_CONTRACT_FACTORY_ADDRESS as Address,
            data: encodeFunctionData({
                abi: RedPacketFactoryContract.abi,
                functionName: "createRedPacket",
                args: [BigInt(3)],
            }),
            value: parseEther('0.001'),
        });
        console.log(uoHash);
        let txnHash: Hash;
        try {
            txnHash = await provider.waitForUserOperationTransaction(uoHash.hash);
            console.log(txnHash);
            const receipt = await provider.getUserOperationByHash(uoHash.hash);
            console.log(receipt);

            //setClaimTxnHash(txnHash);
            //fetchContractData();
        } catch (e) {
            setTimeout(() => {
            //setIsClaiming(false);
            }, 5000);
            return;
        }
    }

    async function handleDeploy() {
        /*const txnHash = await walletClient.deployContract({
            abi: RedPacketContract.abi,
            account: scaAddress as Address,
            args: [BigInt(3)],
            value: parseEther('0.001'),
            bytecode: RedPacketContract.bytecode as `0x${string}`,
            chain: provider.rpcClient.chain
        })
        console.log(txnHash);*/
        const deployData = encodeDeployData({
            abi: RedPacketContract.abi,
            bytecode: RedPacketContract.bytecode as `0x${string}`,
            args: [BigInt(3)],
        });
        const uoHash = await provider.sendUserOperation({
            target: '0x0000000000000000000000000000000000000000' as Address,
            data: deployData,
            value: parseEther('0.001'),
        });
        console.log(uoHash);
        const contractAddress = getContractAddress({ 
            from: scaAddress as Address,
            nonce: fromHex(uoHash.request.nonce, 'bigint')
        });
        console.log('Contract address: ', contractAddress);
        let txnHash: Hash;
        try {
            txnHash = await provider.waitForUserOperationTransaction(uoHash.hash);
            console.log(txnHash);
        } catch (e) {
            return;
        }
    }

    return (
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
                <button onClick={handleCreateRedPacket} className="btn btn-primary btn-lg mt-3">
                  Create Red Packet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  