pragma solidity ^0.5.0;

import "./EIP20Interface.sol";
import "./Protected.sol";
import "./Managed.sol";
import "./Minted.sol";
import "./Marketed.sol";

contract TheToken is EIP20Interface, Protected, Managed, Minted, Marketed {
  
  // total amount of tokens
  uint256 public totalSupply;
  // Constant used to check uint overflow
  uint256 constant private MAX_UINT256 = 2**256 - 1;
  // Mapping used to store account balances
  mapping (address => uint256) public balances;
  // Mapping used to store authorize addresses and respective allowances
  mapping (address => mapping (address => uint256)) public allowed;

  // Optional EIP20 public variables
  string public name;
  string public symbol;
  uint8 public decimals;

  // Id used for identifying staged transfers
  uint256 public idCounter;

  // Struct used to store future transfer information
  struct StagedTransfer {
    address from;
    address to;
    uint256 value;
  }
  // Mapping used to stored stagedTransfer,
  // id => Transfer Struct
  mapping (uint256 => StagedTransfer) public stagedTransfers;

  constructor(
    uint256 _initialAmount,          
    string memory _tokenName, 
    uint8 _decimalUnits, 
    string memory _tokenSymbol 
  ) public {
    balances[msg.sender] = _initialAmount; // This will be 0, since it's a dollar pegged token
    totalSupply = _initialAmount;                       
    name = _tokenName; // The                                    
    decimals = _decimalUnits; // Set to the standard 18 units                           
    symbol = _tokenSymbol; // THE       
    idCounter = 1;      
  }

  // EIP20 Interface Implementation

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

  function transfer(address _to, uint256 _value) public protected returns (bool success) {
    require(balances[msg.sender] >= _value, "User must have enough balance.");
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value); 
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public protected returns (bool success) {
    uint256 allowance = allowed[_from][msg.sender];
    require(balances[_from] >= _value && allowance >= _value, "User must have enough balance and sender must have allowance");
    balances[_to] += _value;
    balances[_from] -= _value;
    // if (allowance < MAX_UINT256) {
    //   allowed[_from][msg.sender] -= _value;
    // }
    allowed[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value); 
    return true;
  }

  function approve(address _spender, uint256 _value) public protected returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value); 
    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }

  // Minted Interface Implementation

  function mintTokens(uint256 _value) public onlyOwner protected returns (bool success) {
    balances[owner] += _value; 
    totalSupply += _value; 
    emit Mint(owner, _value, totalSupply);
    return true;
  }

  function burnTokens(uint256 _value) public onlyOwner protected returns (bool success) {
    require(balances[owner] >= _value, "Owner needs to have enough tokens to burn");
    balances[owner] -= _value; 
    totalSupply -= _value;
    emit Burn(owner, _value, totalSupply); 
    return true;
  }

  // Marketed Interface Implementation

  function buyTokens(address _buyer, uint256 _value) public onlyOwner protected returns (bool success) {
    mintTokens(_value);
    require(balances[owner] >= _value, "Owner must have enough minted tokens in his account.");
    balances[owner] -= _value; 
    balances[_buyer] += _value;
    emit Buy(owner, _buyer, _value);
    return true;
  }

  function sellTokens(address _seller, uint256 _value) public onlyOwner protected returns (bool success) {
    require(balances[_seller] >= _value, "Seller must have enough minted tokens in his account.");
    balances[_seller] -= _value; 
    balances[owner] += _value;
    burnTokens(_value);
    emit Sell(owner, _seller, _value);
    return true;
  }

  // Managed Contract Implementation

  // stageTransfer function
  function stageTransfer(
    address _to, 
    uint256 _value
    ) public protected returns (uint256 id) {
    address _from = msg.sender;
    require(balances[_from] >= _value, "User must have enough balance.");
    transfer(owner, _value);
    id = idCounter;
    stagedTransfers[id] = StagedTransfer(_from, _to, _value);
    idCounter++;
    emit StageTransfer(_from, _to, _value);
    return id;
  }

  // commitTransfer function
  function commitTransfer(uint256 _id) public onlyOwner protected returns (bool success) {
    require(stagedTransfers[_id].from != address(0x0) && stagedTransfers[_id].to != address(0x0), "There must be a stagedTransfer.");
    address _from = stagedTransfers[_id].from;
    address _to = stagedTransfers[_id].to;
    uint256 _value = stagedTransfers[_id].value;
    require(balances[owner] >= _value, "Owner must have enough balance.");
    transfer(_to, _value);
    delete stagedTransfers[_id];
    // idCounter--;
    emit CommitTransfer(_from, _to, _value);
    return true;
  }

  // revertTransfer function
  function revertTransfer(uint256 _id) public onlyOwner protected returns (bool success) {
    require(stagedTransfers[_id].from != address(0x0) && stagedTransfers[_id].to != address(0x0), "There must be a stagedTransfer.");
    address _from = stagedTransfers[_id].from;
    address _to = stagedTransfers[_id].to;
    uint256 _value = stagedTransfers[_id].value;
    require(balances[owner] >= _value, "Owner must have enough balance.");
    transfer(_from, _value);
    delete stagedTransfers[_id];
    // idCounter--;
    emit RevertTransfer(_from, _to, _value);
    return true;
  }

}