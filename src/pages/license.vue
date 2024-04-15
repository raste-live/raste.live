<template>
  <v-container>
    <v-card
      class="mx-auto my-16 py-8"
      max-width="1024"
    >
      <v-card-title class="text-h5 mb-2">
        오픈소스 라이선스
      </v-card-title>

      <v-card-subtitle class="mb-10">
        본 웹사이트에 활용된 오픈소스 소프트웨어의 라이선스 고지입니다.
      </v-card-subtitle>

      <v-row>
        <v-col v-for="library of libraries" cols="12" md="6" class="mb-5" :key="library.name">
          <v-btn
            class="ml-3 mb-1 text-subtitle-1 font-weight-bold"
            :href="library.repository"
            target="_blank"
            color="primary"
            variant="text"
            size="small"
          >
            {{ library.name.toUpperCase() }}
          </v-btn>
          <div class="mx-4 text-subtitle-1">
            {{ library.licenses }} LICENSE
          </div>
          <div class="mx-4 text-subtitle-2 text--secondary">
            {{ library.copyright }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  const libraries = [
    {
      "licenses": "MIT",
      "repository": "https://github.com/dmtrKovalenko/date-io",
      "name": "@date-io/date-fns",
      "copyright": "Copyright (c) 2017 Dmitriy Kovalenko"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/zloirock/core-js",
      "name": "core-js",
      "copyright": "Copyright (c) 2014-2024 Denis Pushkarev"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/date-fns/date-fns",
      "name": "date-fns",
      "copyright": "Copyright (c) 2021 Sasha Koss and Lesha Koss https://kossnocorp.mit-license.org"
    },
    {
      "licenses": "Apache-2.0",
      "repository": "https://github.com/firebase/firebase-js-sdk",
      "name": "firebase",
      "copyright": "Copyright (c) Google, Inc."
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/pinia",
      "name": "pinia",
      "copyright": "Copyright (c) 2019-present Eduardo San Martin Morote"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/socketio/socket.io-client",
      "name": "socket.io-client",
      "copyright": "Copyright (c) 2014 Guillermo Rauch"
    },
    {
      "licenses": "Apache-2.0",
      "repository": "https://github.com/Microsoft/TypeScript",
      "name": "typescript",
      "copyright": "Copyright © 2012-2024 Microsoft"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vitejs/vite",
      "name": "vite",
      "copyright": "Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/router",
      "name": "vue-router",
      "copyright": "Copyright (c) 2019-present Eduardo San Martin Morote"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/language-tools",
      "name": "vue-tsc",
      "copyright": "Copyright (c) 2021-present Johnson Chu"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuejs/core",
      "name": "vue",
      "copyright": "Copyright (c) 2018-present, Yuxi (Evan) You"
    },
    {
      "licenses": "MIT",
      "repository": "https://github.com/vuetifyjs/vuetify",
      "name": "vuetify",
      "copyright": "Copyright (c) 2016-2023 John Jeremy Leider"
    }
  ]
</script>
