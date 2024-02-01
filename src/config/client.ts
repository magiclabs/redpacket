import { clientEnv } from 'env/client'
import { createPublicClient, createWalletClient, http } from 'viem'
import {
  base,
  baseSepolia,
  mainnet as ethereum,
  goerli,
  polygonMumbai as mumbai,
  polygon,
} from 'viem/chains'

export const magicApiKey = clientEnv.NEXT_PUBLIC_MAGIC_API_KEY!
export const gasManagerPolicyId =
  clientEnv.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID_BASE!

export const CHAINS = {
  polygon: {
    chain: polygon,
    transport: http(),
    scanURL: 'https://polygonscan.com',
    getTxURL: (hash: string) => `https://polygonscan.com/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://polygonscan.com/address/${address}`,
  },
  mumbai: {
    chain: mumbai,
    transport: http(),
    scanURL: 'https://mumbai.polygonscan.com',
    getTxURL: (hash: string) => `https://mumbai.polygonscan.com/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://mumbai.polygonscan.com/address/${address}`,
  },
  ethereum: {
    chain: ethereum,
    transport: http(),
    scanURL: 'https://etherscan.io',
    getTxURL: (hash: string) => `https://etherscan.io/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://etherscan.io/address/${address}`,
  },
  goerli: {
    chain: goerli,
    transport: http(),
    scanURL: 'https://goerli.etherscan.io',
    getTxURL: (hash: string) => `https://goerli.etherscan.io/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://goerli.etherscan.io/address/${address}`,
  },
  base: {
    chain: base,
    transport: http(),
    scanURL: `https://basescan.org`,
    getTxURL: (hash: string) => `https://basescan.org/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://basescan.org/address/${address}`,
  },
  baseSepolia: {
    chain: baseSepolia,
    transport: http(),
    scanURL: `https://sepolia.basescan.org`,
    getTxURL: (hash: string) => `https://sepolia.basescan.org/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://sepolia.basescan.org/address/${address}`,
  },
} as const

export type NETWORK = keyof typeof CHAINS

export const getWalletClient = (network: NETWORK = 'ethereum') =>
  createWalletClient(CHAINS[network])

export const getPublicClient = (network: NETWORK = 'ethereum') =>
  createPublicClient(CHAINS[network])

export { ethereum, goerli, mumbai, polygon }
