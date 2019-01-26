
export const state = () => ({
  account: ''
})

export const mutations = {
  addAccount(state, account) {
    console.log('addAccount Commit', account)
    state.account = account
  }
}

export const actions = {
  async getAccounts(context) {
    let accounts = await this.$web3.eth.getAccounts()
    console.log('getAccounts Action', accounts)
    context.commit('addAccount', accounts[0])
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('Account Change!', accounts)
      context.commit('addAccount', accounts[0])
    })
    return accounts
  },
}

export const getters = {
  account: (state) => {
    return state.account
  }
}
