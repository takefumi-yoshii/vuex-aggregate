import Vue from 'vue'
import { store } from './store/index'
import App from './vue/app.vue'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
