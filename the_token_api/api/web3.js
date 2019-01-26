const Web3 = require('web3')
const truffleContract = require('truffle-contract')
const HDWalletProvider = require('truffle-hdwallet-provider')
const theTokenJSON = require('./theToken.json')

// const theTokenAddress = '0x68647Cfac2C3AdF3467895D55cF37fC1A13C1eC1'
// const theTokenAddress = '0x92006302ff2FB58650872cDF96a56D7115391a14'

console.log('Blockchain', process.env.BLOCKCHAIN)

// Configure different blockchain settings
const blockchain = process.env.BLOCKCHAIN || 'development'
console.log('Blockchain', blockchain)
let PK
let SK
let web3

switch (blockchain) {
case 'development':
  PK = process.env.ETHEREUM_DEVELOPMENT_PK
  SK = process.env.ETHEREUM_DEVELOPMENT_SK
  web3 = new Web3('http://localhost:8545')
  break
case 'rinkeby':
  PK = process.env.ETHEREUM_RINKEBY_PK
  SK = process.env.ETHEREUM_RINKEBY_SK
  let provider = new HDWalletProvider(SK, process.env.INFURA_RINKEBY_URL)
  // console.log('Provider', provider)
  web3 = new Web3(provider)
  // const account = web3.eth.accounts.privateKeyToAccount('0x' + SK)
  // web3.eth.accounts.wallet.add(account)
  // web3.eth.defaultAccount = account.address

  break
default:
  console.log('No valid blockchain defined.')
  break
}

// const web3 = new Web3('http://localhost:8545')
const logger = async () => {
  console.log('PK', PK)
  let coinbase = await web3.eth.getCoinbase()
  console.log('Coinbase', coinbase)
  let count = await web3.eth.getTransactionCount(coinbase)
  console.log('Count', count)
}
logger()
// console.log('Web3', web3.eth.getCoinbase())

const Contract = truffleContract(theTokenJSON)
Contract.setProvider(web3.currentProvider)
const theTokenPromise = new Promise((resolve, reject) => {
  resolve(Contract.deployed())
})

module.exports = { web3, PK, SK, theTokenPromise, theTokenJSON }
