import $http from 'axios'

const API_KEY = 'apiKey=dd95deff36874d4eabc9779119c26ff1'

let changeLoadingStatusTimeout

const state = {
  isLoaded: false,
  isForceLoaded: null,
  isLogin: false,
  selectedNew: {},
  error: '',
  users: [],
  user: {}
}

const getters = {
  isLoaded ({ isLoaded, isForceLoaded }) {
    let _loaded

    if (typeof isForceLoaded !== 'boolean' || isForceLoaded) {
      _loaded = isLoaded
    } else {
      _loaded = isForceLoaded
    }

    return _loaded
  }
}

const mutations = {
  changeLoadingStatus (state, status) {
    state.isLoaded = status
  },

  changeForceLoading (state, status = null) {
    state.isForceLoaded = status
  },

  setLoginStatus (state, status) {
    state.isLogin = status
  },

  setSelectedNew (state, val) {
    state.selectedNew = val
  },

  setError (state, error) {
    state.error = error
  },

  setUsers (state, users) {
    state.users = users
  },

  setUser (state, user) {
    state.user = user
  }
}

const actions = {
  async getNewsData ({ dispatch, state }, config) {
    !state.isLoadConfig && dispatch('changeLoadingStatus', false, { root: true })

    let isOptionString = typeof config === 'string'

    let option = isOptionString ? { url: `${config}${API_KEY}` } : config

    option = { ...option, method: 'GET' }

    const { data } = await $http(option)

    !state.isLoadConfig && dispatch('changeLoadingStatus', true, { root: true })

    return data
  },

  async onLogin ({ dispatch }, { username, password, remmember }) {
    const users = localStorage.getItem('users')

    if (!users) {
      dispatch('setError', 'Login fail')
      dispatch('setLoginStatus', !!users)
      return
    }

    const user = JSON.parse(users).find(user => (
      user.username === username &&
      user.password === password
    ))
    const authen = !!Object.keys(user).length

    if (authen && remmember) {
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(user))
      dispatch('setUser', user)
    }

    authen
      ? dispatch('setError', 'Login fail')
      : dispatch('setError', '')
    dispatch('setLoginStatus', authen)
  },

  async onRegister ({ dispatch }, info) {
    const { username, password, fullname } = info

    if (state.users.every(user => user.username !== username)) {
      dispatch('setUsers', [
        ...state.users,
        {
          username,
          password,
          fullname
        }
      ])

      dispatch('setUser', info)

      localStorage.removeItem('users')
      localStorage.setItem('users', JSON.stringify(state.users))
      dispatch('setLoginStatus', true)
      dispatch('setError', '')
    } else {
      dispatch('setError', 'Duplicate username')
    }
  },

  logOut ({ dispatch }) {
    localStorage.removeItem('user')
    dispatch('setUser', {})
    dispatch('setLoginStatus', false)
  },

  async getUsers ({ dispatch }) {
    const users = localStorage.getItem('users')
    const user = localStorage.getItem('user')

    dispatch('setLoginStatus', !!user)
    dispatch('setUsers', users ? JSON.parse(users) : [])
    dispatch('setUser', user ? JSON.parse(user) : {})
  },

  changeLoadingStatus ({ commit }, status) {
    clearTimeout(changeLoadingStatusTimeout)
    changeLoadingStatusTimeout = setTimeout(() => {
      commit('changeLoadingStatus', status)
    }, 100)
  },

  setUsers ({ commit }, users) {
    commit('setUsers', users)
  },

  setUser ({ commit }, user) {
    commit('setUser', user)
  },

  setLoginStatus ({ commit }, status) {
    commit('setLoginStatus', status)
  },

  setError ({ commit }, error) {
    commit('setError', error)
  },

  changeForceLoading ({ commit }, status) {
    commit('changeForceLoading', status)
  },

  setSelectedNew ({ commit }, val) {
    commit('setSelectedNew', val)
  }
}

export default { state, getters, mutations, actions }
