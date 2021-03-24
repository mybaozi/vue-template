import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index'
import Line from '@/pages/line';
import Modal from '@/pages/modal';
import Pic from '@/pages/pic'
import Draw from '@/pages/draw';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/line',
      name: 'Line',
      component: Line
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/pic',
      name: 'Pic',
      component: Pic
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    }
  ]
})
