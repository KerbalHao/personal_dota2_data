import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Detail from '../views/Home/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {tag: 'home'},
  },
  {
    path: '/home/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/items',
    name: 'Items',
    meta: {tag: 'items'},
    component: () => import('@/views/Items')
  },
  {
    path: '/mine',
    name: 'Mine',
    meta: {tag: 'mine'},
    component: () => import('@/views/Mine'),
  },
  {
    path: '/mine/login',
    name: 'Login',
    component: () => import('@/views/Mine/Login'),
  },
  {
    path: '/mine/register',
    name: 'Register',
    component: () => import('@/views/Mine/Register'),
  },
  {
    path:'/mine/favourite',
    name: 'Favourite',
    component: () => import('@/views/Mine/MyFavourite')
  },
  {
    path:'/mine/bought',
    name: 'Bought',
    component: () => import('@/views/Mine/MyBought')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
