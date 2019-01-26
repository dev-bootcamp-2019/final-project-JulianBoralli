const { web3, PK, SK, theTokenPromise, theTokenJSON } = require('../api/web3')

let theToken
theTokenPromise.then(res => (theToken = res))

const owner = PK

exports.buyTokensPost = async (req, res) => {
  console.log('Params', req.body)
  let tx
  try {
    tx = await theToken.buyTokens(req.body.address, req.body.quantity, { from: owner })
    console.log('Logs', tx)
    res.status(200).send('Succefully bought The Tokens!')
  } catch (error) {
    console.log('buyToken Error', error)
    res.status(500).send(error)
  }
}

exports.sellTokensPost = async (req, res) => {
  console.log('Params', req.body)
  let tx
  try {
    tx = await theToken.sellTokens(req.body.address, req.body.quantity, { from: owner })
    console.log('Logs', tx)
    res.status(200).send('Succefully sold The Tokens!')
  } catch (error) {
    console.log('sellToken Error', error.reason)
    res.status(500).send(error.reason)
  }
}

// exports.testPost = async (req, res) => {
//   console.log('Params', req.body)
//   let user1 = await User.findByPk(1)
//   console.log('User', user1)

//   res.status(200).send(`Success! ${user1.id}`)

//   // let tx
//   // try {
//   //   tx = await theToken.buyTokens(owner, 100, { from: owner })
//   //   console.log('Logs', tx)
//   //   res.status(200).send('Succefully bought The Tokens!')
//   // } catch (error) {
//   //   console.log('sellToken Error', error)
//   //   res.status(500).send(error)
//   // }
// }

// exports.testPost = async (req, res) => {
//   console.log('Params', req.body)
//   let tx
//   try {
//     tx = await theToken.buyTokens(owner, 100, { from: owner })
//     console.log('Logs', tx)
//     res.status(200).send('Succefully bought The Tokens!')
//   } catch (error) {
//     console.log('sellToken Error', error)
//     res.status(500).send(error)
//   }
// }

// exports.test1Post = async (req, res) => {
//   console.log('Params', req.body)
//   let the = new web3.eth.Contract(theTokenJSON.abi)
//   the.options.address = '0x8b0A8B636d243D1691BDAA0631eF4809F67ae4BF'
//   the.options.from = owner
//   the.options.gasPrice = '20000000000000'
//   the.options.gas = 5000000
//   console.log('Defaults', the.options) 
//   let supply
//   try {
//     supply = await the.methods.totalSupply().call()
//     console.log('Supply', supply)
//     accounts = await web3.eth.accounts
//     console.log('Accounts', accounts)
//   } catch (error) {
//     console.log('ERROR', error)
//   }
//   // let supply = await the.methods.totalSupply().call()
//   // console.log('Logs', supply)
//   let tx
//   try {
//     tx = await theToken.buyTokens(owner, 100, { from: owner })
//     console.log('Logs', tx)
//     res.status(200).send('Succefully bought The Tokens!')
//   } catch (error) {
//     console.log('sellToken Error', error)
//     res.status(500).send(error)
//   }
//   // res.status(200).send('Succefull!')
// }
