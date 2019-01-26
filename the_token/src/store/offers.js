export const state = () => ({
  offers: []
})

export const mutations = {
  addOffer(state, offer) {
    console.log('addOffer Commit', offer)
    state.offers.push(offer) 
  },

  addOffers(state, offers) {
    console.log('addOffers Commit', offers)
    state.offers = offers
  }
}

export const actions = {
  async getOffers(context) {
    let offers
    try {
      offers = await this.$theTokenApi.get('offers')
      console.log('buyToken Response', offers.data)
      context.commit('addOffers', offers.data)
      return offers.data
    } catch (error) {
      console.log('getOffers Error', error.response)
      return error.response
    }
  },

  async createOffer(context, { address, productId, price }) {
    let offer
    try {
      offer = await this.$theTokenApi.post('offers', {
        address,
        productId,
        price
      })
      console.log('createOffer Response', offer.data)
      context.commit('addOffer', offer.data)
      return offer
    } catch (error) {
      console.log('createOffer Error', error.response)
      return error.response
    }
  },

  async updateOffer(context, { productAddress, offerAddress, offerId }) {
    let offer
    try {
      offer = await this.$theTokenApi.put('offers/' + offerId, {
        productAddress,
        offerId,
        offerAddress
      })
      console.log('updateOffer Response', offer.data)
      return offer
    } catch (error) {
      console.log('updateOffer Error', error.response)
      return error.response
    }
  }
}

export const getters = {
  offers: (state) => {
    return state.offers
  }
}
