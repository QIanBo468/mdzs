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
      path: '/myIndex',
      name: 'myIndex',
      component: resolve => require(['@/components/personalCenter/myIndex'], resolve),
      meta: {
        title: '我的'
      }
    },
    {
      path: '/my_Mill',
      name: 'my_Mill',
      component: resolve => require(['@/components/personalCenter/my_Mill'], resolve),
      meta: {
        title: '我的矿机'
      }
    },
    {
      path: '/my_recommend',
      name: 'my_recommend',
      component: resolve => require(['@/components/personalCenter/my_recommend'], resolve),
      meta: {
        title: '我的推荐'
      }
    },
    {
      path: '/my_team',
      name: 'my_team',
      component: resolve => require(['@/components/personalCenter/my_team'], resolve),
      meta: {
        title: '我的团队'
      }
    },
    {
      path: '/my_Address',
      name: 'my_Address',
      component: resolve => require(['@/components/personalCenter/my_Address'], resolve),
      meta: {
        title: '我的地址'
      }
    },
    {
      path: '/newAddress',
      name: 'newAddress',
      component: resolve => require(['@/components/personalCenter/newAddress'], resolve),
      meta: {
        title: '我的地址'
      }
    }
  ]
})
