import { useEffect, useState } from 'react';
import { getContract, Hash, encodeFunctionData } from 'viem';
import RedPacketABI from "@/contracts/RedPacket.json";
import { useWalletContext } from "@/context/wallet";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address } from "@alchemy/aa-core";
import { set } from 'zod';

type useRedPacketProps = {
  contractAddress: Address;
};

export function useRedPacket({ contractAddress }: useRedPacketProps) {
    const { provider, scaAddress } = useWalletContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [isClaiming, setIsClaiming] = useState<boolean>(false);
    const [expired, setExpired] = useState<boolean>(false);
    const [totalClaimCount, setTotalClaimCount] = useState<bigint>();
    const [claimedCount, setClaimedCount] = useState<bigint>();
    const [currentBalance, setCurrentBalance] = useState<bigint>();
    const [totalBalance, setTotalBalance] = useState<bigint>();
    const [claimedList, setClaimedList] = useState<Array<{ address: string; amount: bigint }>>([]);
    const [claimedAmount, setClaimedAmount] = useState<bigint>(BigInt(0));
    const [claimTxnHash, setClaimTxnHash] = useState<Hash>();
    const [isCreator, setIsCreator] = useState<boolean>(false);

    useEffect(() => {
        fetchContractData();
    }, [contractAddress, scaAddress, provider]);

    async function fetchContractData() {
        if (contractAddress && scaAddress && provider) {
            const contractInstance = getContract({
                address: `0x${contractAddress}`,
                abi: RedPacketABI,
                publicClient: provider.rpcClient
            });
            const _totalClaimCount = await contractInstance.read.totalClaimCount();
            setTotalClaimCount(_totalClaimCount as bigint);
            const _currentBalance = await contractInstance.read.getCurrentBalance();
            setCurrentBalance(_currentBalance as bigint);
            const _claimedCount = await contractInstance.read.getClaimedCount();
            setClaimedCount(_claimedCount as bigint);
            const _totalBalance = await contractInstance.read.totalBalance();
            setTotalBalance(_totalBalance as bigint);
            const _expired = await contractInstance.read.expired();
            setExpired(_expired as boolean);
            const _creator = await contractInstance.read.creator();
            if (scaAddress === _creator) {
                setIsCreator(true);
            } else {
                setIsCreator(false);
            }
            if (_claimedCount as bigint > 0) {
                const _claimedAddresses = await contractInstance.read.getClaimedAddresses() as string[];
                const _claimedList: Array<{ address: string; amount: bigint }> = [];
                for (const address of _claimedAddresses) {
                    const _claimedAmount = await contractInstance.read.claimedAmounts([address]);
                    _claimedList.push({
                        address,
                        amount: _claimedAmount as bigint,
                    });
                }
                const _claimedAmount = _claimedList.find(item => item.address === scaAddress)?.amount;
                if (_claimedAmount) {
                    setClaimedAmount(_claimedAmount);
                } else {
                    setClaimedAmount(BigInt(0));
                }
                setClaimedList(_claimedList);
            }
            setLoading(false);
        }
    };

    async function handleClaim() {
        if (!provider) {
            throw new Error("Provider not initialized");
        }
        setIsClaiming(true);
        const uoHash = await provider.sendUserOperation({
            target: `0x${contractAddress}`,
            data: encodeFunctionData({
                abi: RedPacketABI,
                functionName: "claim"
            }),
        });
        let txnHash: Hash;
        try {
            txnHash = await provider.waitForUserOperationTransaction(uoHash.hash);
            setClaimTxnHash(txnHash);
            fetchContractData();
        } catch (e) {
            setTimeout(() => {
                setIsClaiming(false);
            }, 5000);
            return;
        }
    }
    
    return { 
        loading,
        isClaiming,
        expired,
        totalClaimCount, 
        currentBalance,
        totalBalance,
        claimedCount,
        claimedList,
        claimedAmount,
        claimTxnHash,
        isCreator,
        handleClaim
    };
}