import RedPacket from 'contracts/RedPacket.sol/RedPacket.json'
import RedPacketFactory from 'contracts/RedPacketFactory.sol/RedPacketFactory.json'
import { getBaseURL } from 'utils/getBaseURL'
import { isProd } from 'utils/isProd'
import { base, polygonMumbai } from 'viem/chains'

export const REDPACKET_FACTORY_ABI = RedPacketFactory.abi
export const REDPACKET_ABI = RedPacket.abi

export const ANIMATION_INTERVAL = 0.5

export const ALCHEMY_GASMANAGER_POLICY_ID = {
  base: `bb92abfa-d4cc-485b-904c-c7ae44305718`,
  mumbai: `30454200-84a8-4a1c-a162-397fc7e28c49`,
} as const

export const ALCHEMY_RPC_URL = {
  base: `${getBaseURL()}/rpc/base`,
  mumbai: `${getBaseURL()}/rpc/mumbai`,
} as const

export const CURRENT_CHAIN_KEY = isProd() ? 'base' : 'mumbai'

export const CURRENT_CHAIN = (
  {
    base: base,
    mumbai: polygonMumbai,
  } as const
)[CURRENT_CHAIN_KEY]

export const MAGIC_1ETH_CONTRACT_ADDRESS = isProd()
  ? 'Fd073A38892448fAac87588150dBe8Bf3C675A2C'
  : 'aEeeda52783563d07754FEfE716C3E42d379C093'
