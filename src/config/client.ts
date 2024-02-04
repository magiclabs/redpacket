import { clientEnv } from 'env/client'
import { CURRENT_CHAIN_KEY } from 'lib/constants'
import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
} from 'viem'
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
  base: {
    chain: base,
    transport: http(),
    scanURL: `https://basescan.org`,
    getTxURL: (hash: string) => `https://basescan.org/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://basescan.org/address/${address}`,
    getRedPacketFactoryAddress: (): Address => `0x1`,
  },
  baseSepolia: {
    chain: baseSepolia,
    transport: http(),
    scanURL: `https://sepolia.basescan.org`,
    getTxURL: (hash: string) => `https://sepolia.basescan.org/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://sepolia.basescan.org/address/${address}`,
    getRedPacketFactoryAddress: (): Address =>
      `0x6eaeD20eb6566eA44Abbcd6642823A41A2dF119F`,
  },
  mumbai: {
    chain: mumbai,
    transport: http(),
    scanURL: `https://mumbai.polygonscan.com`,
    getTxURL: (hash: string) => `https://mumbai.polygonscan.com/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://mumbai.polygonscan.com/address/${address}`,
    getRedPacketFactoryAddress: (): Address =>
      `0xD00b1AcF6FC6b375e984C6B71B740Bb8e9b0a4CF`,
  },
} as const

export type NETWORK = keyof typeof CHAINS

export const getWalletClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createWalletClient(CHAINS[network])

export const getPublicClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createPublicClient(CHAINS[network])

export { ethereum, goerli, mumbai, polygon }
