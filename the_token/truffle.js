const HDWalletProvider = require('truffle-hdwallet-provider')
const SK = process.env.ETHEREUM_RINKEBY_SK
const INFURA_ENDPOINT = process.env.INFURA_RINKEBY_URL


module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(SK, INFURA_ENDPOINT),
      network_id: '4'
    }
  }
}
