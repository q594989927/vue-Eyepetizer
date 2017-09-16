import Vue from 'vue'
import Router from 'vue-router'
import selected from '@/components/selected'
import hot from '@/components/hot'
import follow from '@/components/follow'
import app from '../App.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: selected,
      redirect: selected
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
      path: '/follow',
      component: follow,
    },

  ]
})
