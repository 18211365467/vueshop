import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store/store'
//导入mint组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from './axios.js'
Vue.use(axios)
//导入
import auth from './auth.js'
//注册auth
Vue.use(auth)
//注册MintUI
Vue.use(MintUI)
//导入vue-preview
import VuePreview from 'vue-preview'
//注册
Vue.use(VuePreview)
//导入 mint样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
