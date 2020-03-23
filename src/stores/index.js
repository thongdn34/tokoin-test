import Vue from 'vue'
import Vuex from 'vuex'

import root from './root'
import news from './modules/news'
import categories from './modules/categories'

Vue.use(Vuex)

const modules = {
  news,
  categories
}

for (let mod in modules) {
  modules[mod].namespaced = true
}

export default new Vuex.Store({
  ...root,
  modules
})
