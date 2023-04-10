import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import CardView from '../views/CardView.vue'
import DocumentView from '../views/DocumentView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/card',
      name: 'card',
      component: CardView
    },
    {
      path: '/document',
      name: 'document',
      component: DocumentView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

