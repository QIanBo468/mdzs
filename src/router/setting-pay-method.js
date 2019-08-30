export default [
  {
    path: '/setting', // 设置
    name: 'setting',
    component: resolve => require(['@/components/personalCenter/setting'], resolve),
  },
  {
    path: '/settingChangeNickName', // 设置 -> 修改昵称
    name: 'settingChangeNickName',
    component: resolve => require(['@/components/personalCenter/settingChangeNickName'], resolve),
  },
  {
    path: '/settingAboutUs', // 设置 -> 关于我们
    name: 'settingAboutUs',
    component: resolve => require(['@/components/personalCenter/settingAboutUs'], resolve),
  },
  {
    path: '/myPaymentMethods', // 我的收款方式
    name: 'myPaymentMethods',
    component: resolve => require(['@/components/personalCenter/myPaymentMethods'], resolve),
  },
  {
    path: '/myPaymentMethodsBinding', // 我的收款方式 -> 绑定
    name: 'myPaymentMethodsBinding',
    component: resolve => require(['@/components/personalCenter/myPaymentMethodsBinding'], resolve),
  },
]
