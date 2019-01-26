# THE Token

## A stable token, paired to the USD. THE Token also provides a marketplace to buy/sell products and services.

### Description

THE Token is a decentralized application that runs in the Ethereum blockchain.
There is one main contract: ./contracts/TheToken.sol, which is base on the
EIP20 standard and inherits additional functionality from the following Contracts
and Interfaces:

- EIP20Interfaace.sol
- Managed.sol
- Marketed.sol
- Minted.sol
- Owned.sol
- Protected.sol

When not self explanatory, these files will have comments describing the functionality.

THE Token also uses a front-end / user-facing application written in Vuejs/Nuxt.
Users buy, sell and transfer THE Tokens through this front-end application. This
is located in the following folder: 

the_token

There is also another THE token API, written in node/express, to protect 
owner only transactions, such as for minting and burning tokens. This is located in the following folder:

the_token_api

### How to set it up locally?


1. Clone the repo locally, go to the front-end app folder and run 'npm install'.

2. Start your local development blockchain, using ganache, ganache-cli or geth.
Make sure it's running on PORT 8545.

3. Still on your terminal, and at the root directory of the front-end app, 
run 'truffle migrate --reset' to migrate the contracts.

4. Run 'truffle test' to test the contract.

5. Run 'npm run dev' to start the front-end app, which will be available on:
http://localhost:8000

6. Now go to the root directory of the back-end app and run 'npm run dev'

7. If you want to user the API features, you will need to install Postgres
on your local machine. After installing, follow the next steps.

8. Install sequelize-cli globally by running 'npm i sequelize-cli -g'

9. Create the database: 'sequelize db:create'

10. Migrate: 'sequelize db:migrate'

11. Start the server by running 'npm run dev'

12. You are ready to rock, just head to http://localhost:8000!

### How to use the Dapp?

Make sure you have Metamask setup, if you have any issues, try resetting you account.

The interface is meant to be pretty intuitive. You have a sidenav available on the
left side, which has all the options available to the user:

- Home
- Account
- Buy
- Sell
- Transfer
- Marketplace

The Buy and Sell pages have a complete form, with creditcard informantion fields,
but you can ignore those and just use either the USD field or THE Token field.
You won't need to use Metamask for these transactions, since they require minting and 
burning tokens, they are routed through the API. For the Transfer page you will
need Metamask and the ethereum address of the account you want to transfer tokens 
to, which you will place it in the form. 

The marketplace page is the place where users can buy and sell products and services.
The process for selling works by first listing the product or service, 
then receiving and accepting/rejecting offers. For purchases, you just need to make
an offer and wait for the transaction to go through or be reverted.
