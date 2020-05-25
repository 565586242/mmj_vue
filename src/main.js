// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import 'swiper/dist/css/swiper.css';
Vue.use(VueClipboard)
Vue.config.productionTip = false

Vue.filter('hostImg', function (value) {
	return config.imgHost + value;
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
