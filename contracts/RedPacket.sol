// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RedPacket {

    // Events
    event PacketCreated(address indexed creator, uint256 totalAmount, uint256 packetCount);
    event PacketGrabbed(address indexed grabber, uint256 amount);
    event PacketExpired(address indexed creator, uint256 remainingAmount);

    // Storage
    uint256 public packetCount;
    bool public expired;
    address[] public grabberAddresses;
    mapping(address => uint256) public grabberAmounts;
    address public creator;

    // Constructor
    constructor(uint256 _packetCount) payable {
        require(msg.value > 0, "No funds sent with transaction.");
        require(_packetCount > 0, "Packet count should be greater than 0.");

        packetCount = _packetCount;
        expired = false;
        creator = msg.sender;

        emit PacketCreated(creator, getBalance(), packetCount);
    }

    // Grab a random amount from the Red Packet
    function grab() external returns (uint256) {
        uint256 grabberCount = _getGrabberCount();

        require(!expired, "Packet has expired.");
        require(grabberCount < packetCount, "All packets have been grabbed.");
        require(grabberAmounts[msg.sender] == 0, "You have already grabbed a packet.");
        require(creator != msg.sender, "Creator cannot grab a packet.");
        require(msg.sender == tx.origin, "Only externally owned accounts can grab the packet.");
    
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));

        uint256 balance = getBalance();
        uint256 grabAmount = randomNumber % balance;

        if (grabberCount == packetCount - 1 || grabAmount >= balance) {
            grabAmount = balance;
            expired = true;
            emit PacketExpired(creator, balance);
        }

        grabberAddresses.push(msg.sender);
        grabberAmounts[msg.sender] = grabAmount;

        payable(msg.sender).transfer(grabAmount);

        emit PacketGrabbed(msg.sender, grabAmount);

        return grabAmount;
    }

    // Expire the Red Packet
    function expire() external returns (uint256) {
        require(!expired, "Packet has already expired.");
        require(creator == msg.sender, "Only creator can expire a packet.");

        expired = true;
        uint256 balance = getBalance();

        if (balance > 0) {
            payable(creator).transfer(balance);
        }

        emit PacketExpired(creator, balance);

        return balance;
    }

    // Get the list of grabbers
    function getGrabbers() external view returns (address[] memory) {
        return grabberAddresses;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _getGrabberCount() private view returns (uint256) {
        return grabberAddresses.length;
    }
    
}
