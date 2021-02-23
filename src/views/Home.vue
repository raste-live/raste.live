<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" lg="8" xl="7">
        <div class="video-container">
          <iframe class="responsive-iframe" src="//ok.ru/videoembed/2814061387301?nochat=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>
        </div>
      </v-col>

      <v-col cols="12" lg="4" xl="5">
        <div class="chat-container">
          <iframe class="responsive-iframe" src="https://titanembeds.com/embed/633670564774543361?defaultchannel=633670564774543363&lockscrollbar=true&theme=DiscordDark" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

.chat-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-top: 56.25%;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>