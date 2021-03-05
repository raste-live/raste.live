<template>
  <v-app-bar app dark>
    <v-app-bar-nav-icon>
      <v-img
        class="shrink"
        contain
        :src="require('@/assets/logo.png')"
        transition="scale-transition"
        width="40" />
    </v-app-bar-nav-icon>

    <v-toolbar-title class="font-gugi">
      raste.live
    </v-toolbar-title>
    <!-- <v-spacer></v-spacer> -->

    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab to="/radio">
          <v-icon class="mr-2">mdi-music-note</v-icon>
          Radio
        </v-tab>
        <v-tab to="/streaming">
          <v-icon class="mr-2">mdi-television-play</v-icon>
          Streaming
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Appbar extends Vue {}
</script>
