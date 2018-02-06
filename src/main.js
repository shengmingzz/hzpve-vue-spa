// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
// import App from './App'
import router from './router'
import store from './store'
import './config/rem'
import FastClick from 'fastclick'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.config.productionTip = false

// Sync Register Global Components
Vue.component('fallback', resolve => resolve(require('./components/fallback')))

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

// const whiteList = ['/login', '/home', '/infodetail', '/record'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
