<template>
  <section>
    <div class="offers-card">
      <h2>Offers and Services</h2>
      <table style="width:100%">
        <tr>
          <th>Offer ID</th>
          <th>Product ID</th>
          <th>Price Offered</th>
          <th>Account</th>
          <th>Status</th>
        </tr>
        <tr v-for="offer in offers" :key="offer.id">
          <td>{{ offer.id }}</td>
          <td>{{ offer.Product.id }}</td>
          <td>{{ offer.price }}</td>
          <td>{{ offer.User.address }}</td>
          <td>{{ offer.status }}</td>
        </tr>
      </table>
    </div>
    <h2
      v-show="showMessage"
      class="message"
      :class="{ 'success': success, 'error': error }"
    >
      {{ message }}
    </h2>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Offers',
  data() {
    return {
      // offers: [
      //   // { id: 1, name: 'Product1', price: 9, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' },
      //   // { id: 2, name: 'Product2', price: 19, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' },
      //   // { id: 3, name: 'Product3', price: 28, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' },
      //   // { id: 4, name: 'Product4', price: 29, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' }
      // ],
      success: false,
      error: false,
      showMessage: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      offers: 'offers/offers' 
    })
  },
  mounted() {
    this.$store.dispatch('offers/getOffers')
  }
}
</script>

<style lang="scss" scoped>
section {
  @include section;
}

.offers-card {
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

table {
  border-collapse: collapse;
  margin: 30px 0px;
}

table, th, td {
  border: 1px solid #BBB;
}

td, th {
  padding: 10px;
  text-align: center;
}

</style>
