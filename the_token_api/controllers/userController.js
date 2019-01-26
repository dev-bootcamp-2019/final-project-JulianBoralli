const { User } = require('../models')

exports.userIndex = async (req, res) => {
  console.log('Params', req.body)
  let users
  try {
    users = await User.findAll()
    console.log('Users', users)
    res.status(200).send(users)
  } catch (error) {
    console.log('userIndex Error', error)
    res.status(500).send(error)
  }
}

exports.userCreate = async (req, res) => {
  console.log('Params', req.body)
  let user
  try {
    user = await User.create({address: req.body.address})
    console.log('User', user)
    res.status(200).send(user)
  } catch (error) {
    console.log('userIndex Error', error)
    res.status(500).send(error)
  }
}
