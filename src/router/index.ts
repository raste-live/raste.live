/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => [
    {
      path: '/:pathMatch(.*)*', redirect: '/'
    },
    ...setupLayouts(routes)
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 })
    })
  }
})

export default router
