<template>
  <section>
    <h1>
      Stable token, paired to the USD
    </h1>
    <div v-if="theToken" class="the-token-card">
      <h3>
        In addition to buying, selling and transfering THE Tokens, there is a whole
        marketplace for products and services, created on top of THE tokens.
      </h3><br>
      <h3>Here is the contract address: <span>{{ theToken().address }}</span></h3>
      <br>
      <h3>And here is the account your current account:<span>{{ account }}</span></h3>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    theToken() {
      return this.$store.getters['theToken/theToken']
    },
    account() {
      return this.$store.getters['web3/account']
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
section {
  @include section;
}

section h1 {
  @include section-title;
}

section h3 {
  color: $grey-color-light;
  span {
    color: $secondary-color;
  }
}

section h4 {
  color: $secondary-color;
  text-align: center;
}

.the-token-card {
  @include card;
  min-height: 350px;
  margin-bottom: 30px;
  padding: 30px 30px 10px 30px;
}
</style>
