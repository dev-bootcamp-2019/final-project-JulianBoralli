pragma solidity ^0.5.0;

interface EIP20Interface {
  
  // Event emitted when a transfer happens
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  // Event emitted when new allowance is created
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  // A token balance getter for a specific user (_owner)
  function balanceOf(address _owner) external view returns (uint256 balance);

  // Transfer _value number of tokens from msg.sender to _to address
  function transfer(address _to, uint256 _value) external returns (bool success);

  // Transfer _value number of tokens from _from address to _to address
  // The function checks for balance and allowance
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

  // Give _spender an allowance to transfer tokens
  function approve(address _spender, uint256 _value) external returns (bool success);

  // Getter function to check the amount of allowance that a _spender has
  function allowance(address _owner, address _spender) external view returns (uint256 remaining);


}