<template>
  <nav>
    <nuxt-link class="link" to="/"><no-ssr><i class="fas fa-home"></i></no-ssr><span>Home</span></nuxt-link>
    <nuxt-link class="link" to="/user"><no-ssr><i class="fas fa-user"></i></no-ssr><span>Account</span></nuxt-link>
    <nuxt-link class="link" to="/buy"><no-ssr><i class="fas fa-sign-in-alt"></i></no-ssr><span>Buy</span></nuxt-link>
    <nuxt-link class="link" to="/sell"><no-ssr><i class="fas fa-sign-out-alt"></i></no-ssr><span>Sell</span></nuxt-link>
    <nuxt-link class="link" to="/transfer"><no-ssr><i class="fas fa-exchange-alt"></i></no-ssr><span>Transfer</span></nuxt-link>
    <nuxt-link class="link" to="/marketplace"><no-ssr><i class="fas fa-shopping-cart"></i></no-ssr><span>Marketplace</span></nuxt-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

nav {
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    background-color: #f3f3f3;
  }
}

.link {
  color: $grey-color;
  padding: 15px 50px;
  // padding-left: 50px;
  font-weight: 500;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  
  span {
    margin-left: 15px;
  }
}
</style>

