// To run: $ node --experimental-repl-await repl
const repl = require('repl')

const models = require('../models/index')

const replServer = repl.start({
  prompt: 'the-token-console > '
})

replServer.context.User = models.User
replServer.context.Product = models.Product
replServer.context.Offer = models.Offer
replServer.context.models = models
