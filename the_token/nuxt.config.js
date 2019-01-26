export default {
  mode: 'universal',
  srcDir: 'src/',
  rootDir: './',
  env: {
    blockchain: 'rinkeby'
  },
  head: {
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
        defer: true
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt App' }
    ]
    // link: [
    //   { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    // ]
  },

  server: {
    port: 8000
  },

  css: [
    { src: '~/assets/styles/_variables.scss', lang: 'scss' }
  ],

  modules: ['nuxt-sass-resources-loader'],

  sassResources: [
    '@/assets/styles/_variables.scss',
    '@/assets/styles/_global.scss',
    '@/assets/styles/_mixins.scss'
  ],

  plugins: [
    {src: '@/plugins/web3.js', ssr: false},
    {src: '@/plugins/theTokenApi.js', ssr: true}
  ],
  
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
