<template>
  <section>
    <h1>Buy THE Tokens</h1>
    <div class="buy-token-card">
      <form class="buy-token-form" @submit.prevent="buyToken">
        <input type="firstName" placeholder="First Name">
        <input type="lastName" placeholder="Last Name">
        <input class="large-input" type="creditCard" placeholder="Credit Card Number">
        <input type="expiration" placeholder="Expiration Date">
        <input type="zipCode" placeholder="Zip Code">
        <input v-model="dollarAmount" type="dollarAmount" placeholder="USD Amount" @keyup="dollarInput">
        <input v-model="quantity" type="quantity" placeholder="The Token Quantity" @keyup="quantityInput">
        <input class="large-input buy-token-btn" type="submit" value="Buy The Token">
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
      success: false,
      error: false,
      showMessage: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      account: 'web3/account',
    })
  },
  methods: {
    async buyToken() {
      console.log('Address', this.account, this.quantity.toString())
      let success = await this.$store.dispatch('theToken/buyTokens',{ 
        address: this.account, 
        quantity: this.quantity.toString()
      })
      console.log('buyToken', success)
      if (success.statusText === 'OK') {
        this.error = false
        this.success = true
      } else {
        this.success = false
        this.error = true
      }
      this.message = success.data 
      this.showMessage = true
    },
    dollarInput() {
      if(this.dollarAmount == '') {
        this.quantity = ''
      } else {
        // this.quantity = parseFloat(this.dollarAmount)*(10**18)
        this.quantity = parseFloat(this.dollarAmount)
      }
    },
    quantityInput() {
      if(this.quantity == '') {
        this.dollarAmount = ''
      } else {
        // this.dollarAmount = parseFloat(this.quantity)/(10**18)
        this.dollarAmount = parseFloat(this.quantity)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
section {
  @include section;
}

section h1 {
  @include section-title;
}

.buy-token-card {
  @include card;
  min-height: 300px;
  margin-bottom: 30px;
  padding: 30px 30px 10px 30px;
}

.buy-token-form {
  display: grid;
  grid-template-columns: 50% 50%;
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
}

.buy-token-btn {
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
