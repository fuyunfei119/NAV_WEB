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
      name: 'home',
      beforeEnter: (to,from,next) => {
        if (!to.query.hasOwnProperty('table')) {
          next();
        } else {
          next({ name : 'document', query: to.query, replace: true });
        }
      },
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
  ]
})


export default router

