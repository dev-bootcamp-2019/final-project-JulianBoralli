pragma solidity ^0.5.0;

interface Marketed {
  // Event emitted when tokens are bought
  event Buy(address indexed owner, address indexed _buyer, uint256 indexed _value);
   // Event emitted when tokens are sold
  event Sell(address indexed owner, address indexed _seller, uint256 indexed _value);

  function buyTokens(address _buyer, uint256 _value) external returns (bool success);

  function sellTokens(address _seller, uint256 _value) external returns (bool success);

}