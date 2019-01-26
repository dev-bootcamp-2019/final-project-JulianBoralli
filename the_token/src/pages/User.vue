<template>
  <section>
    <h1>Account</h1>
    <div class="account-card">
      <h3>Address: <span>{{ account }}</span></h3>
      <h3>The Token Balance: <span>{{ balance }}</span></h3>
      <h3>The Token Total Supply: <span>{{ supply }}</span></h3>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      balance: '',
      supply: ''
    }
  },
  computed: {
    ...mapGetters({
      theToken: 'theToken/theToken', 
      account: 'web3/account',
      mintEventCounter: 'theToken/mintEventCounter'
    })
  },
  watch: {
    theToken() {
      this.balanceOf()
      this.totalSupply()
    },
    account() {
      this.balanceOf()
      this.totalSupply()
    },
    mintEventCounter() {
      this.balanceOf()
      this.totalSupply()
    }
  },
  async mounted() {
    if (this.theToken) {
      this.balanceOf()
      this.totalSupply()
    }
  },
  methods: {
    async balanceOf() {
      this.balance = await this.$store.dispatch('theToken/balanceOf', this.account)
    },
    async totalSupply() {
      this.supply = await this.$store.dispatch('theToken/totalSupply')
    },
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

.account-card {
  @include card;
  min-height: 400px;
  margin-bottom: 30px;
  padding: 30px 30px 10px 30px;
}

section h3 {
  color: $grey-color-light;
  span {
    color: $secondary-color;
  }
}

</style>
