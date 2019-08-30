import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Password from '@/components/password'
import authentication from '@/components/authentication'
import register from '@/components/register'
import index from '@/components/index'
import tabbarBox from '@/components/tabbarBox'
import text from '@/components/text'
import notice from '@/components/index/notice'
import noticeDetails from '@/components/index/noticeDetails'
import earnings from '@/components/index/earnings'
import earningsList from '@/components/index/earningsList'
import wallet from '@/components/index/wallet'
import usdt from '@/components/index/usdt'
import charge from '@/components/index/'
Vue.use(Router)

import settingRoutes from "./setting-pay-method.js"

export default new Router({
  routes: [
    ...settingRoutes,

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
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/noticeDetails',
      name: 'noticeDetails',
      component: noticeDetails
    },
    {
      path: '/earnings',
      name: 'earnings',
      component: earnings
    },
    {
      path: '/earningsList',
      name: 'earningsList',
      component: earningsList
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '/usdt',
      name: 'usdt',
      component: usdt
    },

    {
      path: '/tabbarBox',
      // redirect: '/tabbarBox/text',
      name: 'tabbarBox',
      component: tabbarBox,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: 'text',
          name: 'text',
          component: text
        }
      ]
    },

    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(['@/components/transaction/payment'], resolve),
      meta: {
        title: '付款'
      }
    },
    {
      path: '/hangon',
      name: 'hangon',
      component: resolve => require(['@/components/transaction/hangon'], resolve),
      meta: {
        title: '挂买'
      }
    },
    {
      path: '/mytrans',
      name: 'mytrans',
      component: resolve => require(['@/components/transaction/mytrans'], resolve),
      meta: {
        title: '我的交易'
      }
    }
  ]
})
