<template>
  <section>
    <h1>Products and Services Marketplace</h1>
    <app-products></app-products>
    <app-offers></app-offers>
    <app-new-product></app-new-product>
    <app-new-offer></app-new-offer>
    <app-accept-offer></app-accept-offer>
  </section>
</template>

<script>
import Products from '@/pages/Marketplace/Products'
import NewProduct from '@/pages/Marketplace/NewProduct'
import NewOffer from '@/pages/Marketplace/NewOffer'
import Offers from '@/pages/Marketplace/Offers'
import AcceptOffer from '@/pages/Marketplace/AcceptOffer'

export default {
  name: 'Marketplace',
  components: {
    appProducts: Products,
    appNewProduct: NewProduct,
    appNewOffer: NewOffer,
    appOffers: Offers,
    appAcceptOffer: AcceptOffer
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

</style>
