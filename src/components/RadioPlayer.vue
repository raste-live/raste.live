<template>
  <v-card class="mx-auto mt-4 mb-8 player" max-width="640">
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-radio
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi d-none d-sm-block ml-n4">
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
    <v-card-text class="text-center mb-0 pb-0">
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
    </v-card-text>
    <v-card-actions>
      <v-slider
        v-model="volume"
        class="ml-3"
        prepend-icon="mdi-volume-high"
        width="100"
        hide-details 
        label=""
      ></v-slider>

      <v-spacer class="d-none d-sm-block" />
      <v-spacer class="d-none d-sm-block" />

      <v-btn plain href="https://live365.com/station/raste-live-a39214" target="_blank">
        <svg style="fill: #d5d5d5;" height="18" viewBox="0 0 277 42" xmlns="http://www.w3.org/2000/svg">
          <g fill-rule="evenodd">
            <path d="M3.99 31a.324.324 0 00.238-.098.324.324 0 00.098-.238v-7.448c0-.093.047-.14.14-.14h2.1c1.512 0 2.735-.523 3.668-1.568.933-1.045 1.4-2.436 1.4-4.172 0-1.157-.22-2.189-.658-3.094-.439-.905-1.06-1.61-1.862-2.114-.803-.504-1.717-.756-2.744-.756H.714a.324.324 0 00-.238.098.324.324 0 00-.098.238v18.956c0 .093.033.173.098.238A.324.324 0 00.714 31H3.99zm1.708-11.004H4.466c-.093 0-.14-.047-.14-.14v-4.928c0-.093.047-.14.14-.14h1.232a1.74 1.74 0 011.442.7c.364.467.546 1.11.546 1.932 0 .803-.182 1.433-.546 1.89-.364.457-.845.686-1.442.686zm13.104 11.228c1.717 0 3.094-.504 4.13-1.512s1.554-2.352 1.554-4.032v-8.96c0-1.68-.518-3.024-1.554-4.032s-2.413-1.512-4.13-1.512-3.09.504-4.116 1.512c-1.027 1.008-1.54 2.352-1.54 4.032v8.96c0 1.68.513 3.024 1.54 4.032 1.027 1.008 2.399 1.512 4.116 1.512zm0-3.388c-.523 0-.938-.182-1.246-.546-.308-.364-.462-.845-.462-1.442v-9.296c0-.597.154-1.078.462-1.442.308-.364.723-.546 1.246-.546s.943.182 1.26.546c.317.364.476.845.476 1.442v9.296c0 .597-.159 1.078-.476 1.442-.317.364-.737.546-1.26.546zM33.138 31c.224 0 .345-.103.364-.308l1.484-10.36c.019-.075.047-.112.084-.112.037 0 .065.037.084.112l1.652 10.36c.019.205.14.308.364.308h3.024c.224 0 .345-.103.364-.308l3.556-18.928c.037-.243-.065-.364-.308-.364h-3.304c-.224 0-.345.103-.364.308l-1.428 10.08c-.019.075-.047.112-.084.112-.037 0-.065-.037-.084-.112l-1.652-10.08c-.019-.205-.14-.308-.364-.308h-2.828c-.224 0-.345.103-.364.308l-1.512 10.08c-.019.075-.047.112-.084.112-.037 0-.065-.037-.084-.112l-1.596-10.08c-.019-.205-.14-.308-.364-.308h-3.416c-.205 0-.308.084-.308.252l.028.112 3.78 18.928c.037.205.159.308.364.308h2.996zm22.736 0a.324.324 0 00.238-.098.324.324 0 00.098-.238v-2.716a.324.324 0 00-.098-.238.324.324 0 00-.238-.098h-5.852c-.093 0-.14-.047-.14-.14V23.02c0-.093.047-.14.14-.14h3.36a.324.324 0 00.238-.098.324.324 0 00.098-.238v-2.716a.324.324 0 00-.098-.238.324.324 0 00-.238-.098h-3.36c-.093 0-.14-.047-.14-.14v-4.424c0-.093.047-.14.14-.14h5.852a.324.324 0 00.238-.098.324.324 0 00.098-.238v-2.716a.324.324 0 00-.098-.238.324.324 0 00-.238-.098H46.27a.324.324 0 00-.238.098.324.324 0 00-.098.238v18.928c0 .093.033.173.098.238a.324.324 0 00.238.098h9.604zm5.936 0a.324.324 0 00.238-.098.324.324 0 00.098-.238V23.02c0-.093.047-.14.14-.14h.952c.056 0 .103.037.14.112l2.156 7.728c.056.187.187.28.392.28h3.36c.205 0 .308-.093.308-.28l-.028-.112-2.576-8.26c-.019-.037-.019-.07 0-.098a.211.211 0 01.084-.07c.747-.467 1.33-1.12 1.75-1.96.42-.84.63-1.81.63-2.912 0-1.157-.22-2.184-.658-3.08-.439-.896-1.06-1.591-1.862-2.086-.803-.495-1.717-.742-2.744-.742h-5.656a.324.324 0 00-.238.098.324.324 0 00-.098.238v18.928c0 .093.033.173.098.238a.324.324 0 00.238.098h3.276zm1.736-11.144h-1.26c-.093 0-.14-.047-.14-.14v-4.788c0-.093.047-.14.14-.14h1.26c.579 0 1.05.229 1.414.686.364.457.546 1.078.546 1.862 0 .765-.182 1.377-.546 1.834a1.725 1.725 0 01-1.414.686zM81.326 31a.324.324 0 00.238-.098.324.324 0 00.098-.238v-2.716a.324.324 0 00-.098-.238.324.324 0 00-.238-.098h-5.852c-.093 0-.14-.047-.14-.14V23.02c0-.093.047-.14.14-.14h3.36a.324.324 0 00.238-.098.324.324 0 00.098-.238v-2.716a.324.324 0 00-.098-.238.324.324 0 00-.238-.098h-3.36c-.093 0-.14-.047-.14-.14v-4.424c0-.093.047-.14.14-.14h5.852a.324.324 0 00.238-.098.324.324 0 00.098-.238v-2.716a.324.324 0 00-.098-.238.324.324 0 00-.238-.098h-9.604a.324.324 0 00-.238.098.324.324 0 00-.098.238v18.928c0 .093.033.173.098.238a.324.324 0 00.238.098h9.604zm7.728 0c1.699 0 3.061-.495 4.088-1.484 1.027-.99 1.54-2.305 1.54-3.948v-8.736c0-1.643-.513-2.959-1.54-3.948-1.027-.99-2.39-1.484-4.088-1.484h-5.068a.324.324 0 00-.238.098.324.324 0 00-.098.238v18.928c0 .093.033.173.098.238a.324.324 0 00.238.098h5.068zm-1.316-3.388c-.093 0-.14-.047-.14-.14V14.928c0-.093.047-.14.14-.14h1.232c.541 0 .97.205 1.288.616.317.41.476.97.476 1.68v8.232c-.019.672-.187 1.213-.504 1.624-.317.41-.728.625-1.232.644l-1.26.028zM108.206 31c1.661 0 3.015-.467 4.06-1.4 1.045-.933 1.568-2.268 1.568-4.004 0-2.053-.737-3.603-2.212-4.648-.056-.056-.047-.112.028-.168 1.27-.84 1.904-2.184 1.904-4.032 0-1.773-.527-3.108-1.582-4.004-1.055-.896-2.515-1.344-4.382-1.344h-4.676a.324.324 0 00-.238.098.324.324 0 00-.098.238v18.928c0 .093.033.173.098.238a.324.324 0 00.238.098h5.292zm-.532-11.536h-1.008c-.093 0-.14-.047-.14-.14v-4.396c0-.093.047-.14.14-.14h1.008c.653 0 1.153.205 1.498.616.345.41.518.999.518 1.764 0 .728-.177 1.293-.532 1.694-.355.401-.85.602-1.484.602zm.224 8.12h-1.232c-.093 0-.14-.047-.14-.14V22.46c0-.093.047-.14.14-.14h1.26c.597 0 1.073.243 1.428.728s.532 1.139.532 1.96-.177 1.456-.532 1.904c-.355.448-.84.672-1.456.672zm13.916 3.388a.324.324 0 00.238-.098.324.324 0 00.098-.238v-7.28l.028-.168 3.948-11.396c.037-.13.028-.229-.028-.294-.056-.065-.14-.098-.252-.098h-3.444c-.205 0-.336.093-.392.28l-1.736 6.692c-.019.056-.047.084-.084.084-.037 0-.065-.028-.084-.084l-1.736-6.692c-.056-.187-.187-.28-.392-.28h-3.444c-.205 0-.308.084-.308.252 0 .056.01.103.028.14l3.92 11.396.028.168v7.28c0 .093.033.173.098.238a.324.324 0 00.238.098h3.276z" fill-rule="nonzero"></path>
            <path d="M149.707 8v25.703c0 .316 0 .654.023.992.068.88.724 1.533 1.606 1.646.25.022.498.022.747.022 16.791 0 33.605 0 50.397.023.158 0 .316 0 .52.022v5.524c-.181 0-.385.023-.588.023-17.72 0-35.461 0-53.248.045-1.833 0-3.19-.676-3.96-2.367A2.877 2.877 0 01145 38.55V8.654c0-.203.023-.406.045-.654h4.662zm123.586-8c2.012 0 3.662 1.654 3.707 3.671v34.557c0 2.085-1.582 3.694-3.662 3.762-.543.023-1.085 0-1.628 0h-65.67v-.725c.023-11.262.023-22.547.046-33.81 0-.317 0-.657-.023-.997-.09-.929-.791-1.631-1.718-1.7-.271-.022-.543-.022-.814-.022H151.99c-2.057 0-4.092.023-6.149.045h-.723C144.53 2.107 146.203 0 148.848 0zm-6.194 9.29h-13.157c-.339 4.692-.7 9.314-1.04 14.005.498-.113.86-.227 1.22-.295 1.651-.362 3.301-.52 4.974-.204 1.266.25 2.08 1.02 2.238 2.153.226 1.654-.339 2.991-1.74 3.943-1.312.907-2.713 1.088-4.228 1.02-1.085-.068-2.215-.25-3.368-.34.43 1.496 1.334 4.577 1.424 4.623.136.068.362.136.497.158.52.068 1.086.159 1.605.182.52.022 1.04.022 1.56 0 .52-.023 1.018-.091 1.537-.159a16.3 16.3 0 001.515-.317 14.4 14.4 0 001.492-.499c.497-.204.972-.43 1.447-.68 3.3-1.767 5.2-5.257 4.77-8.928a6.743 6.743 0 00-6.353-6.028c-.333-.02-.455-.027-.57-.028h-.12c-.11.002-.263.006-.576.006l-.926.022c.113-.974.27-2.243.339-3.172.022-.159-.068-.136.361-.136 1.696.023 3.685 0 5.403 0h.791c.317-1.79.61-3.58.905-5.325zm-41.844-.112c-3.165-1.156-6.33-.93-9.404.362-.972.408-1.876.952-2.87 1.473.949 1.564 1.989 3.195 2.893 4.668 1.47-1.36 2.984-2.017 4.905-1.903 1.108.068 1.831.498 1.922 1.405.135 1.337-.407 2.379-1.537 2.583-.995.181-2.035.181-3.052.226-.43.023-.86-.045-1.311-.09v5.257c.248-.023.7-.113.881-.136 1.176-.181 1.854-.136 3.075-.023.768.091 1.763.567 1.944 1.383.271 1.246.022 2.38-.904 3.308-.86.861-1.967 1.246-3.12 1.473-1.899.363-3.82.408-5.742.159-.023.09 1.017 4.645 1.017 4.645s3.979.227 5.765.09c2.713-.226 5.29-1.132 7.505-2.81 4.43-3.398 3.368-9.38-.882-10.808l-.022-.023c1.085-.59 1.921-1.133 2.441-2.175 1.786-3.535.249-7.682-3.504-9.064zm21.566-3.58c-.248.067-.452.112-.655.158-1.99.544-3.889 1.291-5.674 2.311-2.51 1.428-4.657 3.24-6.262 5.665-2.08 3.15-2.826 6.662-2.464 10.401.294 3.014 1.582 5.484 4.363 6.957 1.83.952 3.82 1.179 5.855 1.065 4.136-.204 7.98-3.127 8.25-7.727.159-2.402-.316-4.645-2.147-6.368-2.486-2.356-5.403-2.379-8.545-1.54 0-.023.023-.114.045-.182.61-1.609 2.17-3.24 3.617-4.079 1.492-.883 1.854-.929 3.436-1.677.226-.09 1.198-.407 1.447-.498-.43-1.496-.836-3.014-1.266-4.487zm-49.71 4.448v2.93h-6.081v6.41h5.29v3.022h-5.29v6.387h6.104V32h-9.247V10.046h9.224zm-24.687-.023v21.954h-3.052V10.023h3.052zM186.01 10c-.294 1.465-.565 2.839-.836 4.212-.401 1.991-.972 4.738-1.546 7.474l-.143.683c-1.027 4.89-2.02 9.54-2.02 9.54l-2.622.045s-1.763-8.401-2.554-12.339c-.186-.92-.43-2.145-.682-3.411l-.108-.545c-.54-2.727-1.08-5.472-1.11-5.636h.441c1.022.005 2.536.02 2.815.022h.045s.302 1.839.62 3.808l.16.988c.159.983.31 1.928.419 2.622l.18 1.084.123.738c.423 2.535.96 5.712 1.03 5.893.294-1.786.543-3.388.814-4.99.52-3.229 1.628-10.188 1.628-10.188zm-25.027 0l.249 18.818 6.014-.023v3.16H158V10h2.984zm80.393 11.126c1.967 0 2.6 1.145 2.623 3.136 0 1.992-1.017 3.572-2.984 3.572l.113-.023c-1.967 0-2.555-1.74-2.555-3.732v-.755c.003-.782.01-1.402.045-1.42.746-.389 1.877-.778 2.758-.778z"></path>
          </g>
        </svg>
      </v-btn>
    </v-card-actions>

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
