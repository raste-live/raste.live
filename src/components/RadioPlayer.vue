<template>
  <v-card class="mx-auto mt-4 mb-8 player" max-width="640">
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-radio
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi">
        RADIO
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="!metadata.is_stream_offline" icon @click="toggleFavorite" :color="favorite ? 'red' : 'default'">
        <v-icon>{{ favorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>

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

      <v-chip class="font-gugi ml-1">
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

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title>로그인이 필요합니다.</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            text
            @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Socket } from 'vue-socket.io-extended'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'

enum PlayState {
  PAUSED,
  LOADING,
  PLAYING,
}

@Component({
  computed: { ...mapGetters({ user: "user", favorites: "favorites" }) }
})
export default class RadioPlayer extends Vue {
  // radio url
  streamUrl = '//broadcast.raste.live/stream'

  playState = PlayState.PAUSED

  user!: firebase.User
  favorites!: Favorite[]

  radio: HTMLAudioElement = new Audio()

  loading = true
  dialog = false

  favorite = false

  /* eslint-disable @typescript-eslint/camelcase */
  metadata: Metadata = {
    is_stream_offline: false,
    is_metadata_changed: false,
    id: '',
    title: '　',
    artist: '　',
    listeners: 0,
    query: '',
    played_at: ''
  }
  /* eslint-enable @typescript-eslint/camelcase */

  mounted () {
    this.radio.onplaying = () => { this.playState = PlayState.PLAYING }
    this.radio.onended = this.stopRadio
    this.radio.volume = this.volume * 0.01

    this.$socket.client.emit('metadata')
  }

  beforeDestroy () {
    this.stopRadio()
  }

  @Socket('metadata')
  getMetadata (metadata: Metadata) {
    this.metadata = metadata
    this.loading = false
  }

  @Watch('metadata')
  @Watch('favorites')
  metadataChanged () {
    const index = this.favorites.findIndex((item) => item.id == this.metadata.id)
    this.favorite = index != -1
  }

  get volume () {
    return this.$store.state.volume
  }
  set volume (value) { 
    this.$store.commit('setVolume', value)
    this.radio.volume = value * 0.01
  }

  get isLoading () {
    return this.playState == PlayState.LOADING
  }
  get isPaused () {
    return this.playState == PlayState.PAUSED
  }
  get isPlaying () {
    return this.playState == PlayState.PLAYING
  }

  toggleRadio () {
    if (this.isPaused) {
      this.playRadio()
    } else {
      this.stopRadio()
    }
  }

  playRadio () {
    this.playState = PlayState.LOADING
    this.radio.src = this.streamUrl
    this.radio.play()
  }

  stopRadio () {
    this.radio.pause()
    this.radio.src = ''
    this.playState = PlayState.PAUSED
  }

  toggleFavorite () {
    if (!this.user) {
      this.dialog = true
    } else if (this.metadata.id) {
      if (this.favorite) {
        this.$store.dispatch('removeFavorite', this.metadata.id)
      } else {
        this.$store.dispatch('addFavorite', this.metadata)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: relative;

  .song-title-wrapper { position: relative; }

  .song-title { word-break: keep-all; overflow-wrap: break-word; }
}
</style>