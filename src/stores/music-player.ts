import { defineStore } from 'pinia'
import { socket } from '@/socket'

import { useFavoriteStore } from '@/stores/favorite'

const STREAM_URL = process.env.NODE_ENV === 'production' ? '//broadcast.raste.live/stream' : 'http://localhost:8000/stream'

enum PlayState {
  PAUSED,
  LOADING,
  PLAYING,
}

export interface TrackInfo {
  id: string
  title: string
  artist: string
  query: string
  played_at: string
}

interface Metadata {
  id: string
  title: string
  artist: string
  played_at: string
  query: string
  listeners: number
  is_stream_offline: boolean
  is_metadata_changed: boolean
}

export const useMusicPlayerStore = defineStore('music-player', () => {
  const radio = new Audio()
  const playState = ref<PlayState>(PlayState.PAUSED)

  const favoriteStore = useFavoriteStore()

  // States
  const volume = ref<number>(parseInt(localStorage.getItem('volume') ?? '50'))
  const trackInfo = ref<TrackInfo | undefined>(undefined)
  const listenersCount = ref<number>(0)
  const playHistory = ref<TrackInfo[]>([])
  const isStreamOffline = ref<boolean>(false)

  // Getters
  const isPlaying = computed(() => playState.value == PlayState.PLAYING)
  const isPaused = computed(() => playState.value == PlayState.PAUSED)
  const isLoading = computed(() => playState.value == PlayState.LOADING)
  const isFavorite = computed(() => favoriteStore.favorites.findIndex((item) => item.id == trackInfo.value?.id) != -1)

  // Actions
  function initRadio () {
    radio.addEventListener('playing', onPlaying)
    radio.addEventListener('ended', onStop)
  }

  function disposeRadio () {
    if (!isPaused.value) onStop()

    radio.removeEventListener('playing', onPlaying)
    radio.removeEventListener('ended', onStop)
  }

  function toggleRadio () {
    if (isPaused.value) {
      onPlay()
    } else {
      onStop()
    }
  }

  function setVolume (value: number) {
    localStorage.setItem('volume', value.toString())

    volume.value = value

    radio.volume = volume.value * 0.01
  }

  function fetchMetadata () {
    socket.on('connect', () => {
      socket.emit('metadata')

      socket.emit('history')
    })

    socket.on('metadata', (response: Metadata) => {
      trackInfo.value = {
        id: response.id,
        title: response.title,
        artist: response.artist,
        query: response.query,
        played_at: response.played_at,
      }

      listenersCount.value = response.listeners
      isStreamOffline.value = response.is_stream_offline

      if (response.is_metadata_changed) socket.emit('history')
    })

    socket.on('history', (response: TrackInfo[]) => {
      playHistory.value = response
    })
  }

  // Events
  function onPlay () {
    if (!isPaused.value) {
      window.console.error('라디오가 이미 재생중입니다')
      return
    }

    playState.value = PlayState.LOADING
    window.console.log('Radio : LOADING')

    radio.volume = volume.value * 0.01
    radio.src = STREAM_URL
    radio.play()
  }

  function onPlaying () {
    playState.value = PlayState.PLAYING
    window.console.log('Radio : PLAYING')
  }

  function onStop () {
    if (!isPlaying.value) {
      window.console.error('라디오가 현재 재생중이 아닙니다')
      return
    }

    radio.pause()
    radio.src = ''

    playState.value = PlayState.PAUSED
    window.console.log('Radio : PAUSED')
  }

  return {
    volume,
    playHistory,
    trackInfo,
    listenersCount,
    isStreamOffline,
    isPlaying,
    isPaused,
    isLoading,
    isFavorite,
    initRadio,
    disposeRadio,
    toggleRadio,
    setVolume,
    fetchMetadata,
  }
})

