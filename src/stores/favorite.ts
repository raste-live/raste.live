import { defineStore } from 'pinia'
import { db } from '@/firebase'

import {
  collection,
  onSnapshot,
  Unsubscribe,
  Timestamp,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore'

import { useUserStore } from '@/stores/user'
import type { TrackInfo } from '@/stores/music-player'

export interface Favorite {
  id: string
  title: string
  artist: string
  created_at: Timestamp
}

export const useFavoriteStore = defineStore('favorite', () => {
  const userStore = useUserStore()

  const unsubscribe = ref<Unsubscribe | null>(null)
  const favoritePath = computed(() => `users/${userStore.user?.uid ?? 'guest'}/favorites`)

  // States
  const favorites = ref<Favorite[]>([])
  const isLoading = ref<boolean>(true)

  // Actions
  function initFavorites () {
    if (unsubscribe.value) return

    favorites.value = []
    isLoading.value = true

    unsubscribe.value = onSnapshot(collection(db, favoritePath.value), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const favorite = change.doc.data() as Favorite

        if (change.type === 'added') {
          favorites.value.push(favorite)
        } else {
          const index = favorites.value.findIndex((item) => item.id == favorite.id)

          if (index == -1) return

          if (change.type === "modified") {
            favorites.value[index] = favorite
          } else if (change.type === "removed") {
            favorites.value.splice(index, 1)
          }
        }
      })

      isLoading.value = false
    })
  }

  function disposeFavorites () {
    if (unsubscribe.value) {
      unsubscribe.value()
      unsubscribe.value = null
    }

    isLoading.value = true
  }

  function fetchFavorites () {
    return onSnapshot(collection(db, favoritePath.value), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const favorite = change.doc.data() as Favorite

        if (change.type === 'added') {
          favorites.value.push(favorite)
        } else {
          const index = favorites.value.findIndex((item) => item.id == favorite.id)

          if (index == -1) return

          if (change.type === "modified") {
            favorites.value[index] = favorite
          } else if (change.type === "removed") {
            favorites.value.splice(index, 1)
          }
        }
      })

      isLoading.value = false
    })
  }

  function addFavorite (trackInfo: TrackInfo) {
    setDoc(
      doc(db, 'songs', trackInfo.id),
      trackInfo,
      { merge: true }
    )

    const favorite: Favorite = {
      id: trackInfo.id,
      title: trackInfo.title,
      artist: trackInfo.artist,
      created_at: Timestamp.now()
    }

    setDoc(
      doc(db, favoritePath.value, trackInfo.id),
      favorite,
      { merge: true }
    )
  }

  function removeFavorite (id: string) {
    deleteDoc(
      doc(db, favoritePath.value, id)
    )
  }

  return {
    favorites,
    isLoading,
    initFavorites,
    disposeFavorites,
    fetchFavorites,
    addFavorite,
    removeFavorite,
  }
})

