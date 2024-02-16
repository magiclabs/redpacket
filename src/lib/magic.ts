import { ALCHEMY_RPC_URL, CURRENT_CHAIN_KEY } from 'lib/constants'
import { Magic } from 'magic-sdk'
import { isServer } from 'utils/isServer'
import { base, polygonMumbai } from 'viem/chains'

export let magic: Magic

export const MAGIC_API_KEY = `pk_live_C8937F8712BF7A96`

export const NETWORK = {
  base: {
    rpcUrl: ALCHEMY_RPC_URL['base'],
    chainId: base.id,
  },
  mumbai: {
    rpcUrl: ALCHEMY_RPC_URL['mumbai'],
    chainId: polygonMumbai.id,
  },
} as const

if (!isServer()) {
  if (!MAGIC_API_KEY) throw new Error('MAGIC_API_KEY is not defined')
  magic = new Magic(MAGIC_API_KEY, {
    network: NETWORK[CURRENT_CHAIN_KEY],
  })
}
