import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const packetCount = 3n;
  const balance = parseEther("10");
  
  const packet = await hre.viem.deployContract("RedPacket", [packetCount], {
      value: balance,
  });

  console.log(
    `RedPacket with ${formatEther(balance)} ETH and ${packetCount} users deployed to ${packet.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
