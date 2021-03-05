import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    volume: 50,
    user: null,
  },
  getters: {
    user: (state) => { return state.user },
  },
  mutations: {
    setVolume (state, value) {
      state.volume = value
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    signInWithGoogle () {
      return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    },
    signOut () {
      return firebase.auth().signOut()
    },
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
