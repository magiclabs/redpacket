import { clientEnv } from 'env/client'
import { CURRENT_CHAIN } from 'lib/web3modal/config'
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
} as const

export type NETWORK = keyof typeof CHAINS

export const getWalletClient = (network: NETWORK = CURRENT_CHAIN) =>
  createWalletClient(CHAINS[network])

export const getPublicClient = (network: NETWORK = CURRENT_CHAIN) =>
  createPublicClient(CHAINS[network])

export { ethereum, goerli, mumbai, polygon }
