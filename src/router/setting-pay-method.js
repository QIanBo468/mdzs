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
]
