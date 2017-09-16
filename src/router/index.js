import Vue from 'vue'
import Router from 'vue-router'
import selected from '@/components/selected'
import discovery from '@/components/discovery'
import follow from '@/components/follow'
import app from '../App.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: selected,
    },
    {
      path: '/selected',
      component: selected,
    },
    {
      path: '/discovery',
      component: discovery,
    },
    {
      path: '/follow',
      component: follow,
    },

  ]
})
