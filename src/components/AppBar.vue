<template>
  <v-app-bar :elevation="3">
    <v-app-bar-nav-icon to="/">
      <v-img
        class="shrink"
        src="@/assets/logo.png"
        transition="scale-transition"
        width="40"
        contain />
    </v-app-bar-nav-icon>

    <v-toolbar-title class="font-gugi">
      raste.live
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn
          :icon="userStore.isLoggedIn ? 'mdi-account' : 'mdi-account-outline'"
          :color="userStore.isLoggedIn ? 'blue' : 'white'"
          v-bind="props"
        ></v-btn>
      </template>

      <v-card
        class="mx-auto"
        :max-width="640"
        :min-width="320"
        width="50%"
      >
        <template v-if="!userStore.isLoggedIn">
          <v-card-title class="font-gugi">
            LOGIN
          </v-card-title>

          <v-card-text>
            <v-btn
              block
              color="red"
              prepend-icon="mdi-google"
              size="large"
              @click="userStore.login"
            >
              구글 계정으로 로그인
            </v-btn>
          </v-card-text>
        </template>
        <template v-else>
          <v-card-title class="font-gugi mb-2">
            <v-icon class="mr-2" icon="mdi-google" color="red"></v-icon>
            {{ userStore.user?.email }}
          </v-card-title>

          <v-card-subtitle class="primary--text">
            {{ userStore.user?.uid }}
          </v-card-subtitle>

          <v-card-text>
            <v-btn
              block
              color="grey-darken-1"
              prepend-icon="mdi-logout-variant"
              size="large"
              @click="userStore.logout"
            >
              로그아웃
            </v-btn>
          </v-card-text>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            plain
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()

  const dialog = ref(false)
</script>
