<template>
  <v-card>
    <v-toolbar>
      <v-app-bar-nav-icon>
        <v-icon color="red">
          mdi-heart
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi">
        Favorites
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="검색"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>

    <v-skeleton-loader
      v-if="loading"
      v-bind="{ boilerplate: true }"
      type="table"
      :loading="loading"
    ></v-skeleton-loader>

    <v-data-table
      v-else
      :headers="headers"
      :items="favorites"
      :search="search"
      :items-per-page="5"
      :footer-props="{ itemsPerPageText: '페이지 당 갯수' }"
      sort-by="created_at"
      :sort-desc="true">
      <template v-slot:item.created_at="{ item }">
        {{ item.created_at.seconds | moment('LLL') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="deleteItem(item)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-icon large class="my-8">mdi-heart-multiple-outline</v-icon>
      </template>
      <template v-slot:no-results>
        검색어와 일치하는 곡이 없습니다.
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="mb-2">선택한 곡을 목록에서 지우시겠습니까?</v-card-title>
        <v-card-subtitle>{{ selectedItem.title }} - {{ selectedItem.artist }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'

@Component({
  computed: { ...mapGetters({ favorites: "favorites" }) }
})
export default class Favorites extends Vue {
  headers = [
    { text: '곡제목', value: 'title' },
    { text: '아티스트', value: 'artist' },
    { text: '등록', value: 'created_at' },
    { text: '', value: 'actions', sortable: false },
  ]

  loading = true
  dialog = false

  search = ''

  unsubscribe?: CallableFunction

  /* eslint-disable @typescript-eslint/camelcase */
  selectedItem: Favorite = {
    id: '',
    title: '',
    artist: '',
    created_at: '',
  }
  /* eslint-enable @typescript-eslint/camelcase */

  mounted () {
    this.$store.commit('setFavorites', [])

    this.$store.dispatch('favoriteRef')
      .then((favoriteRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>) => {
        this.unsubscribe = favoriteRef.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const favorite = change.doc.data() as Favorite

            if (change.type === "added") {
              this.$store.commit('addFavorite', favorite)
            } else if (change.type === "modified") {
              this.$store.commit('updateFavorite', favorite)
            } else if (change.type === "removed") {
              this.$store.commit('removeFavorite', favorite)
            }
          })

          this.loading = false
        })
      })
  }

  beforeDestroy () {
    this.$store.commit('setFavorites', [])

    if (this.unsubscribe) this.unsubscribe()
  }

  deleteItem (item: Favorite) {
    this.selectedItem = item
    this.dialog = true
  }

  deleteItemConfirm () {
    if (this.selectedItem.id) {
      this.$store.dispatch('removeFavorite', this.selectedItem.id)
        .finally(() => {
          this.selectedItem.id = ''
          this.dialog = false
        })
    }
  }
}
</script>