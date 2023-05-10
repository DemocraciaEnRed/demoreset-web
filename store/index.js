export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
    localStorage.setItem('authToken', token)
  },
  setUser (state, user) {
    state.user = user
    localStorage.setItem('authUser', user)
  },
  clearToken (state) {
    state.token = null
  },
  clearUser (state) {
    state.token = null
  }
}

export const actions = {
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  clearToken ({ commit }) {
    commit('clearToken')
    localStorage.removeItem('authToken')
  },
  clearUser ({ commit }) {
    commit('clearUser')
    localStorage.removeItem('authUser')
  },
  init ({ commit }) {
    const token = localStorage.getItem('authToken')
    if (token) {
      commit('setToken', token)
    }
    const user = localStorage.getItem('authUser')
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
  }
}
