import Vue from 'vue'
import Router from 'vue-router'
import FBSignInButton from 'vue-facebook-signin-button'

import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'

import '@/assets/bootstrap/css/bootstrap.min.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '@/assets/bootstrap/js/jquery.js'
import '@/assets/bootstrap/js/bootstrap.min.js'

Vue.use(Router)
Vue.use(FBSignInButton)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      beforeEnter: (to, from, next) => {
        if (!localStorage.qwerty) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})
