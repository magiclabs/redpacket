import {
  ALCHEMY_RPC_URL,
  CURRENT_CHAIN,
  CURRENT_CHAIN_KEY,
} from 'lib/constants'
import { createPublicClient, http } from 'viem'

export const publicClient = createPublicClient({
  chain: CURRENT_CHAIN,
  transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY]),
})
