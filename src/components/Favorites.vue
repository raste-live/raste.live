<template>
  <v-card class="my-8">
    <v-toolbar>
      <v-app-bar-nav-icon color="red" icon="mdi-heart"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi ml-0">
        Favorites
      </v-toolbar-title>
    </v-toolbar>

    <v-text-field
      v-model="search"
      class="mx-3 my-2"
      label="검색"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>

    <v-skeleton-loader
      v-if="favoriteStore.isLoading"
      v-bind="{ boilerplate: true }"
      type="table"
      :loading="favoriteStore.isLoading"
    ></v-skeleton-loader>

    <v-data-table
      v-else
      :headers="headers"
      :items="favoriteStore.favorites"
      :items-per-page="5"
      :search="search"
      item-key="id"
      items-per-page-text="페이지 당 갯수"
      :sort-by="[{ key: 'created_at', order: 'desc' }]"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="deleteItem(item)"
        ></v-btn>
      </template>

      <template v-slot:no-data>
        <div
          v-if="search"
          class="my-16"
        >
          "{{ search }}"<br/>
          검색어와 일치하는 곡이 없습니다.
        </div>
        <div v-else>
          <v-icon size="large" icon="mdi-heart-multiple-outline" class="my-16"></v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="mb-2">
          선택한 곡을 좋아요 목록에서 지우시겠습니까?
        </v-card-title>

        <v-card-subtitle>
          {{ date.format(selectedItem?.created_at.toDate(), 'fullDateWithWeekday') }}
          {{ date.format(selectedItem?.created_at.toDate(), 'fullTime12h') }}
        </v-card-subtitle>

        <v-card-text>
          {{ selectedItem?.title }} - {{ selectedItem?.artist }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="deleteItemConfirm"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
  import { useDate } from 'vuetify'
  import { useFavoriteStore } from '@/stores/favorite'
  import type { Favorite } from '@/stores/favorite'

  const date = useDate()
  const favoriteStore = useFavoriteStore()

  const headers = [
    { title: '곡제목', key: 'title', sortable: false },
    { title: '아티스트', key: 'artist', sortable: false },
    { title: '', key: 'actions', sortable: false }
  ]

  const search = ref('')
  const dialog = ref(false)
  const selectedItem = ref<Favorite | null>(null)

  onMounted(() => {
    favoriteStore.initFavorites()
  })

  onUnmounted(() => {
    favoriteStore.disposeFavorites()
  })

  function deleteItem (item: Favorite) {
    dialog.value = true
    selectedItem.value = item
  }

  function deleteItemConfirm () {
    if (selectedItem.value?.id) {
      favoriteStore.removeFavorite(selectedItem.value.id)

      selectedItem.value = null
      dialog.value = false
    }
  }
</script>
