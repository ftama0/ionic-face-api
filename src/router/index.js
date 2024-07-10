import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import NewItem from '@/views/NewItem.vue';
import Login from '@/views/Login.vue';
import Testing from '@/views/Testing.vue';
import InfoDevice from '@/views/InfoDevice.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
    //  component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/new',
    name: 'NewItem',
    component: NewItem,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/info-device',
    name: 'InfoDevice',
    component: InfoDevice,
  },
  {
    path: '/testing',
    name: 'testing',
    component: Testing,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
