<template>
  <v-card class="my-8">
    <v-toolbar>
      <v-app-bar-nav-icon icon="mdi-discord"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi ml-0">
        Chat
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-switch
        class="mr-6"
        v-model="isDiscordActive"
        color="primary"
        hide-details
        label=""
      ></v-switch>
    </v-toolbar>

    <v-responsive
      v-if="isDiscordActive"
      class="iframe-container"
      :aspect-ratio="16/9"
      min-height="540"
    >
      <v-lazy
        :options="{ threshold: .5 }"
        transition="fade-transition"
      >
        <iframe
          class="responsive-iframe"
          src="https://e.widgetbot.io/channels/633670564774543361/633670564774543363"
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </v-lazy>
    </v-responsive>
  </v-card>
</template>

<script setup lang="ts">
  import { useDiscordStore } from '@/stores/discord'

  const discordStore = useDiscordStore()

  const isDiscordActive = ref(discordStore.isDiscordActive)

  watch(isDiscordActive, (value) => discordStore.setDiscordActive(value))
</script>
