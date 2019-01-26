<template>
  <section>
    <h1>Transfer THE Tokens</h1>
    
    <div class="transfer-token-card">
      <form class="transfer-token-form" @submit.prevent="transferToken">
        <input v-model="toAddress" class="large-input" type="address" placeholder="Recipient Address">
        <input v-model="dollarAmount" type="dollarAmount" placeholder="USD Amount" @keyup="dollarInput">
        <input v-model="quantity" type="quantity" placeholder="The Token Quantity" @keyup="quantityInput">
        <input class="large-input transfer-token-btn" type="submit" value="Transfer The Token">
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
      toAddress: '',
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
    async transferToken() {
      console.log('From -> To Address', this.account, this.toAddress)
      let response = await this.$store.dispatch('theToken/transferTokens',{ 
        fromAddress: this.account, 
        toAddress: this.toAddress, 
        quantity: this.quantity 
      })
      console.log('transferToken', response)
      if (response.tx) {
        this.error = false
        this.success = true
        this.message = 'Successfully Transfered The Tokens!'
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

.transfer-token-card {
  @include card;
  min-height: 300px;
  margin-bottom: 30px;
  padding: 30px 30px 10px 30px;
}

.transfer-token-form {
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

.transfer-token-btn {
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
