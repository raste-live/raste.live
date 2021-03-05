<template>
  <v-app-bar app dark>
    <v-app-bar-nav-icon>
      <v-img
        class="shrink"
        contain
        :src="require('@/assets/logo.png')"
        transition="scale-transition"
        width="40" />
    </v-app-bar-nav-icon>

    <v-toolbar-title class="font-gugi">
      raste.live
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-dialog
      v-model="dialog"
      max-width="480px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>{{ user ? 'mdi-account' : 'mdi-account-outline' }}</v-icon>
        </v-btn>
      </template>

      <v-card
        class="mx-auto"
        max-width="480">
        <template v-if="!user">
          <v-card-title class="font-gugi">
            LOGIN
          </v-card-title>
          <v-card-text>
            <v-btn block color="red" @click="signInWithGoogle">
              <v-icon class="mr-2">mdi-google</v-icon>
              구글 계정으로 로그인
            </v-btn>
          </v-card-text>
        </template>
        <template v-else>
          <v-card-title class="font-gugi mb-2">
            <v-icon class="mr-2">mdi-google</v-icon>
            {{ user.email }}
          </v-card-title>

          <v-card-subtitle class="primary--text">
            {{ user.uid }}
          </v-card-subtitle>

          <v-card-text>
            <v-btn block @click="signOut" color="secondary">
              <v-icon class="mr-2">mdi-logout-variant</v-icon>
              로그아웃
            </v-btn>
          </v-card-text>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab to="/radio">
          <v-icon class="mr-2">mdi-music-note</v-icon>
          Radio
        </v-tab>
        <v-tab to="/streaming">
          <v-icon class="mr-2">mdi-television-play</v-icon>
          Streaming
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({ computed: { ...mapGetters({ user: "user" }) } })
export default class Appbar extends Vue {
  dialog = false

  signInWithGoogle () {
    this.$store.dispatch('signInWithGoogle')
  }

  signOut () {
    this.$store.dispatch('signOut')
  }
}
</script>
