import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HouseDetails from '../views/HouseDetails.vue'
import CreateHouse from '../views/CreateHouse.vue'
import EditHouse from '../views/EditHouse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/houses',
      name: 'houses',
      component: HomeView
    },
    {
      path: '/houses/create',
      name: 'createHouse',
      component: CreateHouse,
      props: true
    },
    {
      path: '/houses/:id',
      name: 'houseDetail',
      component: HouseDetails,
      props: true
    },
    {
      path: '/houses/:id/edit',
      name: 'editDetail',
      component: EditHouse,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
