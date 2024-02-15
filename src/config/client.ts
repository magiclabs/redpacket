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
      `0x93dB1aC99E35fB45b50cb41f26E4e62a7Ba56F3c`,
  },
  mumbai: {
    chain: mumbai,
    transport: http(ALCHEMY_RPC_URL['mumbai']),
    scanURL: `https://mumbai.polygonscan.com`,
    getTxURL: (hash: string) => `https://mumbai.polygonscan.com/tx/${hash}`,
    getAccountURL: (address: string) =>
      `https://mumbai.polygonscan.com/address/${address}`,
    getRedPacketFactoryAddress: (): Address =>
      '0xC0C7eb48fef4AEf0e196Ed7b7B3afaB65dca20dC',
  },
} as const

export type NETWORK = keyof typeof CHAINS

export const getWalletClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createWalletClient(CHAINS[network])

export const getPublicClient = (network: NETWORK = CURRENT_CHAIN_KEY) =>
  createPublicClient(CHAINS[network])

export { ethereum, goerli, mumbai, polygon }
