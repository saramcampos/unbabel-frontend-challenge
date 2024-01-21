import { createRouter, createWebHistory } from 'vue-router'
import Transcriptions from '../views/Transcriptions/Transcriptions.vue'
import ErrorPage from '../views/ErrorPage/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'transcriptions',
      component: Transcriptions
    },
    {
      path: "/errorPage",
      name: "ErrorPage",
      component: ErrorPage
    },
    {
      path: '/:catchAll(.*)',
      component: ErrorPage,
      beforeEnter: (to, from, next) => {
          next({ path: '/ErrorPage', query: { responseCode: '404' } })
      }
    }
  ]
})

export default router
