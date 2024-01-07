import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { getAddress, parseEther, formatEther } from "viem";
  
describe("RedPacket", function () {
    async function deployRedPacketFixture() {
        const [creator, user1, user2, user3] = await hre.viem.getWalletClients();

        const packetCount = 3n;
        const balance = parseEther("10");
  
        const packet = await hre.viem.deployContract("RedPacket", [packetCount], {
            value: balance,
        });
  
        const publicClient = await hre.viem.getPublicClient();
  
        return {
            packet,
            packetCount,
            balance,
            creator,
            users: [user1, user2, user3],
            publicClient,
        };
    }

    describe("Deployment", function () {
        it("Should set the right packet count", async function () {
            const { packet, packetCount } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.packetCount()).to.equal(packetCount);
        });
        it("Should set the right balance", async function () {
            const { packet, balance } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.getBalance()).to.equal(balance);
        });
        it("Should set the right creator", async function () {
            const { packet, creator } = await loadFixture(deployRedPacketFixture);
            expect(await packet.read.creator()).to.equal(getAddress(creator.account.address));
        });
    });

    describe("Grab", function () {
        it("Should allow a single user to grab a red packet", async function () {
            const { packet, users, balance } = await loadFixture(deployRedPacketFixture);

            const packetAsUser1 = await hre.viem.getContractAt(
                "RedPacket",
                packet.address,
                { walletClient: users[1] }
            );
            await packetAsUser1.write.grab();

            const grabbedAmount = await packet.read.grabberAmounts([getAddress(users[1].account.address)]);
            const remainingBalance = await packet.read.getBalance();
            /*console.log(formatEther(grabbedAmount));
            console.log(formatEther(remainingBalance));
            console.log(formatEther(balance));*/
            expect(grabbedAmount + remainingBalance).to.equal(balance);
        });
        it("Should allow all users to draw a red packet", async function () {
            const { packet, users, balance } = await loadFixture(deployRedPacketFixture);

            let totalGrabbedAmount = 0n;
            for (const user of users) {
                const packetAsUser = await hre.viem.getContractAt(
                    "RedPacket",
                    packet.address,
                    { walletClient: user }
                );
                await packetAsUser.write.grab();
        
                const grabbedAmount = await packet.read.grabberAmounts([getAddress(user.account.address)]);
                totalGrabbedAmount += grabbedAmount;
                //console.log(formatEther(grabbedAmount))
            }

            const remainingBalance = await packet.read.getBalance();
            const expired = await packet.read.expired();
            /*console.log(formatEther(remainingBalance));
            console.log(formatEther(balance));
            console.log(expired);*/
            expect(totalGrabbedAmount + remainingBalance).to.equal(balance);
            expect(expired).to.equal(true);
        });
        it("Should not allow the creator to grab a red packet", async function () {
            const { packet, creator } = await loadFixture(deployRedPacketFixture);
    
            await expect(packet.write.grab()).to.be.rejectedWith("Creator cannot grab a packet.");
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
