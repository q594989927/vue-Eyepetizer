// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fetchPolyfill from 'fetch-polyfill'
import VueLazyload from 'vue-lazyload'
import Element from 'element-ui'
import './assets/css/important.css'

Vue.use(fetchPolyfill)
Vue.use(Element)

Vue.use(VueLazyload, {
  loading: require('./assets/img/default.gif')
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
