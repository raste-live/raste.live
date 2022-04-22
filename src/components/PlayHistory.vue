<template>
  <v-card>
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-icon>
          mdi-history
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi ml-n4">
        History
      </v-toolbar-title>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="history"
      :items-per-page="5"
      :footer-props="{ itemsPerPageText: '페이지 당 갯수' }"
      sort-by="played_at"
      :sort-desc="true">
      <template v-slot:item.played_at="{ item }">
        {{ item.played_at | moment('LT') }}
      </template>
      <template v-slot:no-data>
        <v-icon large class="my-8">mdi-note-multiple-outline</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Socket } from 'vue-socket.io-extended'
import { mapGetters } from 'vuex'

@Component({
  computed: { ...mapGetters({ history: "history" }) }
})
export default class PlayHistory extends Vue {
  headers = [
    { text: '곡제목', value: 'title', sortable: false },
    { text: '아티스트', value: 'artist', sortable: false },
    { text: '재생', value: 'played_at', sortable: false },
  ]

  mounted () {
    this.$socket.client.emit('history')
  }
  
  @Socket('history')
  getHistory (history: History[]) {
    this.$store.commit('setHistory', history)
  }

  @Socket('metadata')
  getMetadata (metadata: Metadata) {
    if (metadata.is_metadata_changed) {
      this.$socket.client.emit('history')
    }
  }
}
</script>
