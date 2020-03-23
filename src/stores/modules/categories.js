const { NEWS_API } = window.API_PATH

const state = {
  categoriesNews: []
}

const mutations = {
  setNews (state, news) {
    state.categoriesNews = news
  }
}

const actions = {
  async getFilterNewsList ({ dispatch }, { options, category }) {
    const params = Object.keys(options).reduce((acc, key) => {
      return acc + `${key}=${options[key]}&`
    }, '')
    const { articles } = await dispatch('getNewsData',
      `${NEWS_API}${category}?${params}`,
      { root: true }
    )

    dispatch('setNews', articles)
  },

  selectNew ({ dispatch }, index) {
    dispatch('setSelectedNew', state.categoriesNews[index], { root: true })
  },

  setNews ({ commit }, data) {
    commit('setNews', data)
  }
}
export default { state, mutations, actions }
