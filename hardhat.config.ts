import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

require('@openzeppelin/hardhat-upgrades');
require("./tasks/deploy");

const config: HardhatUserConfig = {
  solidity: "0.8.20",
};

export default config;
