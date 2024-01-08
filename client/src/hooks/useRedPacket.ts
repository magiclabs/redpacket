import { useEffect, useState } from 'react';
import { getContract } from 'viem';
import RedPacketABI from "@/contracts/RedPacket.json";
import { AlchemyProvider } from "@alchemy/aa-alchemy";

type useRedPacketProps = {
  contractAddress: string;
  provider: AlchemyProvider;
};

function useRedPacket({ contractAddress, provider }: useRedPacketProps) {
    const [packetCount, setPacketCount] = useState<bigint>();
    const [grabberCount, setGrabberCount] = useState<bigint>();
    const [balance, setBalance] = useState<bigint>();

    useEffect(() => {
        if (contractAddress && provider) {
            const contractInstance = getContract({
                address: `0x${contractAddress}`,
                abi: RedPacketABI,
                publicClient: provider.rpcClient
            });
            const fetchContractData = async () => {
                const _packetCount = await contractInstance.read.packetCount();
                setPacketCount(_packetCount as bigint);
                const _balance = await contractInstance.read.getBalance();
                setBalance(_balance as bigint);
                const _grabberCount = await contractInstance.read.getGrabberCount();
                setGrabberCount(_grabberCount as bigint);
            };
            fetchContractData();
        }
    }, [contractAddress, provider]);

    return { packetCount, balance, grabberCount };
}

export default useRedPacket;