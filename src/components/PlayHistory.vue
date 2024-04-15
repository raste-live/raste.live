<template>
  <v-card class="my-8">
    <v-toolbar>
      <v-app-bar-nav-icon icon="mdi-history"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-gugi ml-0">
        History
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

    <v-data-table
      :headers="headers"
      :items="musicPlayerStore.playHistory"
      :items-per-page="5"
      :search="search"
      :sort-by="[{ key: 'played_at', order: 'desc' }]"
      item-key="id"
      items-per-page-text="페이지 당 갯수"
    >
      <template v-slot:item.played_at="{ item }">
        {{ date.format(item.played_at, 'fullTime12h') }}
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
          <v-icon size="large" icon="mdi-note-multiple-outline" class="my-16"></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
  import { useDate } from 'vuetify'
  import { useMusicPlayerStore } from '@/stores/music-player'

  const date = useDate()
  const musicPlayerStore = useMusicPlayerStore()

  const headers = [
    { title: '곡제목', key: 'title', sortable: false },
    { title: '아티스트', key: 'artist', sortable: false },
    { title: '재생', key: 'played_at', sortable: false },
  ]

  const search = ref('')
</script>
