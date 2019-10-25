export default {
  mode: 'universal',
  head: {
    title: 'Disco-OAuth',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A library to make oauth requests to discord. It is easy to use and implement in your app.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/dark.css',
    '~/assets/others.css'
  ],
  plugins: [
  ],
  buildModules: [
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  axios: {
  },
  build: {
    extend (config, ctx) {
    }
  }
}
