pragma solidity ^0.5.0;

// This managed contract adds a 2 stage process
// funcitonality to the basic Token transfer:
// 1. stage: The transfer is staged, so the tokens
// are stored on the contract;
// 2. stage: The transfer is commited, so the tokens
// are actually transfered to the new account.
// This results in an "Escrow" like model, where the owner(manager)
// has the authority to decide when the funds shoud be transfered
// or whether the transaction should revert.
// During the stage process, the funds are stored in the owners account

interface Managed {

  // stage Event
  event StageTransfer(address indexed _from, address indexed _to, uint256 indexed _value);
  
  // commit Event
  event CommitTransfer(address indexed _from, address indexed _to, uint256 indexed _value);

  // revert Event
  event RevertTransfer(address indexed _from, address indexed _to, uint256 indexed _value);
  
  // stageTransfer function
  function stageTransfer(
    address _to, 
    uint256 _value
    ) external returns (uint256 id);

  // commitTransfer function
  function commitTransfer(uint256 _id) external returns (bool success);

  // revertTransfer function
  function revertTransfer(uint256 _id) external returns (bool success);
}