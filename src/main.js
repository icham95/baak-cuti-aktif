// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLocalStorage from 'vue-localstorage'
import VueResource from 'vue-resource'
import VueSweetAlert from 'vue-sweetalert'
import Vuelidate from 'vuelidate'
import VueSocket from 'vue-socket.io'
var VueMaterial = require('vue-material')

var hostname = window.location.hostname

const vueConfig = require('vue-config')
const configs = {
  API: 'http://' + hostname + '/cutiff/'
}

Vue.use(vueConfig, configs)

import store from './store'
Vue.use(VueSocket, 'http://' + hostname + ':7777', store)

Vue.use(VueSweetAlert)
Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.use(VueMaterial)
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  localStorage: {
    auth: {
      type: Object,
      default: {
        logged: false,
        token: null
      }
    }
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
