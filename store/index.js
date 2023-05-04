export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
    localStorage.setItem('authToken', token)
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  clearToken ({ commit }) {
    commit('clearToken')
  },
  init ({ commit }) {
    const token = localStorage.getItem('authToken')
    if (token) {
      commit('setToken', token)
    }
  }
}

export const getters = {
  getToken (state) {
    return state.token
  }
}
