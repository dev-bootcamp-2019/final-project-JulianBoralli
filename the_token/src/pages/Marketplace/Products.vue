<template>
  <section>
    <div class="products-card">
      <h2>Products and Services</h2>
      <table style="width:100%">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Target Price</th>
          <th>Account</th>
          <th>Status</th>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.targetPrice }}</td>
          <td>{{ product.User.address }}</td>
          <td>{{ product.status }}</td>
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
  name: 'Products',
  data() {
    return {
      // products: [
      //   // { id: 1, name: 'Product1', targetPrice: 10, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' },
      //   // { id: 2, name: 'Product2', targetPrice: 20, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' },
      //   // { id: 3, name: 'Product3', targetPrice: 30, account: '0xfA25345ab919a8b9Fd643ce8482987117LJHOPW' }
      // ],
      success: false,
      error: false,
      showMessage: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/products' 
    })
  },
  mounted() {
    this.$store.dispatch('products/getProducts')
  }
}
</script>

<style lang="scss" scoped>
section {
  @include section;
}

.products-card {
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
