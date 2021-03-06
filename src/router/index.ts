import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/radio',
    name: 'radio',
    component: () => import('@/views/Radio.vue')
  },
  {
    path: '/streaming',
    name: 'streaming',
    component: () => import('@/views/Streaming.vue')
  },
  { path: '/', redirect: { name: 'radio' } },
  { path: '', redirect: { name: 'radio' } },
  { path: '*', redirect: { name: 'radio' } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
