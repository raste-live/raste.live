import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(Vuex)

interface State {
  volume: number;
  user?: firebase.User;
  history: Metadata[];
  favorites: Favorite[];
  isDiscordActive: boolean;
}

const state: State = {
  volume: parseInt(localStorage.getItem('volume') ?? '50'),
  user: undefined,
  history: [],
  favorites: [],
  isDiscordActive: (localStorage.getItem('isDiscordActive') ?? 'true') == 'true',
}

export default new Vuex.Store({
  state: state,
  getters: {
    user: (state) => state.user,
    favorites: (state) => state.favorites,
    favoritePath: (state) => {
      if (state.user) return `users/${state.user.uid}/favorites`
    },
    history: (state) => state.history,
  },
  mutations: {
    setVolume (state, value) {
      localStorage.setItem('volume', value)
      state.volume = value
    },
    setUser (state, user) {
      state.user = user
    },
    setFavorites (state, favorites) {
      state.favorites = favorites
    },
    addFavorite (state, favorite) {
      state.favorites.push(favorite)
    },
    updateFavorite (state, favorite) {
      const index = state.favorites.findIndex((item) => item.id == favorite.id)

      if (index != -1) {
        state.favorites[index] = favorite
      }
    },
    removeFavorite (state, favorite) {
      const index = state.favorites.findIndex((item) => item.id == favorite.id)

      if (index != -1) {
        state.favorites.splice(index, 1)
      }
    },
    setHistory (state, history) {
      state.history = history
    },
    setIsDiscordActive (state, value) {
      localStorage.setItem('isDiscordActive', value)
      state.isDiscordActive = value
    },
  },
  actions: {
    signInWithGoogle () {
      return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    },
    signOut () {
      return firebase.auth().signOut()
    },
    favoriteRef ({ getters }) {
      return firebase.firestore().collection(getters.favoritePath)
    },
    addFavorite ({ getters }, payload) {
      firebase.firestore()
        .collection('songs')
        .doc(payload.id)
        .set(payload, { merge: true })

      /* eslint-disable @typescript-eslint/camelcase */
      return firebase.firestore()
        .collection(getters.favoritePath)
        .doc(payload.id)
        .set({
          id: payload.id,
          title: payload.title,
          artist: payload.artist,
          created_at: new Date(),
        }, { merge: true })
      /* eslint-enable @typescript-eslint/camelcase */
    },
    removeFavorite ({ getters }, id) {
      return firebase.firestore()
        .collection(getters.favoritePath)
        .doc(id)
        .delete()
    },
  },
  modules: {
  },
  plugins: []
})
