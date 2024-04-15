<template>
  <v-footer app>
    <v-card
      flat
      tile
      width="100%"
      class="text-center"
    >
      <v-card-text>
        <v-btn
          class="mx-2"
          icon="mdi-license"
          variant="text"
          size="large"
          to="/license"
        ></v-btn>

        <v-btn
          class="mx-2"
          icon="mdi-radio"
          variant="text"
          size="large"
          href="//live365.com/station/raste-live-a39214"
          target="_blank"
        ></v-btn>

        <v-btn
          class="mx-2"
          icon="mdi-discord"
          variant="text"
          size="large"
          href="//discord.gg/5c3Bx2whur"
          target="_blank"
        ></v-btn>

        <v-btn
          class="mx-2"
          icon="mdi-github"
          variant="text"
          size="large"
          href="//github.com/raste-live/raste.live"
          target="_blank"
        ></v-btn>
      </v-card-text>

      <v-card-text class="font-gugi">
        <span class="text-grey">ⓒ 2021-present,</span> <strong>raste.live</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup lang="ts">
  //
</script>
