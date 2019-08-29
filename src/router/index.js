import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Password from '@/components/password'
import authentication from '@/components/authentication'
import register from '@/components/register'
import index from '@/components/index'
import tabbarBox from '@/components/tabbarBox'
import text from '@/components/text'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/password',
      name: 'Password',
      component: Password
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/tabbarBox',
      // redirect: '/tabbarBox/text',
      name: 'tabbarBox',
      component: tabbarBox
      // children: [
      //   {
      //     path: 'text',
      //     name: 'text',
      //     component: text
      //   }
      // ]
    }
  ]
})
