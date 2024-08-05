import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import NewItem from '@/views/NewItem.vue';
const routes = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: HomePage
  //   //  component: () => import('@/views/HomePage.vue'),
  // },
  {
    path: '/',
    redirect: '/Login'
  },

  {
    path: '/new',
    name: 'NewItem',
    component: NewItem,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/VLogin.vue'),
    
  },
  {
    path: '/info-device',
    name: 'InfoDevice',
    component: () => import('@/views/InfoDevice.vue'),
    
  },
  {
    path: '/testing',
    name: 'testing',
    component: () => import('@/views/VTesting.vue'),
    
  },
  {
    path: '/testingEss',
    name: 'testingEss',
    component: () => import('@/views/VtestingEss.vue'),
    
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/VHome.vue'),
    
  },
  {
    path: '/purchaseRequestList',
    name: 'PurchaseRequestList',
    component: () => import('@/views/purchaseRequest/VPurchaseRequestList.vue'),
    
  },
  {
    path: '/purchaseRequestListDetail',
    name: 'PurchaseRequestListDetail',
    component: () => import('@/views/purchaseRequest/VPurchaseRequestListDetail.vue'),
  },
  {
    path: '/userManagement',
    name: 'UserManagement',
    component: () => import('@/views/VUserManagement.vue'),
  },
  {
    path: '/userAccount',
    name: 'UserAccount',
    component: () => import('@/views/userAccount/VUserAccount.vue'),
  },
  {
    path: '/userAccountDetail',
    name: 'UserAccountDetail',
    component: () => import('@/views/userAccount/VUserAccountDetail.vue'),
  },
  {
    path: '/userReleasePr',
    name: 'UserReleasePr',
    component: () => import('@/views/userReleasePr/VUserReleasePr.vue'),
  },
  {
    path: '/userReleasePrDetail',
    name: 'UserReleasePrDetail',
    component: () => import('@/views/userReleasePr/VUserReleasePrDetail.vue'),
  },
  {
    path: '/userManagement',
    name: 'UserManagement',
    component: () => import('@/views/VUserManagement.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
