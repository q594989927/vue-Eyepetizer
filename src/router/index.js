import Vue from 'vue'
import Router from 'vue-router'
import selected from '@/components/selected'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'selected',
      component: selected,
      redirect: '/selected',
      children: [
        {
          path: '/selected',
          component: selected,
        }
      ]
    }
  ]
})
