import { clientEnv } from 'env/client'
import { CURRENT_CHAIN } from 'lib/web3modal/config'
import { Magic, type EthNetworkConfiguration } from 'magic-sdk'
import { isServer } from 'utils/isServer'
import { base, baseSepolia } from 'viem/chains'

export let magic: Magic

const MAGIC_API_KEY = clientEnv.NEXT_PUBLIC_MAGIC_API_KEY

const NETWORK: {
  [network: string]: EthNetworkConfiguration
} = {
  base: {
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/mgAiAkPBUrNakqSTikVs4IYvve4AVh07`,
    chainId: base.id,
  },
  baseSepolia: {
    rpcUrl: `https://base-sepolia.g.alchemy.com/v2/nbir66s6vPoL5xBuuZfXg5ZIyzN1958V`,
    chainId: baseSepolia.id,
  },
} as const

if (!isServer()) {
  if (!MAGIC_API_KEY) throw new Error('MAGIC_API_KEY is not defined')
  magic = new Magic(MAGIC_API_KEY, {
    network: NETWORK[CURRENT_CHAIN],
  })
}
