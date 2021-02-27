import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    volume: 50
  },
  mutations: {
    setVolume (state, value) {
      state.volume = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
