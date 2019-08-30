import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'
import i18n from './i18n'

Vue.config.productionTip = true

//axios base url
const base = axios.create({
  baseURL: 'http://172.26.3.96/'
});

//time_s methods
const time_change = function (time) {
  let hour = parseInt(time / 3600);
  let min = parseInt((time % 3600) / 60);
  let sec = time % 60;
  return hour + ":" + min + ":" + sec;
}
const time_second = function (time) {
  let time_s = time.split(":");
  let hour = parseInt((time_s[0] * 60) * 60);
  let min = parseInt(time_s[1] * 60);
  let sec = parseInt(time_s[2]);
  return hour + min + sec;
}
Vue.prototype.$http = base; //axios
Vue.prototype.$T_change = time_change; //time_change method
Vue.prototype.$T_second = time_second; //time_second method

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
