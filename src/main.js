import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

const express = require("express");
const app = express();
app.listen(5000, () => console.log('**********【服务器启动成功】**********'));
