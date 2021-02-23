<template>
  <v-app-bar
    app
    color="primary"
  >
    <div class="d-flex align-center">
      <v-img
        class="shrink mr-2"
        contain
        :src="require('@/assets/logo.png')"
        transition="scale-transition"
        width="40"
      />
    </div>

    <v-toolbar-title style="font-family: 'Gugi', cursive;">
      raste.live
    </v-toolbar-title>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {}
</script>
