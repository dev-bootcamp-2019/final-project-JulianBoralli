<template>
  <section>
    <div class="new-offer-card">
      <h2>New Offer</h2>
      <form class="new-offer-form" @submit.prevent="newOffer">
        <input v-model="productId" class="large-input" type="productId" placeholder="Product or Service ID">
        <input v-model="dollarAmount" type="dollarAmount" placeholder="Target Price (USD Amount)" @keyup="dollarInput">
        <input v-model="quantity" type="quantity" placeholder="Target Price (The Token Quantity)" @keyup="quantityInput">
        <input class="large-input new-offer-btn" type="submit" value="Send Offer">
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
      dollarAmount: '',
      quantity: '',
      productId: '',
      success: false,
      error: false,
      showMessage: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      account: 'web3/account',
      products: 'products/products'
    }),
    toAddress() {
      let product = this.products.filter((prod) => {
        return prod.id == this.productId
      })
      return product[0].User.address
    }
  },
  methods: {
    async newOffer() {
      await this.stageTransfer()
      if (this.success) {
        await this.createOffer()
      }
    },
    async stageTransfer() {
      console.log('From Address', this.account, this.quantity, this.toAddress)
      let success = await this.$store.dispatch('theToken/stageTransfer',{ 
        fromAddress: this.account, 
        toAddress: this.toAddress, 
        quantity: this.quantity.toString()
      })
      console.log('stageTransfer', success)
      if (success.tx) {
        this.error = false
        this.success = true
      } else {
        this.success = false
        this.error = true
      }
      this.message = success.data 
      this.showMessage = true
    },

    async createOffer() {
      console.log('From Address', this.account, this.quantity, this.productId)
      let response = await this.$store.dispatch('offers/createOffer',{ 
        address: this.account, 
        productId: this.productId, 
        price: this.quantity 
      })
      console.log('newOffer', response)
      if (response.status <= 400) {
        this.error = false
        this.success = true
        this.message = 'Successfully Created Offer!'
      } else {
        this.success = false
        this.error = true
        this.message = 'An error occurred, please contact the support team.'
      }
      this.showMessage = true
    },

    dollarInput() {
      if(this.dollarAmount == '') {
        this.quantity = ''
      } else {
        this.quantity = parseFloat(this.dollarAmount)*(10**18)
      }
    },
    quantityInput() {
      if(this.quantity == '') {
        this.dollarAmount = ''
      } else {
        this.dollarAmount = parseFloat(this.quantity)/(10**18)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
section {
  @include section;
}

.new-offer-card {
  @include card;
  min-height: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px 30px 10px 30px;
  h2 {
    text-align: center;
    color: $grey-color-light;
  }
}

.new-offer-form {
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

.new-offer-btn {
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
