import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

require('@openzeppelin/hardhat-upgrades');
require("./tasks/deploy");

const ALCHEMY_API_KEY_BASE = vars.get("ALCHEMY_API_KEY_BASE");
const PRIVATE_KEY_BASE = vars.get("PRIVATE_KEY_BASE");

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_BASE}`,
      accounts: [PRIVATE_KEY_BASE]
    }
  }
};

export default config;
