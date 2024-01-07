import { task } from "hardhat/config";
import { formatEther, parseEther } from "viem";

// npx hardhat deploy --count 3 --balance 10 --network localhost
task("deploy", "Deploy a RedPacket contract with custom parameters")
  .addParam("count", "The total number of users who can claim the packet")
  .addParam("balance", "The total amount of ETH in the packet")
  .setAction(async (taskArgs, hre) => {
    const count = taskArgs.count;
    const balance = parseEther(taskArgs.balance.toString());
    
    const packet = await hre.viem.deployContract("RedPacket", [count], {
        value: balance,
    });

    console.log(
        `RedPacket with ${formatEther(balance)} ETH and ${count} users deployed to ${packet.address}`
    );
  });