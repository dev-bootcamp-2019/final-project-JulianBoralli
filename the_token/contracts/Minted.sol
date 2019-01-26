pragma solidity ^0.5.0;

interface Minted {

  // Event emitted when new tokens are minted
  event Mint(address indexed owner, uint256 indexed _value, uint256 indexed _totalSupply);
   // Event emitted when new tokens are burned
  event Burn(address indexed owner, uint256 indexed _value, uint256 indexed _totalSupply);

  function mintTokens(uint256 _value) external returns (bool success);

  function burnTokens(uint256 _value) external returns (bool success);
}