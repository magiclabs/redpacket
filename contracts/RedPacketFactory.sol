// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RedPacket.sol";

contract RedPacketFactory {
    // Keep track of all deployed RedPackets
    RedPacket[] public deployedRedPackets;

    event RedPacketCreated(RedPacket redPacket);

    function createRedPacket(uint totalClaimCount) public payable returns (RedPacket) {
        // Create a new RedPacket
        RedPacket newRedPacket = (new RedPacket){value: msg.value}(totalClaimCount);

        // Store the address of the new RedPacket
        deployedRedPackets.push(newRedPacket);

        emit RedPacketCreated(newRedPacket);

        return newRedPacket;
    }

    function getDeployedRedPackets() public view returns (RedPacket[] memory) {
        return deployedRedPackets;
    }
}