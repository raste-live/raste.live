<template>
  <v-footer
    padless>
    <v-card
      flat
      tile
      width="100%"
      class="text-center">
      <v-card-text>
        <v-btn icon class="mx-3" to="/license">
          <v-icon>mdi-license</v-icon>
        </v-btn>

        <v-btn icon class="mx-3" href="//live365.com/station/raste-live-a39214" target="_blank">
          <v-icon>mdi-radio</v-icon>
        </v-btn>

        <v-btn icon class="mx-3" href="//discord.gg/5c3Bx2whur" target="_blank">
          <v-icon>mdi-discord</v-icon>
        </v-btn>

        <v-btn icon class="mx-3" href="//github.com/raste-live/raste.live" target="_blank">
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="font-gugi">
        ⓒ 2021. <strong>raste.live</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>
