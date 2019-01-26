const { Product, User } = require('../models')


exports.productIndex = async (req, res) => {
  console.log('Params', req.body)
  let products
  try {
    products = await Product.findAll({include: [User]})
    console.log('Products', products)
    res.status(200).send(products)
  } catch (error) {
    console.log('productIndex Error', error)
    res.status(500).send(error)
  }
}

exports.productCreate = async (req, res) => {
  console.log('Params', req.body)
  let user
  try {
    user = await User.findOrCreate({where: {address: req.body.address}})
    user = user[0]
  } catch (error) {
    res.status(500).send(error)
  }
  
  let product
  try {
    product = await Product.create({
      name: req.body.name,
      targetPrice: req.body.targetPrice,
      userId: user.id
    })
    product.dataValues.User = user
    console.log('Product', product)
    res.status(200).send(product)
  } catch (error) {
    console.log('productIndex Error', error)
    res.status(500).send(error)
  }
}
