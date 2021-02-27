<template>
  <v-card class="mx-auto mt-4 mb-8 player" max-width="640">
    <v-toolbar>
      <v-btn icon @click="count = count + 1">
        <v-icon>
          mdi-radio
        </v-icon>
      </v-btn>
      <v-toolbar-title class="font-gugi">
        RADIO
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left offset-y transition="slide-y">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-subheader class="pl-6">검색</v-subheader>
          <v-list-item :href="`https://google.com/search?q=${metadata.query}`" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-google</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Google</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :href="`https://youtube.com/results?search_query=${metadata.query}`" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-youtube</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Youtube</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-chip class="font-gugi ml-3">
        <v-icon class="mr-2" small>mdi-headphones</v-icon>
        {{ metadata.listeners }}
      </v-chip>
    </v-toolbar>

    <div v-if="metadata.is_stream_offline">
      <v-card-title class="text-center d-block font-gugi">
        현재 방송중이 아닙니다
      </v-card-title>
    </div>
    <div v-else class="song-title-wrapper">
      <v-overlay :absolute="true" :value="loading">
        <v-progress-circular
          indeterminate
          size="48"
        ></v-progress-circular>
      </v-overlay>
      <v-card-title class="text-center d-block font-noto-sans song-title">
        {{ metadata.title }}
      </v-card-title>
      <v-card-subtitle class="text-center font-noto-sans song-title">
        {{ metadata.artist }}
      </v-card-subtitle>
    </div>
    <v-row>
      <v-col cols="4" offset="4">
        <v-btn
          color="primary" fab large
          elevation="3"
          :loading="isLoading"
          :disabled="isLoading || metadata.is_stream_offline"
          @click="toggleRadio">
          <v-icon x-large>
            {{ isPaused ? 'mdi-play' : 'mdi-pause' }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col 
        cols="6" offset="3"
        sm="4" offset-sm="0">
        <v-slider
          v-model="volume"
          prepend-icon="mdi-volume-high"
          append-icon="-"
        ></v-slider>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar">
      그만눌러 ㄹㅇ 아무것도 없음

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Socket } from 'vue-socket.io-extended'

enum PlayState {
  PAUSED,
  LOADING,
  PLAYING,
}

@Component
export default class RadioPlayer extends Vue {
  // radio url
  streamUrl = 'http://broadcast.raste.live:8000/radio.mp3'

  playState = PlayState.PAUSED

  radio?: HTMLAudioElement

  count = 0
  snackbar = false
  loading = true

  /* eslint-disable @typescript-eslint/camelcase */
  metadata: SongMetadata = {
    is_stream_offline: false,
    title: '　',
    artist: '　',
    listeners: 0,
    query: '',
    played_at: ''
  }
  /* eslint-enable @typescript-eslint/camelcase */

  mounted () {
    this.initRadio()

    this.$socket.client.emit('metadata')
  }

  beforeDestroy () {
    this.stopRadio()
  }

  @Watch('count')
  detectCount () {
    if (this.count == 20) this.snackbar = true
  }

  get volume () {
    return this.$store.state.volume
  }
  set volume (value) { 
    this.$store.commit('setVolume', value)

    if (this.radio) {
      this.radio.volume = value * 0.01
    }
  }

  get isLoading () {
    return this.playState == PlayState.LOADING
  }

  get isPaused () {
    return this.playState == PlayState.PAUSED
  }

  toggleRadio () {
    if (this.isPaused) {
      this.playRadio()
    } else {
      this.stopRadio()
    }
  }

  initRadio () {
    this.playState = PlayState.PAUSED

    this.radio = new Audio()

    this.radio.onplaying = () => { this.playState = PlayState.PLAYING }
    this.radio.onended = this.stopRadio
    this.radio.volume = this.volume * 0.01
  }

  playRadio () {
    this.playState = PlayState.LOADING

    if (this.radio) {
      this.radio.src = this.streamUrl
      this.radio.play()
    }
  }

  stopRadio () {
    if (this.radio) this.radio.pause()

    this.initRadio()
  }

  @Socket('metadata')
  getMetadata (metadata: SongMetadata) {
    this.metadata = metadata
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: relative;

  .song-title-wrapper { position: relative; }

  .song-title { overflow-wrap: break-word; }
}
</style>