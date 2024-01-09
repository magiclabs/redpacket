// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RedPacket {

    // Events
    event PacketCreated(address indexed creator, uint256 totalBalance, uint256 totalClaimCount);
    event PacketClaimed(address indexed claimer, uint256 amount);
    event PacketExpired(address indexed creator, uint256 remainingBalance);

    // Storage
    uint256 public totalClaimCount;
    uint256 public totalBalance;
    bool public expired;
    address[] public claimedAddresses;
    mapping(address => uint256) public claimedAmounts;
    address public creator;

    // Constructor
    constructor(uint256 _totalClaimCount) payable {
        require(msg.value > 0, "No funds sent with transaction.");
        require(_totalClaimCount > 0, "Total claims should be greater than 0.");

        totalClaimCount = _totalClaimCount;
        totalBalance = msg.value;
        expired = false;
        creator = msg.sender;

        emit PacketCreated(creator, getCurrentBalance(), totalClaimCount);
    }

    // Claim a random amount from the Red Packet
    function claim() external returns (uint256) {
        uint256 claimedCount = getClaimedCount();

        require(!expired, "Packet has expired.");
        require(claimedCount < totalClaimCount, "All packets have been claimed.");
        require(claimedAmounts[msg.sender] == 0, "You have already claimed a packet.");
        require(creator != msg.sender, "Creator cannot claim a packet.");
    
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));

        uint256 balance = getCurrentBalance();
        uint256 claimAmount = randomNumber % balance;

        if (claimedCount == totalClaimCount - 1 || claimAmount >= balance) {
            claimAmount = balance;
            expired = true;
            emit PacketExpired(creator, balance);
        }

        claimedAddresses.push(msg.sender);
        claimedAmounts[msg.sender] = claimAmount;

        payable(msg.sender).transfer(claimAmount);

        emit PacketClaimed(msg.sender, claimAmount);

        return claimAmount;
    }

    // Expire the Red Packet
    function expire() external returns (uint256) {
        require(!expired, "Packet has already expired.");
        require(creator == msg.sender, "Only creator can expire a packet.");

        expired = true;
        uint256 balance = getCurrentBalance();

        if (balance > 0) {
            payable(creator).transfer(balance);
        }

        emit PacketExpired(creator, balance);

        return balance;
    }

    function getCurrentBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getClaimedAddresses() external view returns (address[] memory) {
        return claimedAddresses;
    }

    function getClaimedCount() public view returns (uint256) {
        return claimedAddresses.length;
    }

}
