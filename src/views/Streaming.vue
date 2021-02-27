<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" lg="8" xl="7">
        <v-responsive class="iframe-container" :aspect-ratio="16/9">
          <iframe class="responsive-iframe" src="//ok.ru/videoembed/2814061387301?nochat=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>
        </v-responsive>
      </v-col>

      <v-col cols="12" lg="4" xl="5">
        <v-responsive class="iframe-container" :aspect-ratio="16/9">
          <iframe class="responsive-iframe" src="https://titanembeds.com/embed/633670564774543361?defaultchannel=633670564774543363&lockscrollbar=true&theme=DiscordDark" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </v-responsive>
      </v-col>

      <v-col cols="12">
        <v-responsive class="iframe-container" :aspect-ratio="16/9">
          <iframe class="responsive-iframe" src="https://anissia.net/schedule/2015#ffffff5987b6fffffff2f2f2497ba79cb3c7ffffffffffff555555f8f8f82474cecb3434000000000000777777111111777777111111c3b443070707999999000000cccccc3a7da3" frameborder="0"></iframe>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Streaming extends Vue {}
</script>