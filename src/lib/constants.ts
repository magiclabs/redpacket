import RedPacket from 'contracts/RedPacket.sol/RedPacket.json'
import RedPacketFactory from 'contracts/RedPacketFactory.sol/RedPacketFactory.json'
import { isProd } from 'utils/isProd'
import { base, polygonMumbai } from 'viem/chains'

export const REDPACKET_FACTORY_ABI = RedPacketFactory.abi
export const REDPACKET_ABI = RedPacket.abi

export const ANIMATION_INTERVAL = 0.5

export const ALCHEMY_GASMANAGER_POLICY_ID = {
  base: process.env.ALCHEMY_GAS_POLICY_ID_BASE!,
  mumbai: process.env.ALCHEMY_GAS_POLICY_ID_MUMBAI!,
} as const

const ALCHEMY_RPC_BASE_MAINNET = process.env.ALCHEMY_RPC_BASE_MAINNET
const ALCHEMY_RPC_POLYGON_TESTNET = process.env.ALCHEMY_RPC_POLYGON_TESTNET

export const ALCHEMY_RPC_URL = {
  base: ALCHEMY_RPC_BASE_MAINNET,
  mumbai: ALCHEMY_RPC_POLYGON_TESTNET,
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
