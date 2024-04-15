import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
})

const URL = process.env.NODE_ENV === 'production' ? 'wss://broadcast.raste.live' : 'http://localhost:3009'

export const socket = io(URL, {
  transports: ['websocket', 'xhr-polling']
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})
