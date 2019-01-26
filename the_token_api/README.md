# The Token API

## A stable token, paired to the USD. THE Token also provides a marketplace to buy/sell products and services.

### Description

This THE Token API is responsible for routing owner only transactions of 
THE Token Contract. It also stores other information relevant to the project.


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


PS: Front-end specific information is provided in the front-end app folder.