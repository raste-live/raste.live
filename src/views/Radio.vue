<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <RadioPlayer />
      </v-col>

      <v-col cols="12">
        <v-responsive class="iframe-container" :aspect-ratio="16/9">
          <iframe class="responsive-iframe" src="https://titanembeds.com/embed/633670564774543361?defaultchannel=633670564774543363&lockscrollbar=true&theme=DiscordDark" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RadioPlayer from '@/components/RadioPlayer.vue'

@Component({ components: { RadioPlayer } })
export default class Radio extends Vue {}
</script>