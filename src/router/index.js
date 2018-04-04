import Vue from 'vue'
import Router from 'vue-router'
import forgotpassword from '@/components/forgotpassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'forgotpassword',
      component: forgotpassword
    }
  ]
})
