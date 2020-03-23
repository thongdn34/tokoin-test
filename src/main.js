
import './utils/publicPath'
import './libraries/modernizr'
import './libraries/detectizr'
import './utils/cursor'

import 'normalize.css/normalize.css'
import 'flexboxgrid/dist/flexboxgrid.css'
import './assets/styles/base.scss'
import './assets/styles/classes.scss'

import Vue from 'vue'

import App from './App.vue'
import router from './routers/'
import store from './stores/'

import './plugins/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
