import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from "./router/permission";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import 'iview/dist/styles/iview.css';
import axios from './utils/fetch'

Vue.use(iView)
Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


import {parseTime} from './filters'
Vue.filter('parseTime', parseTime)

