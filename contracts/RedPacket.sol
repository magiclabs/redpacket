// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract RedPacket {
  struct Metadata {
    uint256 totalClaimCount;
    uint256 remainingCount;
    uint256 principal;
    uint256 balance;
    uint256 claimedAmount;
    bool isClaimed;
    bool isExpired;
  }

  // Events
  event PacketCreated(
    address indexed creator,
    uint256 principal,
    uint256 totalClaimCount
  );
  event PacketClaimed(address indexed claimer, uint256 amount);
  event PacketExpired(address indexed creator, uint256 remainingBalance);

  // Constants
  uint256 internal constant MINIMUM_FUNDS = 0;
  uint256 internal constant MIN_CLAIM_COUNT = 1;

  // Storage
  address internal creator;
  mapping(address => uint256) internal claimedAmounts;
  uint256 internal totalClaimCount;
  uint256 internal principal;
  uint256 internal claimedCount;
  bool internal expired;

  constructor(uint256 _totalClaimCount, address _creator) payable {
    require(msg.value > MINIMUM_FUNDS, 'No funds sent with transaction.');
    require(
      _totalClaimCount >= MIN_CLAIM_COUNT,
      string(
        abi.encodePacked(
          'Total claims should be greater than ',
          uintToStr(MIN_CLAIM_COUNT),
          '.'
        )
      )
    );

    totalClaimCount = _totalClaimCount;
    principal = msg.value;
    expired = false;
    creator = _creator;

    emit PacketCreated(creator, getBalance(), totalClaimCount);
  }

  function claim(address receiver) external returns (uint256) {
    require(!expired, 'Packet has expired.');
    require(claimedCount < totalClaimCount, 'All packets have been claimed.');
    require(
      claimedAmounts[msg.sender] == 0,
      'You have already claimed a packet.'
    );

    uint256 balance = getBalance();
    uint256 claimAmount = principal / totalClaimCount;
    if (claimedCount == totalClaimCount - 1 || claimAmount >= balance) {
      claimAmount = balance;
      expired = true;
      emit PacketExpired(creator, balance);
    }

    // CHOICE: if you want to add the element of randomness, use below instead
    // uint256 randomNumber = uint256(
    //   keccak256(abi.encodePacked(msg.sender, block.timestamp))
    // );
    // uint256 maxClaimAmount = ((balance / (totalClaimCount - claimedCount)) *
    //   15) / 10;
    // uint256 claimAmount = randomNumber % maxClaimAmount;

    payable(receiver).transfer(claimAmount);

    claimedCount += 1;
    claimedAmounts[msg.sender] = claimAmount;

    emit PacketClaimed(msg.sender, claimAmount);

    return claimAmount;
  }

  function expire() external returns (uint256) {
    require(!expired, 'Packet has already expired.');
    require(creator == msg.sender, 'Only creator can expire a packet.');

    uint256 balance = getBalance();

    if (balance > 0) {
      payable(creator).transfer(balance);
    }

    emit PacketExpired(creator, balance);

    expired = true;

    return balance;
  }

  // getters
  function getMetadata() external view returns (Metadata memory) {
    return
      Metadata({
        totalClaimCount: totalClaimCount,
        remainingCount: totalClaimCount - claimedCount,
        principal: principal,
        balance: getBalance(),
        claimedAmount: claimedAmounts[msg.sender],
        isClaimed: claimedAmounts[msg.sender] != 0,
        isExpired: expired
      });
  }

  function getBalance() internal view returns (uint256) {
    return address(this).balance;
  }

  // unility functions
  function uintToStr(uint256 value) internal pure returns (string memory) {
    if (value == 0) {
      return '0';
    }
    uint256 temp = value;
    uint256 digits;
    while (temp != 0) {
      digits++;
      temp /= 10;
    }
    bytes memory buffer = new bytes(digits);
    while (value != 0) {
      digits -= 1;
      buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
      value /= 10;
    }
    return string(buffer);
  }
}
