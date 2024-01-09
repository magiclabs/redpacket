import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { getAddress, parseEther, formatEther } from "viem";
  
describe("RedPacket", function () {
    async function deployRedPacketFixture() {
        const [creator, user1, user2, user3] = await hre.viem.getWalletClients();

        const totalClaimCount = 3n;
        const balance = parseEther("10");
  
        const packet = await hre.viem.deployContract("RedPacket", [totalClaimCount], {
            value: balance,
        });
  
        const publicClient = await hre.viem.getPublicClient();
  
        return {
            packet,
            totalClaimCount,
            balance,
            creator,
            users: [user1, user2, user3],
            publicClient,
        };
    }

    describe("Deployment", function () {
        it("Should set the right total claim count", async function () {
            const { packet, totalClaimCount } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.totalClaimCount()).to.equal(totalClaimCount);
        });
        it("Should set the right current balance", async function () {
            const { packet, balance } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.getCurrentBalance()).to.equal(balance);
        });
        it("Should set the right total balance", async function () {
            const { packet, balance } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.totalBalance()).to.equal(balance);
        });
        it("Should set the right creator", async function () {
            const { packet, creator } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.creator()).to.equal(getAddress(creator.account.address));
        });
    });

    describe("Claim", function () {
        it("Should allow a single user to claim a red packet", async function () {
            const { packet, users, balance } = await loadFixture(deployRedPacketFixture);

            const packetAsUser1 = await hre.viem.getContractAt(
                "RedPacket",
                packet.address,
                { walletClient: users[1] }
            );
            await packetAsUser1.write.claim();

            const claimedAmount = await packet.read.claimedAmounts([getAddress(users[1].account.address)]);
            const currentBalance = await packet.read.getCurrentBalance();
            expect(claimedAmount + currentBalance).to.equal(balance);
        });
        it("Should allow all users to claim a red packet", async function () {
            const { packet, users, balance } = await loadFixture(deployRedPacketFixture);

            let totalClaimedAmount = 0n;
            for (const user of users) {
                const packetAsUser = await hre.viem.getContractAt(
                    "RedPacket",
                    packet.address,
                    { walletClient: user }
                );
                await packetAsUser.write.claim();
        
                const claimedAmount = await packet.read.claimedAmounts([getAddress(user.account.address)]);
                totalClaimedAmount += claimedAmount;
            }

            const remainingBalance = await packet.read.getCurrentBalance();
            const expired = await packet.read.expired();
            expect(totalClaimedAmount + remainingBalance).to.equal(balance);
            expect(expired).to.equal(true);
        });
        it("Should not allow the creator to claim a red packet", async function () {
            const { packet, creator } = await loadFixture(deployRedPacketFixture);
    
            await expect(packet.write.claim()).to.be.rejectedWith("Creator cannot claim a packet.");
        });
    });

    describe("Expire", function () {
        it("Should allow the creator to expire the red packet", async function () {
            const { packet } = await loadFixture(deployRedPacketFixture);
    
            await packet.write.expire();
    
            expect(await packet.read.expired()).to.equal(true);
        });  
        it("Should not allow a non-creator to expire the red packet", async function () {
            const { packet, users} = await loadFixture(deployRedPacketFixture);
            const packetAsUser1 = await hre.viem.getContractAt(
                "RedPacket",
                packet.address,
                { walletClient: users[1] }
            );
            await expect(packetAsUser1.write.expire()).to.be.rejectedWith("Only creator can expire a packet.");
        });
    });
})
