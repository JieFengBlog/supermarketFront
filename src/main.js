import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './styles.scss'
import './assets/iconfont.css'
import axios from 'axios'
import VCharts from 'v-charts'
import qs from 'qs'
import {store} from "./store/store";
import Cookies from 'js-cookie'

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(Cookies)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
Vue.use(qs)

Vue.config.productionTip = false

new Vue({
  router,
  store:store,
  render: function (h) { return h(App) }
}).$mount('#app')
