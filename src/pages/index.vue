<template>
  <v-container>
    <MusicPlayer />

    <PlayHistory />

    <Favorites v-if="userStore.isLoggedIn" />

    <Discord />
  </v-container>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()
</script>
