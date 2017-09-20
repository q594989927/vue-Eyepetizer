import Vue from 'vue'
import Router from 'vue-router'
import selected from '@/components/selected'
import hot from '@/components/hot'
import category from '@/components/category'
import author from '@/components/author'
import follow from '@/components/follow'
import search from '@/components/search'
import app from '../App.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: selected,
      redirect: '/selected'
    },
    {
      path: '/selected',
      component: selected,
    },
    {
      path: '/hot',
      component: hot,
    },
    {
      path: '/category',
      component: category,
    },
    {
      path: '/author',
      component: author,
    },
    {
      path: '/follow',
      component: follow,
    },
    {
      path: '/search',
      component: search,
    },
  ]
})
