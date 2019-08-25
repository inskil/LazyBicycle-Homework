import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from "@/router";
import store from "@/store";
import 'iview/dist/styles/iview.css';
import axios from 'axios'

import $ from 'jquery'

Vue.use(iView)

Vue.prototype.$axios = axios
axios.defaults.baseURL='/api'



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

