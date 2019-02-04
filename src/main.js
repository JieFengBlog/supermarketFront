import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './styles.scss'
import './assets/iconfont.css'
import Axios from 'axios'
import VCharts from 'v-charts'

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.prototype.$axios = Axios

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
