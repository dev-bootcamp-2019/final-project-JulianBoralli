export const state = () => ({
  products: []
})

export const mutations = {
  addProduct(state, product) {
    console.log('addProduct Commit', product)
    state.products.push(product) 
  },

  addProducts(state, products) {
    console.log('addProducts Commit', products)
    state.products = products
  }
}

export const actions = {
  async getProducts(context) {
    let products
    try {
      products = await this.$theTokenApi.get('products')
      console.log('buyToken Response', products.data)
      context.commit('addProducts', products.data)
      return products.data
    } catch (error) {
      console.log('getProducts Error', error.response)
      return error.response
    }
  },

  async createProduct(context, { address, name, targetPrice }) {
    let product
    try {
      product = await this.$theTokenApi.post('products', {
        address,
        name,
        targetPrice
      })
      console.log('createProduct Response', product)
      context.commit('addProduct', product.data)
      return product
    } catch (error) {
      console.log('createProduct Error', error.response)
      return error.response
    }
  }
}

export const getters = {
  products: (state) => {
    return state.products
  }
}
