<template>
  <section>
    <div class="accept-offer-card">
      <h2>Accept Offer</h2>
      <form class="accept-offer-form" @submit.prevent="acceptOffer">
        <input v-model="offerId" class="large-input" type="offerId" placeholder="Product or Service ID">
        <input class="large-input accept-offer-btn" type="submit" value="Accept Offer">
      </form>
    </div>
    <h2 v-show="showMessage" class="message" :class="{ 'success': success, 'error': error }">{{ message }}</h2>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      offerId: '',
      success: false,
      error: false,
      showMessage: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      account: 'web3/account',
      offers: 'offers/offers'
    }),
    offerAddress() {
      let offer = this.offers.filter((offer) => {
        return offer.id == this.offerId
      })
      return offer[0].User.address
    }
  },
  methods: {
    async acceptOffer() {
      console.log('From Address', this.account, this.offerAddress, this.offerId)
      let response = await this.$store.dispatch('offers/updateOffer',{ 
        productAddress: this.account, 
        offerId: this.offerId, 
        offerAddress: this.offerAddress 
      })
      console.log('acceptOffer', response)
      if (response.status <= 400) {
        this.error = false
        this.success = true
        this.message = 'Successfully Accepted the Offer!'
        this.$store.dispatch('products/getProducts')
        this.$store.dispatch('offers/getOffers')
      } else {
        this.success = false
        this.error = true
        this.message = 'An error occurred, please contact the support team.'
      }
      this.showMessage = true
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  @include section;
}

.accept-offer-card {
  @include card;
  height: 230px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px 30px 10px 30px;
  h2 {
    text-align: center;
    color: $grey-color-light;
  }
}

.accept-offer-form {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 25% 25% 150px;
    input {
    margin: 15px;
    height: 40px;
    border-radius: 3px;
    border-radius: 5px;
    border: 1px solid #9e9e9e;
    box-sizing: border-box;
    font-size: 1rem;
    color: $grey-color;
    padding: 0 20px;
    &:focus {
      outline: none;
      border: 1.7px solid $secondary-color;
    }
    &::placeholder {
      color: #9e9e9e;
      padding-left: 20px;
      font-size: 1rem;
    }
  }
}

.large-input {
  grid-column: 1 / span 2;
  align-self: center;
}

.accept-offer-btn {
  background-color: $secondary-color;
  font-size: 1.1rem;
  font-weight: 600;
  width: 50%;
  margin-top: 50px;
  justify-self: center;
  &:hover {
    cursor: pointer;
  }
}

.message {
  margin: 80px 50px;
  text-align: center;
  color: $grey-color;
}

.success {
  color: #00E676;

}

.error {
  color: #FF1744;
}
</style>
