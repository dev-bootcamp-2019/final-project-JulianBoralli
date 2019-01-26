 Here are a couple of the safety measures I took:

 - Use EIP20 Interface as my base token code and then build on top of it. The EIP20
standard is already battle tested and helped me avoid some common attacks;

- theToken contract uses simple inheritance from Contracts and Interfaces, so as
to enhance the EIP20 functionality. But it never calls any external contracts, which
could lead to reentrancy attacks.

- I've also tried to mitigate reentrancy within the contract, buy ordering the function
execution in a way to avoid it.

- On the marketplace side I believe the 2 stage process, where the offer is first
stage and then commit later, is a way to avoid front runnin attacks.

- I've avoided looping through arrays to prevent DoS with Block Gas Limit.

- I didn't do any calculations based on the contract balance, to prevent
Forcibly sending ether attacks

- In addition to owner_only modifiers, I added the Protected interface, 
which acts as a circuit breaker, when the contract is in emergency mode.

- I also created a separate API, used to trigger owner_only functions, such as for
minting and burning tokens. In the backend API, the owner keys can be store in a safer
way, and therefore, the owner_only transactions can be signed from there.