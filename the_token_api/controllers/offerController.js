const { Offer, User, Product } = require('../models')
const { web3, PK, SK, theTokenPromise, theTokenJSON } = require('../api/web3')

let theToken
theTokenPromise.then(res => (theToken = res))

const owner = PK


exports.offerIndex = async (req, res) => {
  console.log('Params', req.body)
  let offers
  try {
    offers = await Offer.findAll({include: [User, Product]})
    console.log('Offers', offers)
    res.status(200).send(offers)
  } catch (error) {
    console.log('offerIndex Error', error)
    res.status(500).send(error)
  }
}


exports.offerCreate = async (req, res) => {
  console.log('Params', req.body)
  let user
  try {
    user = await User.findOrCreate({where: {address: req.body.address}})
    user = user[0]
  } catch (error) {
    res.status(400).send(error)
  }

  let product
  try {
    product = await Product.findByPk(req.body.productId)
    if (!product) throw 'Product does not exist!'
  } catch (error) {
    res.status(400).send(error)
  }
  
  let offer
  try {
    offer = await Offer.create({
      price: req.body.price,
      productId: req.body.productId,
      userId: user.id
    })
    offer.dataValues.User = user
    offer.dataValues.Product = product
    console.log('Offer', offer)
    res.status(200).send(offer)
  } catch (error) {
    console.log('offerIndex Error', error)
    res.status(500).send(error)
  }
}


exports.offerUpdate = async (req, res) => {
  console.log('Params', req.body, req.params)
  let offer
  let user
  let tx
  try {
    user = await User.findOne({where: {address: req.body.productAddress}})
    offer = await Offer.findByPk(req.params.id, {include: [User, Product]})
    product = await offer.getProduct()
    // await if (user.id !== product.userId) throw 'User not authenticated!'
    product.status = 'Sold'
    product = await product.save()
    offer.status = 'Accepted'
    offer = await offer.save()
    console.log('User', user)
    console.log('Product', product)
    console.log('Offer', offer)
    console.log('offer Id + owner', owner)
    tx = await theToken.commitTransfer(offer.id, { from: owner })
    console.log('Tx', tx)
    res.status(200).send(offer)

  } catch (error) {
    console.log('offerUpdate Error', error)
    res.status(400).send(error)
  }
  
  // try {
    
  //   res.status(200).send(offer)
  // } catch (error) {
  //   console.log('offerUpdate Error', error)
  //   res.status(400).send(error)
  // }
}

