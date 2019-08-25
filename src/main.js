import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from "@/router";

import 'iview/dist/styles/iview.css';
import 'jquery';
import $ from 'jquery';

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

