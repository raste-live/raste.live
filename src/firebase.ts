import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB-BqwWMNHb7D3cA3Bdx7dOPvEgavdVbSI",
  authDomain: "raste-live.firebaseapp.com",
  projectId: "raste-live",
  storageBucket: "raste-live.appspot.com",
  messagingSenderId: "613964701272",
  appId: "1:613964701272:web:ebd851c793b487c74d342d",
  measurementId: "G-30VVV7HQ5C"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
