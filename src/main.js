// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import VueToast from 'vue-toast-notification';
//import { VueReCaptcha } from 'vue-recaptcha-v3';
// import 'vue-toast-notification/dist/dist/theme-default.css';

import router from './router'
Vue.use(vueRouter)
Vue.use(VueToast);
//Vue.use(VueReCaptcha, {sitekey: '6Ld0AcsaAAAAAPuanlUIf4OjtLv1O0x8JUDf9DdV'});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
