import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import type { User } from 'firebase/auth'

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
  const provider = new GoogleAuthProvider()

  // States
  const user = ref<User | null>(null)

  // Getters
  const isLoggedIn = computed(() => user.value != null)

  // Actions
  async function login () {
    await signInWithPopup(auth, provider)
  }

  async function logout () {
    await signOut(auth)
  }

  // Events
  onAuthStateChanged(auth, (u) => user.value = u)

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})
