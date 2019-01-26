<template>
  <div id="app">
    <app-header @toggle-side-nav="showSideNav = !showSideNav"></app-header>
    <main>
      <transition name="slide-nav">
        <app-side-nav v-if="showSideNav"></app-side-nav>
      </transition>
      <section>
        <nuxt></nuxt>
      </section>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import TheToken from '../../build/contracts/TheToken.json'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'
import SideNav from '@/components/navigation/SideNav'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer,
    appSideNav: SideNav
  },
  data() {
    return {
      showSideNav: false
    }
  },
  async mounted() {
    console.log('TheTokenAPI Mounted', this.$theTokenApi)
    console.log('Mounted with Web3!', this.$web3)
    await this.$store.dispatch('theToken/getTheToken', TheToken)
    this.$store.dispatch('web3/getAccounts')
    this.$store.dispatch('theToken/mintEvent')
  },
  methods: {
    
  }
}
</script>


<style lang="scss">

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

main {
  flex: 1;
  display: flex;
  section {
    overflow: hidden;
    flex: 3;
  }
}

.slide-nav-enter-active {
  transition: all .5s ease;
}
.slide-nav-leave-active {
  transition: all .5s ease;
}
.slide-nav-enter, .slide-nav-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}

</style>
