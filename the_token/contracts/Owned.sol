pragma solidity ^0.5.0;

contract Owned {
  address public owner;

  constructor() public {
    // Assigns ownership to the creator of the contract
    owner = msg.sender;
  }

  modifier onlyOwner {
    // Require ownership to run function
    require(msg.sender == owner, "Owner only function.");
    _;
  }

  function transferOwnership(address newOwner) public onlyOwner {
    // Transfer ownership to new address
    owner = newOwner;
  }
}