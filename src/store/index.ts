import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDarkMode: false,
  },
  mutations: {
    setDarkMode (state, value: boolean) {
      state.isDarkMode = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
