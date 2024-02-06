import { ALCHEMY_RPC_URL, CURRENT_CHAIN_KEY } from 'lib/constants'
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

export const CHAINS = {
  base: {
    chain: base,
    transport: http(ALCHEMY_RPC_URL['base']),
    scanURL: `https://basescan.org`,
    getTxURL: (hash: string) => `https://basescan.org/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://basescan.org/address/${address}`,
    getRedPacketFactoryAddress: (): Address => `0x1`,
  },
  baseSepolia: {
    chain: baseSepolia,
    transport: http(ALCHEMY_RPC_URL['baseSepolia']),
    scanURL: `https://sepolia.basescan.org`,
    getTxURL: (hash: string) => `https://sepolia.basescan.org/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://sepolia.basescan.org/address/${address}`,
    getRedPacketFactoryAddress: (): Address =>
      `0x6eaeD20eb6566eA44Abbcd6642823A41A2dF119F`,
  },
  mumbai: {
    chain: mumbai,
    transport: http(ALCHEMY_RPC_URL['mumbai']),
    scanURL: `https://mumbai.polygonscan.com`,
    getTxURL: (hash: string) => `https://mumbai.polygonscan.com/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://mumbai.polygonscan.com/address/${address}`,
    getRedPacketFactoryAddress: (): Address =>
      `0xb93E4C4EC184F8660cD65936B49C8B83eeFaF9E4`,
  },
} as const

export type NETWORK = keyof typeof CHAINS

export const getWalletClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createWalletClient(CHAINS[network])

export const getPublicClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createPublicClient(CHAINS[network])

export { ethereum, goerli, mumbai, polygon }
