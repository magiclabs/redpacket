// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RedPacket.sol";

contract RedPacketFactory {
    // Keep track of all deployed RedPackets
    address[] public deployedRedPackets;

    event RedPacketCreated(address redPacketAddress, address indexed creator, uint256 totalClaimCount, uint256 totalBalance);

    function createRedPacket(uint256 totalClaimCount) public payable returns (RedPacket) {
        // Create a new RedPacket
        RedPacket newRedPacket = (new RedPacket){value: msg.value}(totalClaimCount);

        // Store the address of the new RedPacket
        deployedRedPackets.push(address(newRedPacket));

        emit RedPacketCreated(address(newRedPacket), msg.sender, totalClaimCount, msg.value);

        return newRedPacket;
    }

    function getDeployedRedPackets() public view returns (address[] memory) {
        return deployedRedPackets;
    }
}