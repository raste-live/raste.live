<template>
  <v-app>
    <Appbar/>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <BottomNavigation />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Appbar from '@/components/Appbar.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'

@Component({
  components: { Appbar, BottomNavigation }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/assets/app.scss';

#app .v-bottom-navigation .v-btn {
  height: inherit !important;
  background-color: transparent !important;
  min-width: 80px !important;
}
</style>