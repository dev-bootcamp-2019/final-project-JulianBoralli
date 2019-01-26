import truffleContract from 'truffle-contract'

export const state = () => ({
  theToken: undefined,
  mintEventCounter: 0
})

export const mutations = {
  addTheToken(state, contractFunction) {
    console.log('addTheToken Commit', contractFunction)
    state.theToken = contractFunction
  },

  addMintEvent(state) {
    console.log('addMintEvent')
    state.mintEventCounter++
  },
}

export const actions = {
  async getTheToken(context, contractJson) {
    const Contract = truffleContract(contractJson)
    Contract.setProvider(this.$web3.currentProvider)
    const contract = await Contract.deployed()
    context.commit('addTheToken', () => { return contract })
    return contract
  },

  async balanceOf(context, address) {
    let balance = await context.state.theToken().balanceOf(address)
    console.log('balanceOf', balance.toString())
    return balance.toString()
  },

  async totalSupply(context) {
    let supply = await context.state.theToken().totalSupply()
    console.log('balanceOf', supply.toString())
    return supply.toString()
  },

  async buyTokens(context, {address , quantity}) {
    console.log('buyToken Action', address, quantity)
    try {
      const res = await this.$theTokenApi.post('buyTokens', {
        address, 
        quantity
      })
      console.log('buyToken Response', res)
      return res
    } catch (error) {
      console.log('buyToken Error', error.response)
      return error.response
    }
  },

  async sellTokens(context, {address , quantity}) {
    console.log('sellToken Action', address, quantity)
    try {
      const res = await this.$theTokenApi.post('sellTokens', {
        address, 
        quantity
      })
      console.log('sellToken Response', res)
      return res
    } catch (error) {
      console.log('sellToken Error', error.response)
      return error.response
    }
  },

  async transferTokens(context, {fromAddress, toAddress, quantity}) {
    console.log('transferToken Action', fromAddress, toAddress, quantity)
    try {
      let tx = await context.state.theToken().transfer(toAddress, quantity, {from: fromAddress})
      console.log('transferToken Response', tx)
      return tx
    } catch (error) {
      console.log('transferToken Error', error.error)
      return error
    }
  },

  async stageTransfer(context, {fromAddress, toAddress, quantity}) {
    console.log('transferToken Action', fromAddress, toAddress, quantity)
    try {
      let tx = await context.state.theToken().stageTransfer(toAddress, quantity, {from: fromAddress})
      console.log('transferToken Response', tx)
      return tx
    } catch (error) {
      console.log('transferToken Error', error.error)
      return error
    }
  },

  mintEvent(context) {
    context.state.theToken().Mint((err, res) => {
      console.log('Mint Event Callback', res)
      context.commit('addMintEvent')
    })
  }
}

export const getters = {
  theToken: (state) => {
    return state.theToken
  },
  mintEventCounter: (state) => {
    return state.mintEventCounter
  }
}
