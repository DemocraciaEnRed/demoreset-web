export const state = () => ({
  token: null,
  user: null,
  loginError: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
    localStorage.setItem('authToken', token)
  },
  setUser (state, user) {
    state.user = user
    localStorage.setItem('authUser', JSON.stringify(user))
  },
  setLoginError (state, loginError) {
    state.loginError = loginError
  },
  clearToken (state) {
    state.token = null
  },
  clearUser (state) {
    state.token = null
  },
  clearLoginError (state) {
    state.loginError = null
  }
}

export const actions = {
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  setLoginError ({ commit }, loginError) {
    commit('setLoginError', loginError)
  },
  clearToken ({ commit }) {
    commit('clearToken')
    localStorage.removeItem('authToken')
  },
  clearUser ({ commit }) {
    commit('clearUser')
    localStorage.removeItem('authUser')
  },
  clearLoginError ({ commit }, loginError) {
    commit('clearLoginError', loginError)
  },
  init ({ commit }) {
    const token = localStorage.getItem('authToken')
    if (token) {
      commit('setToken', token)
    }
    const user = JSON.parse(localStorage.getItem('authUser'))
    if (user) {
      commit('setUser', user)
    }
  }
}

export const getters = {
  getToken (state) {
    return state.token
  },
  getUser (state) {
    return state.user
  },
  getLoginError (state) {
    return state.loginError
  }
}
