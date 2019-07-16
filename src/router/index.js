import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import goods from '@/views/goods'
import ratings from '@/views/ratings'
import sellers from '@/views/sellers'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: sellers
    }
  ]
})
