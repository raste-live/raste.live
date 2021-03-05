import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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
    favorites ({ getters }) {
      return firebase.firestore().collection('users').doc(getters.user.uid).collection('favorites')
    },
    getFavorite ({ getters }, id) {
      return firebase.firestore().collection('users').doc(getters.user.uid).collection('favorites').doc(id).get()
    },
    addFavorite ({ getters }, payload) {
      firebase.firestore().collection('songs').doc(payload.id).set(payload, { merge: true })
      
      /* eslint-disable @typescript-eslint/camelcase */
      return firebase.firestore().collection('users').doc(getters.user.uid).collection('favorites').doc(payload.id).set({
        id: payload.id,
        title: payload.title,
        artist: payload.artist,
        created_at: new Date(),
      }, { merge: true })
      /* eslint-enable @typescript-eslint/camelcase */
    },
    removeFavorite ({ getters }, id) {
      return firebase.firestore().collection('users').doc(getters.user.uid).collection('favorites').doc(id).delete()
    },
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
