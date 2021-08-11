import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Home from '@/views/home/Home'
import Category from '@/views/category/Category'
import Cart from '@/views/cart/Cart'
import Profile from '@/views/profile/Profile'
import Detail from '@/views/detail/Detail'


const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    },
  ],
  mode: 'history'
})


export default router
