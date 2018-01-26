import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

const hdyj = r => require.ensure([], () => r(require('@/page/hdyj/hdyj')), 'hdyj')
const jjc = r => require.ensure([], () => r(require('@/page/jjc/jjc')), 'jjc')
const mxzl = r => require.ensure([], () => r(require('@/page/mxzl/mxzl')), 'mxzl')
const yhjt = r => require.ensure([], () => r(require('@/page/yhjt/yhjt')), 'yhjt')
const xzsl = r => require.ensure([], () => r(require('@/page/xzsl/xzsl')), 'xzsl')
const yxtj = r => require.ensure([], () => r(require('@/page/yxtj/yxtj')), 'yxtj')
const hero = r => require.ensure([], () => r(require('@/page/hero/hero')), 'hero')

const jjclocal = r => require.ensure([], () => r(require('@/page/jjc/jjclocal')), 'jjclocal')
const hdyjlocal = r => require.ensure([], () => r(require('@/page/hdyj/hdyjlocal')), 'hdyjlocal')
const xzsllocal = r => require.ensure([], () => r(require('@/page/xzsl/xzsllocal')), 'xzsllocal')
const mxzllocal = r => require.ensure([], () => r(require('@/page/mxzl/mxzllocal')), 'mxzllocal')
const yxtjlocal = r => require.ensure([], () => r(require('@/page/yxtj/yxtjlocal')), 'yxtjlocal')
const herolocal = r => require.ensure([], () => r(require('@/page/hero/herolocal')), 'herolocal')
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    meta: [],
    children: [
      // hdyj
      {path: '/hdyj', component: hdyj},
      // jjc
      {path: '/jjc', component: jjc},
      // mxzl
      {path: '/mxzl', component: mxzl},
      // yhjt
      {path: '/yhjt', component: yhjt},
      // xzsl
      {path: '/xzsl', component: xzsl},
      // yxtj
      {path: '/yxtj', component: yxtj},
      // hero
      {path: '/hero', component: hero},

      // jjclocal
      {path: '/jjclocal', component: jjclocal},
      // jjclocal
      {path: '/hdyjlocal', component: hdyjlocal},
      // yxtjlocal
      {path: '/yhjtlocal', component: yhjt},
      // xzsllocal
      {path: '/xzsllocal', component: xzsllocal},
      // mxzllocal
      {path: '/mxzllocal', component: mxzllocal},
      // yxtjlocal
      {path: '/yxtjlocal', component: yxtjlocal},
      // herolocal
      {path: '/herolocal', component: herolocal},
      // home
      {path: '/home', component: home}
    ]
  }
]

export default new Router({
  routes,
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})
