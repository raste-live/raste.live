<template>
  <v-card>
    <v-toolbar>
      <v-btn icon>
        <v-icon>
          mdi-heart
        </v-icon>
      </v-btn>
      <v-toolbar-title class="font-gugi">
        Favorites
      </v-toolbar-title>

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
      sort-by="created_at"
      :sort-desc="true">
      <template v-slot:item.created_at="{ item }">
        {{ item.created_at.seconds | moment('LLL') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="deleteItem(item)">
          mdi-close
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-icon large class="my-8">mdi-heart-multiple-outline</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="mb-2">선택한 곡을 목록에서 지우시겠습니까?</v-card-title>
        <v-card-subtitle v-if="selectedItem">
          {{ selectedItem.title }} - {{ selectedItem.artist }}
        </v-card-subtitle>
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
import firebase from 'firebase/app'

@Component
export default class Favorites extends Vue {
  
  favorites: Favorite[] = []

  headers = [
    { text: '곡제목', value: 'title' },
    { text: '아티스트', value: 'artist' },
    { text: '등록일시', value: 'created_at' },
    { text: '', value: 'actions', sortable: false },
  ]

  loading = true
  dialog = false

  search = ''

  selectedItem?: Favorite
  unsubscribe?: CallableFunction

  mounted () {
    this.$store.dispatch('favorites')
      .then((favoriteRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>) => {
        this.unsubscribe = favoriteRef.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const favorite = change.doc.data() as Favorite

            if (change.type === "added") {
              this.favorites.push(favorite)
            } else {
              const index = this.favorites.findIndex((item) => item.id == favorite.id)

              if (index == -1) {
                // PASS
              } else if (change.type === "modified") {
                this.favorites[index] = favorite
              } else if (change.type === "removed") {
                this.favorites.splice(index, 1)
              }
            }

            this.loading = false
          })
        })
      })
  }

  beforeDestroy () {
    if (this.unsubscribe) this.unsubscribe()
  }

  deleteItem (item: Favorite) {
    this.selectedItem = item
    this.dialog = true
  }

  deleteItemConfirm () {
    if (this.selectedItem) {
      this.$store.dispatch('removeFavorite', this.selectedItem.id)
        .finally(() => {
          this.selectedItem = undefined
          this.dialog = false
        })
    }
  }
}
</script>