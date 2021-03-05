import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import moment from 'moment'
import * as VueMoment from 'vue-moment'
import 'moment/locale/ko'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'

Vue.config.productionTip = false

const socket = io('//broadcast.raste.live', {
  transports: ['websocket', 'xhr-polling']
})

Vue.use(VueSocketIOExt, socket)
Vue.use(VueMoment, { moment }) // Initialize with Locale

const firebaseConfig = {
  apiKey: "AIzaSyB-BqwWMNHb7D3cA3Bdx7dOPvEgavdVbSI",
  authDomain: "raste-live.firebaseapp.com",
  projectId: "raste-live",
  storageBucket: "raste-live.appspot.com",
  messagingSenderId: "613964701272",
  appId: "1:613964701272:web:ebd851c793b487c74d342d",
  measurementId: "G-30VVV7HQ5C"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

firebase.firestore().enablePersistence()

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
firebase.auth().onAuthStateChanged((user) => {
  store.commit('setUser', user)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
