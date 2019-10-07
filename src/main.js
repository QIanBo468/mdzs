// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/rem.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import Trancenter from './components/template/tran_nav/index'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$axios = api
import api from './utils/api'
// import VeeValidate from 'vee-validate';
// Vue.use(VeeValidate);
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'// 引入中文文件
// 配置中文
Validator.addLocale(zh)
const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldBags',  // 报冲突时 可自定义修改字段名称
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  locale: 'zh_CN', // 对语言（中文）的配置
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true
}
Vue.use(VeeValidate, config)

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      task_name: '任务名称',
      phone: '手机号',
      captcha: '验证码',
      account: '手机号',
      safeword: '支付密码',
      inviteCode: '邀请码',
      realName: '姓名',
      identity: '身份证号'
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('phones', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
  }
})
Validator.extend('password', {
  messages: {
    zh_CN: field => field + '密码必须由数字和字母组成6~20位'
  },
  validate: value => {
    return /^(\w){6,20}$/.test(value)
  }
})

Vue.prototype.$axios = api;
Vue.use(VueCookies)
Vue.use(Vant)
Vue.component('trannav', Trancenter)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
