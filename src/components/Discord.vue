<template>
  <v-card>
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-discord
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi ml-n4">
        Chat
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-switch
        v-model="isDiscordActive"
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
      <v-lazy :options="{ threshold: .5 }" transition="fade-transition">
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Discord extends Vue {
  get isDiscordActive () {
    return this.$store.state.isDiscordActive
  }
  set isDiscordActive (value) { 
    this.$store.commit('setIsDiscordActive', value)
  }
}
</script>
