pragma solidity ^0.5.0;

import "./Owned.sol";

contract Protected is Owned {
  
  // This Protected Contract implements features that
  // act as a circuit breaker for the a contract.

  bool public emergency;

  // Event emitted when a emergency state is changed
  event Emergency(bool _value);

  constructor() public {
    // Assigns an initial value to the emergency boolean
    emergency = false;
  }

  modifier protected {
    // It prevents a function's execution in case of emergency
    // Acting like a circuit breaker
    require(emergency == false, "Current emergency state.");
    _;
  }

  // An owner only function that changes the protect boolean
  function protectContract(bool _value) public onlyOwner returns (bool success) {
    emergency = _value;
    emit Emergency(_value);
    return true;
  }

}