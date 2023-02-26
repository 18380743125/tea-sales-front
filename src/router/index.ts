import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router'
import { useMainStore } from '@/store/modules/main'
import { pinia } from '@/store'
import { useCartStore } from '@/store/modules/cart'

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
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页',
          cartBar: 2
        }
      },
      {
        path: 'category',
        component: () => import('@/views/category/Category.vue'),
        meta: {
          title: '分类',
          cartBar: 2
        }
      },
      {
        path: 'cart',
        component: () => import('@/views/cart/Cart.vue'),
        meta: {
          title: '购物车',
          cartBar: 1
        }
      },
      {
        path: 'profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: {
          title: '我的'
        }
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

const mainStore = useMainStore(pinia)
router.beforeEach((to) => {
  const { title } = to.meta
  if (title) mainStore.changeTitle(title as string)
  mainStore.cartBar = to.meta.cartBar as number
})

function registerRouter(app: App<Element>) {
  app.use(router)
}

export { router }

export default registerRouter
