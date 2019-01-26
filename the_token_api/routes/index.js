const express = require('express')
const router = express.Router()
const theTokenController = require('../controllers/theTokenController')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const offerController = require('../controllers/offerController')

// theTokenController
router.post('/buyTokens', theTokenController.buyTokensPost)
router.post('/sellTokens', theTokenController.sellTokensPost)
// router.post('/test', theTokenController.testPost)

// userController
router.get('/users', userController.userIndex)
router.post('/users', userController.userCreate)

// productController
router.get('/products', productController.productIndex)
router.post('/products', productController.productCreate)

// offerController
router.get('/offers', offerController.offerIndex)
router.post('/offers', offerController.offerCreate)
router.put('/offers/:id', offerController.offerUpdate)

module.exports = router