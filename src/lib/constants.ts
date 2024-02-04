import RedPacket from 'contracts/RedPacket.json'
import RedPacketFactory from 'contracts/RedPacketFactory.json'
import { isProd } from 'utils/isProd'
import { base, baseSepolia, polygonMumbai } from 'viem/chains'

export const REDPACKET_FACTORY_ABI = RedPacketFactory.abi
export const REDPACKET_ABI = RedPacket.abi

export const ANIMATION_INTERVAL = 0.5

export const ALCHEMY_GASMANAGER_POLICY_ID = `79f1a5ce-71ac-46ec-b026-2e17b7015656`

export const ALCHEMY_RPC_URL = {
  base: `https://base-mainnet.g.alchemy.com/v2/mgAiAkPBUrNakqSTikVs4IYvve4AVh07`,
  baseSepolia: `https://base-sepolia.g.alchemy.com/v2/8i288JRIGXoG0UUJWfFwrucu0BRHbb1-`,
  mumbai: `https://polygon-mumbai.g.alchemy.com/v2/Sj_KlZV6R-XvaKewU9KTuSOvZXVNSL4j`,
} as const

export const CURRENT_CHAIN_KEY = isProd() ? 'base' : 'baseSepolia'

export const CURRENT_CHAIN = (
  {
    base: base,
    baseSepolia: baseSepolia,
    mumbai: polygonMumbai,
  } as const
)[CURRENT_CHAIN_KEY]
