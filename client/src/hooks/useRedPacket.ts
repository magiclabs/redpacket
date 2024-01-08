import { useEffect, useState } from 'react';
import { getContract, Hash, encodeFunctionData } from 'viem';
import RedPacketABI from "@/contracts/RedPacket.json";
import { AlchemyProvider } from "@alchemy/aa-alchemy";

type useRedPacketProps = {
  contractAddress: string;
  provider: AlchemyProvider;
};

export function useRedPacket({ contractAddress, provider }: useRedPacketProps) {
    const [packetCount, setPacketCount] = useState<bigint>();
    const [grabberCount, setGrabberCount] = useState<bigint>();
    const [balance, setBalance] = useState<bigint>();
    const [grabberList, setGrabberList] = useState<Array<{ address: string; amount: bigint }>>([]);
    //const [contractInstance, setContractInstance] = useState<any>();
    const [grabStatus, setGrabStatus] = useState<string>('Grab');

    useEffect(() => {
        fetchContractData();
    }, [contractAddress, provider]);

    async function fetchContractData() {
        if (contractAddress && provider) {
            const contractInstance = getContract({
                address: `0x${contractAddress}`,
                abi: RedPacketABI,
                publicClient: provider.rpcClient
            });
            //setContractInstance(_contractInstance);
            const _packetCount = await contractInstance.read.packetCount();
            setPacketCount(_packetCount as bigint);
            const _balance = await contractInstance.read.getBalance();
            setBalance(_balance as bigint);
            const _grabberCount = await contractInstance.read.getGrabberCount();
            setGrabberCount(_grabberCount as bigint);
            if (_grabberCount as bigint > 0) {
                const _grabberAddresses = await contractInstance.read.getGrabbers();
                const _grabberList: Array<{ address: string; amount: bigint }> = [];
                for (const address of _grabberAddresses as string[]) {
                    const _grabbedAmount = await contractInstance.read.grabberAmounts([address]);
                    _grabberList.push({
                        address,
                        amount: _grabbedAmount as bigint,
                    });
                }
                setGrabberList(_grabberList);
            }
        }
    };

    async function handleGrab() {
        if (!provider) {
            throw new Error("Provider not initialized");
        }
        //setGrabTxHash(undefined);
        setGrabStatus("Requesting");
        const uoHash = await provider.sendUserOperation({
            target: `0x${contractAddress}`,
            data: encodeFunctionData({
                abi: RedPacketABI,
                functionName: "grab"
            }),
        });
        setGrabStatus("Grabbing");
        let txHash: Hash;
        try {
            txHash = await provider.waitForUserOperationTransaction(uoHash.hash);
            fetchContractData();
        } catch (e) {
            setGrabStatus("Error Grabbing");
            setTimeout(() => {
                setGrabStatus("Grab");
            }, 5000);
            return;
        }
        //setGrabTxHash(txHash);
        setGrabStatus("Received");
        setTimeout(() => {
            setGrabStatus("Grab");
        }, 5000);
    }
    
    return { 
        packetCount, 
        balance, 
        grabberCount, 
        grabberList,
        grabStatus,
        //contractInstance,
        handleGrab
    };
}