// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/rem.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import Trancenter from './components/template/tran_nav/index'
import api from './utils/api'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$axios = api;
Vue.use(Vant)
Vue.component('trannav',Trancenter)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
