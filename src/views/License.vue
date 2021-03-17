<template>
  <v-container>
    <v-card class="mx-auto my-5" max-width="1024">
      <v-card-title class="text-h5 mb-2">
        오픈소스 라이선스
      </v-card-title>
      <v-card-subtitle class="mb-10">
        본 웹사이트에 사용된 오픈소스 소프트웨어의 라이선스에 대하여 고지합니다.
      </v-card-subtitle>

      <v-row>
        <v-col v-for="library of libraries" cols="12" md="6" class="mb-5" :key="library.name">
          <v-btn text class="ml-5 mb-1 text-h6" :href="library.repository" target="_blank" color="primary">
            {{ library.name }}
          </v-btn>
          <div class="ml-10 text-subtitle-1 font-weight-bold">
            {{ library.licenses }} LICENSE
          </div>
          <div class="ml-10 text-subtitle-2 text--secondary">
            {{ library.copyright }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class License extends Vue {

  libraries = [
    {
      "licenses": "MIT",
      "repository": "https://github.com/zloirock/core-js",
      "name": "core-js",
      "copyright": "Copyright (c) 2014-2021 Denis Pushkarev"
    },
    {
      "licenses": "Apache-2.0",
      "repository": "https://github.com/firebase/firebase-js-sdk",
      "name": "firebase",
      "copyright": "Copyright (c) Google, Inc."
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/yyx990803/register-service-worker",
      "name": "register-service-worker",
      "copyright": "Copyright (c) 2013-present, Yuxi (Evan) You"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/socketio/socket.io-client",
      "name": "socket.io-client",
      "copyright": "Copyright (c) 2014 Guillermo Rauch"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/vue-class-component",
      "name": "vue-class-component",
      "copyright": "Copyright (c) 2015-present Evan You"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/brockpetrie/vue-moment",
      "name": "vue-moment",
      "copyright": "Copyright (c) 2017 Brock Petrie"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/kaorun343/vue-property-decorator",
      "name": "vue-property-decorator",
      "copyright": "Copyright (c) 2018 kaorun343"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/vue-router",
      "name": "vue-router",
      "copyright": "Copyright (c) 2013-present Evan You"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/probil/vue-socket.io-extended",
      "name": "vue-socket.io-extended",
      "copyright": "Copyright (c) 2018 Max Lyashuk"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/vue",
      "name": "vue",
      "copyright": "Copyright (c) 2013-present, Yuxi (Evan) You"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuetifyjs/vuetify",
      "name": "vuetify",
      "copyright": "Copyright (c) 2016-2020 John Jeremy Leider"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/vuex",
      "name": "vuex",
      "copyright": "Copyright (c) 2015-present Evan You"
    }
  ]

}
</script>