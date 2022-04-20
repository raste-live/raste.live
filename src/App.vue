<template>
  <v-app>
    <Appbar/>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Appbar from '@/components/Appbar.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: { Appbar, Footer }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/assets/app.scss';
</style>
