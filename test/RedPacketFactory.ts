import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { getAddress, parseEther, formatEther } from "viem";
  
describe("RedPacketFactory", function () {
    async function deployRedPacketFactoryFixture() {
        const [creator, user1, user2, user3] = await hre.viem.getWalletClients();
  
        const factory = await hre.viem.deployContract("RedPacketFactory");
        
        const publicClient = await hre.viem.getPublicClient();
  
        return {
            factory,
            creator,
            users: [user1, user2, user3],
            publicClient,
        };
    }

    describe("Create Red Packet", function () {
        it("Should create red packet with correct parameters", async function () {
            const { factory } = await loadFixture(deployRedPacketFactoryFixture);
            const totalClaimCount = 3n;
            const balance = parseEther("10");
            await factory.write.createRedPacket([totalClaimCount], { value: balance });
            const deployedRedPackets = await factory.read.getDeployedRedPackets();
            const packet = await hre.viem.getContractAt("RedPacket", deployedRedPackets[0]);
            const packetTotalClaimCount = await packet.read.totalClaimCount();
            const packetBalance = await packet.read.totalBalance();
            expect(packetTotalClaimCount).to.equal(totalClaimCount);
            expect(packetBalance).to.equal(balance);

        });
    });
})
