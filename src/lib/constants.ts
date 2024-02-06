import RedPacket from 'contracts/RedPacket.sol/RedPacket.json'
import RedPacketFactory from 'contracts/RedPacketFactory.sol/RedPacketFactory.json'
import { isProd } from 'utils/isProd'
import { base, baseSepolia, polygonMumbai } from 'viem/chains'

export const REDPACKET_FACTORY_ABI = RedPacketFactory.abi
export const REDPACKET_ABI = RedPacket.abi

export const ANIMATION_INTERVAL = 0.5

export const ALCHEMY_GASMANAGER_POLICY_ID = {
  base: `345b7869-b269-4000-af0f-1a6c98f8a0a4`,
  mumbai: `652ddbb1-2159-4926-8ea4-1effaa2b7658`,
} as const

export const ALCHEMY_RPC_URL = {
  base: `https://base-mainnet.g.alchemy.com/v2/EzC7OYuylt0HecPRiyZX-HMNaYJiHy9j`,
  baseSepolia: `https://base-sepolia.g.alchemy.com/v2/8i288JRIGXoG0UUJWfFwrucu0BRHbb1-`,
  mumbai: `https://polygon-mumbai.g.alchemy.com/v2/Sj_KlZV6R-XvaKewU9KTuSOvZXVNSL4j`,
} as const

export const CURRENT_CHAIN_KEY = isProd() ? 'mumbai' : 'mumbai'

export const CURRENT_CHAIN = (
  {
    base: base,
    baseSepolia: baseSepolia,
    mumbai: polygonMumbai,
  } as const
)[CURRENT_CHAIN_KEY]
