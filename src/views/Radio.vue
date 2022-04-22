<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <RadioPlayer />
      </v-col>

      <v-col cols="12">
        <PlayHistory />
      </v-col>

      <v-col cols="12">
        <Favorites v-if="user"/>
      </v-col>

      <v-col cols="12">
        <Discord />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import RadioPlayer from '@/components/RadioPlayer.vue'
import PlayHistory from '@/components/PlayHistory.vue'
import Favorites from '@/components/Favorites.vue'
import Discord from '@/components/Discord.vue'

@Component({
  components: { RadioPlayer, PlayHistory, Favorites, Discord },
  computed: { ...mapGetters({ user: "user" }) }
})
export default class Radio extends Vue {}
</script>
