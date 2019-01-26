<template>
  <header>
    <span class="nav-button" @click="toggleSideNav">
      <no-ssr>
        <i class="fas fa-bars fa-2x"></i>
      </no-ssr>
    </span>
    <img src="@/assets/images/the_token_logo_transparent.png" alt="THE Token Logo">
    <span class="nav-button"></span>
  </header>
</template>

<script>
export default {
  methods: {
    toggleSideNav() {
      console.log('toggleSideNav')
      this.$emit('toggle-side-nav')
    }
  }

}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  background-color: black;
  height: 70px;
  justify-content: space-around;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
}

img {
  max-width: 200px;
  height: 50px;
  align-self: center;
}

.nav-button {
  color: #eee;
  align-self: center;
  margin: 20px;
  flex: 1;
  :hover {
    cursor: pointer;
  }
  // font-size: 20px;
}

h1 {
  color: #212121;
  text-align: center;
  flex: 30;
  font-weight: 600;
  font-size: 40px;
  align-self: center;
  :hover {
    cursor: default;
  }
}
</style>

