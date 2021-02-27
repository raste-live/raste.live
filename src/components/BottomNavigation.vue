<template>
  <v-bottom-navigation app fixed shift>
    <v-btn to="/radio">
      <span>Radio</span>

      <v-icon>mdi-music-note</v-icon>
    </v-btn>

    <v-btn to="/streaming">
      <span>Streaming</span>

      <v-icon>mdi-television-play</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BottomNavigation extends Vue {}
</script>