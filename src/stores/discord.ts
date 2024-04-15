import { defineStore } from 'pinia'

export const useDiscordStore = defineStore('discord', () => {
  // States
  const isDiscordActive = ref<boolean>((localStorage.getItem('isDiscordActive') ?? 'true') == 'true')

  // Actions
  function setDiscordActive (value: boolean) {
    localStorage.setItem('isDiscordActive', value.toString())
    isDiscordActive.value = value
  }

  return {
    isDiscordActive,
    setDiscordActive,
  }
})
