import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/Register.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/home'
  }
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function registerRouter(app: App<Element>) {
  app.use(router)
}

export default registerRouter
