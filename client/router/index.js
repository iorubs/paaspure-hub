import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

import '@/style/main.scss'

import Home from '@/components/home/home'
import Hub from '@/components/hub/hub.vue'
import Contact from '@/components/contact/contact'
import Instructions from '@/components/instructions/instructions'
import Details from '@/components/details/details.vue'
import Callback from '@/components/auth/callback'
import AuthService from '@/components/auth/utils'
import UserHub from '@/components/user-hub/user-hub.vue'

Vue.use(Router)
Vue.use(BootstrapVue)

const auth = new AuthService()

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/instructions',
      name: 'Instructions',
      component: Instructions
    },
    {
      path: '/hub',
      name: 'Hub',
      component: Hub
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/user-hub',
      name: 'UserHub',
      beforeEnter: auth.requireAuth,
      component: UserHub
    },
    {
      path: '/callback',
      component: Callback
    }
  ]
})
