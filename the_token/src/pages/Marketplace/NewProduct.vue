<template>
  <section>
    <div class="new-product-card">
      <h2>New Product or Service</h2>
      <form class="new-product-form" @submit.prevent="newProduct">
        <input v-model="name" class="large-input" type="name" placeholder="Product or Service Name">
        <input v-model="dollarAmount" type="dollarAmount" placeholder="Target Price (USD Amount)" @keyup="dollarInput">
        <input v-model="quantity" type="quantity" placeholder="Target Price (The Token Quantity)" @keyup="quantityInput">
        <input class="large-input new-product-btn" type="submit" value="Create Product or Service">
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
      name: '',
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
    async newProduct() {
      console.log('From Address', this.account, this.name, this.quantity)
      let response = await this.$store.dispatch('products/createProduct',{ 
        address: this.account, 
        name: this.name, 
        targetPrice: this.quantity 
      })
      console.log('newProduct', response)
      if (response.status <= 400) {
        this.error = false
        this.success = true
        this.message = 'Successfully Created Product!'
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

.new-product-card {
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

.new-product-form {
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

.new-product-btn {
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
