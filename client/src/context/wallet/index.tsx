"use client";

import { useAlchemyProvider } from "@/hooks/useAlchemyProvider";
import { createMagicSigner } from "@/signer/createMagicSigner";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address } from "@alchemy/aa-core";
import { MagicSigner } from "@alchemy/aa-signers/magic";
import { Wallet } from "ethers";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPublicClient, createWalletClient, custom, WalletClient, PublicClient } from 'viem';

type WalletContextProps = {
  // Functions
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;

  // Properties
  provider: AlchemyProvider;
  ownerAddress?: Address;
  scaAddress?: Address;
  username?: string;
  isLoggedIn: boolean;
  userBalance: bigint;
  walletClient: WalletClient;
  publicClient: PublicClient;
};

const defaultUnset: any = null;
const WalletContext = createContext<WalletContextProps>({
  // Default Values
  provider: defaultUnset,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isLoggedIn: defaultUnset,
  userBalance: BigInt(0),
  walletClient: defaultUnset,
  publicClient: defaultUnset,
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ownerAddress, setOwnerAddress] = useState<Address>();
  const [scaAddress, setScaAddress] = useState<Address>();
  const [username, setUsername] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userBalance, setUserBalance] = useState<bigint>(BigInt(0));
  const [walletClient, setWalletClient] = useState<WalletClient>(defaultUnset);
  const [publicClient, setPublicClient] = useState<PublicClient>(defaultUnset);

  const [magicSigner] = useState<Promise<MagicSigner | null>>(() =>
    createMagicSigner(),
  );
  const { provider, connectProviderToAccount, disconnectProviderFromAccount } =
    useAlchemyProvider();

  const login = useCallback(
    async (email: string) => {
      const signer = await magicSigner;

      if (signer == null) {
        throw new Error("Magic not initialized");
      }

      await signer.authenticate({
        authenticate: async () => {
          await signer.inner.auth.loginWithEmailOTP({
            email,
          });
        },
      });

      const metadata = await signer.getAuthDetails();
      if (!metadata.publicAddress || !metadata.email) {
        throw new Error("Magic login failed");
      }

      setIsLoggedIn(true);
      connectProviderToAccount(signer);
      setUsername(metadata.email);
      setOwnerAddress(metadata.publicAddress as Address);
      setScaAddress(await provider.getAddress());
    },
    [connectProviderToAccount, magicSigner, provider],
  );

  const logout = useCallback(async () => {
    const signer = await magicSigner;

    if (!signer) {
      throw new Error("Magic not initialized");
    }

    if (!(await signer.inner.user.logout())) {
      throw new Error("Magic logout failed");
    }

    setIsLoggedIn(false);
    disconnectProviderFromAccount();
    setUsername(undefined);
    setOwnerAddress(undefined);
    setScaAddress(undefined);
  }, [magicSigner, disconnectProviderFromAccount]);

  useEffect(() => {
    async function fetchData() {
      const signer = await magicSigner;

      if (signer == null) {
        throw new Error("Magic not initialized");
      }

      const isLoggedIn = await signer.inner.user.isLoggedIn();

      if (!isLoggedIn) {
        return;
      }

      await signer.authenticate({
        authenticate: async () => {},
      });

      const metadata = await signer.getAuthDetails();
      if (!metadata.publicAddress || !metadata.email) {
        throw new Error("Magic login failed");
      }

      if (scaAddress) {
        const _userBalance = await provider.rpcClient.getBalance({
          address: scaAddress as Address,
        });
        setUserBalance(_userBalance);
      }

      setIsLoggedIn(isLoggedIn);
      connectProviderToAccount(signer);
      setUsername(metadata.email);
      setOwnerAddress(metadata.publicAddress as Address);
      setScaAddress(await provider.getAddress());

      if (provider) {
        const _walletClient = createWalletClient({
          chain: provider.rpcClient.chain,
          transport: custom(provider.rpcClient.transport),
        });
        setWalletClient(_walletClient);
        const _publicClient = createPublicClient({
          chain: provider.rpcClient.chain,
          transport: custom(provider.rpcClient.transport),
        });
        setPublicClient(_publicClient);
      }
    }
    fetchData();
  }, [connectProviderToAccount, magicSigner, provider, scaAddress]);

  return (
    <WalletContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        provider,
        ownerAddress,
        scaAddress,
        username,
        userBalance,
        walletClient,
        publicClient,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
