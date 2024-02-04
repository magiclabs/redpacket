// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RedPacket {
  // Events
  event PacketCreated(
    address indexed creator,
    uint256 totalBalance,
    uint256 totalClaimCount
  );
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
  constructor(uint256 _totalClaimCount, address _creator) payable {
    require(msg.value > 0, 'No funds sent with transaction.');
    require(_totalClaimCount > 0, 'Total claims should be greater than 0.');

    totalClaimCount = _totalClaimCount;
    totalBalance = msg.value;
    expired = false;
    creator = _creator;

    emit PacketCreated(creator, getCurrentBalance(), totalClaimCount);
  }

  // Claim a random amount from the Red Packet
  function claim(address receiver) external returns (uint256) {
    uint256 claimedCount = getClaimedCount();

    require(!expired, 'Packet has expired.');
    require(claimedCount < totalClaimCount, 'All packets have been claimed.');
    require(
      claimedAmounts[receiver] == 0,
      'You have already claimed a packet.'
    );
    require(creator != receiver, 'Creator cannot claim a packet.');
    require(receiver != address(0), 'Receiver address cannot be 0x0');

    uint256 randomNumber = uint256(
      keccak256(abi.encodePacked(receiver, block.timestamp))
    );

    uint256 balance = getCurrentBalance();
    uint256 maxClaimAmount = ((balance / (totalClaimCount - claimedCount)) *
      15) / 10;
    uint256 claimAmount = randomNumber % maxClaimAmount;

    if (claimedCount == totalClaimCount - 1 || claimAmount >= balance) {
      claimAmount = balance;
      expired = true;
      emit PacketExpired(creator, balance);
    }

    claimedAddresses.push(receiver);
    claimedAmounts[receiver] = claimAmount;

    payable(receiver).transfer(claimAmount);

    emit PacketClaimed(receiver, claimAmount);

    return claimAmount;
  }

  // Expire the Red Packet
  function expire() external returns (uint256) {
    require(!expired, 'Packet has already expired.');
    require(creator == msg.sender, 'Only creator can expire a packet.');

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
