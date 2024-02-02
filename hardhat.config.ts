import { type HardhatUserConfig } from 'hardhat/config'

import '@typechain/hardhat'

import '@nomicfoundation/hardhat-chai-matchers'
import '@nomicfoundation/hardhat-ethers'

import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-verify'

// require('@openzeppelin/hardhat-upgrades')
// require('./tasks/deploy')

// const ALCHEMY_API_KEY_BASE = vars.get('ALCHEMY_API_KEY_BASE')
// const PRIVATE_KEY_BASE = vars.get('PRIVATE_KEY_BASE')

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    base: {
      url: `https://base-mainnet.g.alchemy.com/v2/tbH7VdREUS9E1caIfz0FMCO_DfdJSNZS`,
    },
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/xtBmbqs4Xe17IVlF65vU6BmTEKLBybir`,
    },
  },
}

export default config
