import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import "./router/permission"

import './assets/css/common.css'


// 引用eventBus
import './utils/eventBus'

import VueRouter from 'vue-router'

// vue 国际化
import i18n from "./plugins/i18n.js"

import { initProject } from "./utils/init"
initProject();  // 初始化  引入本地存储



Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// 守卫重定向  next()
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}