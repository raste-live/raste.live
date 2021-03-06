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
        <v-card>
          <v-toolbar>
            <v-btn icon>
              <v-icon>mdi-discord</v-icon>
            </v-btn>
            <v-toolbar-title>Discord</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-switch
              v-model="toggleDiscord"
              hide-details 
              label=""
            ></v-switch>
          </v-toolbar>
          
          <v-responsive v-if="toggleDiscord" class="iframe-container" :aspect-ratio="16/9">
            <iframe class="responsive-iframe" src="https://titanembeds.com/embed/633670564774543361?defaultchannel=633670564774543363&lockscrollbar=true&theme=DiscordDark" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
          </v-responsive>
        </v-card>
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

@Component({
  components: { RadioPlayer, PlayHistory, Favorites },
  computed: { ...mapGetters({ user: "user" }) }
})
export default class Radio extends Vue {
  toggleDiscord = true
}
</script>