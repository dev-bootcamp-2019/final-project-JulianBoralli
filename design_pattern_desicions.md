Here is a list of decision pattern decision for theToken contract:

- Make use use of a EIP20 standard for the token creation;

- Extend the basic token functionality with Contract and Interface inheritance
(Owned, Protected, Minted, Marketed and Managed).

- Limit and authenticate access to certain functions and state variables.

- Create a two stage process for marketplace transaction, which acts as an escrow
account. In the first stage the offers for product and services are "staged", so the 
funds are locked until the offer is accepted or pulled back. In the second stage, the 
offer can be commited or rejected.
