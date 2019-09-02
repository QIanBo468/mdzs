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
import charge from '@/components/index/charge'
import extract from '@/components/index/extract'
import transfer from '@/components/index/transfer'
import ofc from '@/components/index/ofc'
import exchange from '@/components/index/exchange'
import ofcTransfer from '@/components/index/ofcTransfer'
import fund from '@/components/index/fund'
import fundTransfer from '@/components/index/fundTransfer'
import ofcRecord from '@/components/index/ofcRecord'
import transferRecord from '@/components/index/transferRecord'
import conversion from '@/components/index/conversion'
import topUp from '@/components/index/topUp'
import address from '@/components/index/address'
import mall from '@/components/mall'
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
      path: '/charge',
      name: 'charge',
      component: charge
    },
    {
      path: '/extract',
      name: 'extract',
      component: extract
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: transfer
    },
    {
      path: '/ofc',
      name: 'ofc',
      component: ofc
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange
    },
    {
      path: '/ofcTransfer',
      name: 'ofcTransfer',
      component: ofcTransfer
    },
    {
      path: '/fund',
      name: 'fund',
      component: fund
    },
    {
      path: '/fundTransfer',
      name: 'fundTransfer',
      component: fundTransfer
    },
    {
      path: '/ofcRecord',
      name: 'ofcRecord',
      component: ofcRecord
    },
    {
      path: '/transferRecord',
      name: 'transferRecord',
      component: transferRecord
    },
    {
      path: '/conversion',
      name: 'conversion',
      component: conversion
    },
    {
      path: '/topUp',
      name: 'topUp',
      component: topUp
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/',
      redirect: '/tabbarBox'
    },
    {
      path: '/tabbarBox',
      name: 'tabbarBox',
      component: tabbarBox,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: '/mall',
          name: 'mall',
          component: mall
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
    }
  ]
})
