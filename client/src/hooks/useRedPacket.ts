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
    const { isLoggedIn, provider, scaAddress } = useWalletContext();
    const [totalClaimCount, setTotalClaimCount] = useState<bigint>();
    const [claimedCount, setClaimedCount] = useState<bigint>();
    const [currentBalance, setCurrentBalance] = useState<bigint>();
    const [totalBalance, setTotalBalance] = useState<bigint>();
    const [claimedList, setClaimedList] = useState<Array<{ address: string; amount: bigint }>>([]);
    //const [contractInstance, setContractInstance] = useState<any>();
    const [claimStatus, setClaimStatus] = useState<string>('Claim');
    const [hasClaimed, setHasClaimed] = useState<boolean>(false);
    const [isCreator, setIsCreator] = useState<boolean>(false);

    console.log(scaAddress);

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
            const _totalClaimCount = await contractInstance.read.totalClaimCount();
            setTotalClaimCount(_totalClaimCount as bigint);
            const _currentBalance = await contractInstance.read.getCurrentBalance();
            setCurrentBalance(_currentBalance as bigint);
            const _claimedCount = await contractInstance.read.getClaimedCount();
            setClaimedCount(_claimedCount as bigint);
            const _totalBalance = await contractInstance.read.totalBalance();
            setTotalBalance(_totalBalance as bigint);
            if (_claimedCount as bigint > 0) {
                const _claimedAddresses = await contractInstance.read.getClaimedAddresses();
                const _claimedList: Array<{ address: string; amount: bigint }> = [];
                for (const address of _claimedAddresses as string[]) {
                    const _claimedAmount = await contractInstance.read.claimedAmounts([address]);
                    _claimedList.push({
                        address,
                        amount: _claimedAmount as bigint,
                    });
                }
                setClaimedList(_claimedList);
            }
        }
    };

    async function handleClaim() {
        if (!provider) {
            throw new Error("Provider not initialized");
        }
        //setGrabTxHash(undefined);
        setClaimStatus("Requesting");
        const uoHash = await provider.sendUserOperation({
            target: `0x${contractAddress}`,
            data: encodeFunctionData({
                abi: RedPacketABI,
                functionName: "claim"
            }),
        });
        setClaimStatus("Claiming");
        let txHash: Hash;
        try {
            txHash = await provider.waitForUserOperationTransaction(uoHash.hash);
            fetchContractData();
        } catch (e) {
            setClaimStatus("Error Claiming");
            setTimeout(() => {
                setClaimStatus("Claim");
            }, 5000);
            return;
        }
        //setGrabTxHash(txHash);
        setClaimStatus("Received");
        setTimeout(() => {
            setClaimStatus("Claim");
        }, 5000);
    }
    
    return { 
        totalClaimCount, 
        currentBalance,
        totalBalance,
        claimedCount,
        claimedList,
        claimStatus,
        //contractInstance,
        handleClaim
    };
}