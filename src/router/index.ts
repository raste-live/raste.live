import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Radio from '@/views/Radio.vue'
import Streaming from '@/views/Streaming.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/radio', name: 'radio', component: Radio },
  { path: '/streaming', name: 'streaming', component: Streaming },
  { path: '/', redirect: { name: 'radio' } },
  { path: '', redirect: { name: 'radio' } },
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
