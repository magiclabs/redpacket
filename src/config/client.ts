import { ALCHEMY_RPC_URL, CURRENT_CHAIN_KEY } from 'lib/constants'
import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
} from 'viem'
import {
  base,
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
    getRedPacketFactoryAddress: (): Address =>
      `0x2fabdF4f1F97C2C21Ba63c4dDd71c63968B2d22b`,
  },
  mumbai: {
    chain: mumbai,
    transport: http(ALCHEMY_RPC_URL['mumbai']),
    scanURL: `https://mumbai.polygonscan.com`,
    getTxURL: (hash: string) => `https://mumbai.polygonscan.com/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://mumbai.polygonscan.com/address/${address}`,
    getRedPacketFactoryAddress: (): Address =>
      `0x4F0bc48d58aa0134CfFc37aa8f6A7B6aa7F7d4bc`,
  },
} as const

export type NETWORK = keyof typeof CHAINS

export const getWalletClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createWalletClient(CHAINS[network])

export const getPublicClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createPublicClient(CHAINS[network])

export { ethereum, goerli, mumbai, polygon }
