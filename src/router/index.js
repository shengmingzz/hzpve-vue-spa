import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

// const hdyj = r => require.ensure([], () => r(require('@/page/hdyj/hdyj')), 'pve')
// const jjc = r => require.ensure([], () => r(require('@/page/jjc/jjc')), 'pve')
// const mxzl = r => require.ensure([], () => r(require('@/page/mxzl/mxzl')), 'pve')
// const yhjt = r => require.ensure([], () => r(require('@/page/yhjt/yhjt')), 'pve')
// const xzsl = r => require.ensure([], () => r(require('@/page/xzsl/xzsl')), 'pve')
// const yxtj = r => require.ensure([], () => r(require('@/page/yxtj/yxtj')), 'pve')
// const hero = r => require.ensure([], () => r(require('@/page/hero/hero')), 'pve')
//
// const jjclocal = r => require.ensure([], () => r(require('@/page/jjc/jjclocal')), 'pvelocal')
// const hdyjlocal = r => require.ensure([], () => r(require('@/page/hdyj/hdyjlocal')), 'pvelocal')
// const xzsllocal = r => require.ensure([], () => r(require('@/page/xzsl/xzsllocal')), 'pvelocal')
// const mxzllocal = r => require.ensure([], () => r(require('@/page/mxzl/mxzllocal')), 'pvelocal')
// const yxtjlocal = r => require.ensure([], () => r(require('@/page/yxtj/yxtjlocal')), 'pvelocal')
// const herolocal = r => require.ensure([], () => r(require('@/page/hero/herolocal')), 'pvelocal')
// const home = r => require.ensure([], () => r(require('@/page/home/home')), 'pvelocal')

const hdyj = r => require.ensure([], () => r(require('@/page/hdyj/hdyj')), 'hdyj')
const jjc = r => require.ensure([], () => r(require('@/page/jjc/jjc')), 'jjc')
const mxzl = r => require.ensure([], () => r(require('@/page/mxzl/mxzl')), 'mxzl')
const yhjt = r => require.ensure([], () => r(require('@/page/yhjt/yhjt')), 'yhjt')
const xzsl = r => require.ensure([], () => r(require('@/page/xzsl/xzsl')), 'xzsl')
const yxtj = r => require.ensure([], () => r(require('@/page/yxtj/yxtj')), 'yxtj')
const hero = r => require.ensure([], () => r(require('@/page/hero/hero')), 'hero')

// pve local
const jjclocal = r => require.ensure([], () => r(require('@/page/jjc/jjclocal')), 'jjclocal')
const hdyjlocal = r => require.ensure([], () => r(require('@/page/hdyj/hdyjlocal')), 'hdyjlocal')
const xzsllocal = r => require.ensure([], () => r(require('@/page/xzsl/xzsllocal')), 'xzsllocal')
const mxzllocal = r => require.ensure([], () => r(require('@/page/mxzl/mxzllocal')), 'mxzllocal')
const yxtjlocal = r => require.ensure([], () => r(require('@/page/yxtj/yxtjlocal')), 'yxtjlocal')
const herolocal = r => require.ensure([], () => r(require('@/page/hero/herolocal')), 'herolocal')

// pvp local
const pvpmain = r => require.ensure([], () => r(require('@/page/game/pvpmain')), 'pvpmain')
const pvemain = r => require.ensure([], () => r(require('@/page/game/pvemain')), 'pvemain')
const pvphero = r => require.ensure([], () => r(require('@/page/game/pvphero')), 'pvphero')
const pvpheroitem = r => require.ensure([], () => r(require('@/page/game/pvpheroitem')), 'pvpheroitem')
const pvpitem = r => require.ensure([], () => r(require('@/page/game/pvpitem')), 'pvpitem')
const itemdetail = r => require.ensure([], () => r(require('@/page/game/pvpitemdetail')), 'itemdetail')

// info
const infomain = r => require.ensure([], () => r(require('@/page/info/infomain')), 'infomain')
const infodetail = r => require.ensure([], () => r(require('@/page/info/infodetail')), 'infodetail')

// tv
const tvmain = r => require.ensure([], () => r(require('@/page/tv/tvmain')), 'tvmain')

// forum
const forummain = r => require.ensure([], () => r(require('@/page/forum/forummain')), 'forummain')
const forumdetail = r => require.ensure([], () => r(require('@/page/forum/forumdetail')), 'forumdetail')

// root
const root = r => require.ensure([], () => r(require('@/page/home/root')), 'root')
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect: '/root',
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
      {path: '/jjclocal', component: jjclocal, meta: { keepAlive: true, title: '竞技场' }},
      // jjclocal
      {path: '/hdyjlocal', component: hdyjlocal, meta: { keepAlive: true, title: '竞技场' }},
      // yxtjlocal
      {path: '/yhjtlocal', component: yhjt, meta: { keepAlive: true, title: '英魂祭坛' }},
      // xzsllocal
      {path: '/xzsllocal', component: xzsllocal, meta: { keepAlive: true, title: '星座试炼' }},
      // mxzllocal
      {path: '/mxzllocal', component: mxzllocal, meta: { keepAlive: true, title: '冒险之旅' }},
      // yxtjlocal
      {path: '/yxtjlocal', component: yxtjlocal, meta: { keepAlive: true, title: '英雄图鉴' }},
      // herolocal
      {path: '/herolocal', component: herolocal, meta: { title: '英雄详情' }},
      // home
      {path: '/home', component: home},
      {path: '/root', component: root},
      // pvp
      {path: '/pvpmain', component: pvpmain, meta: { keepAlive: true, title: 'pvp' }}, // pvpmain
      {path: '/pvemain', component: pvemain, meta: { keepAlive: true, title: 'pve' }}, // pvemain
      {path: '/pvphero', component: pvphero, meta: { keepAlive: true, title: 'pvp英雄' }}, // pvphero
      {path: '/pvphero/:id', component: pvpheroitem, meta: { title: 'pvp英雄详情' }},
      {path: '/pvpitem', component: pvpitem, meta: { keepAlive: true, title: 'pvp物品' }}, // pvpitem
      {path: '/pvpitem/:id', component: itemdetail, meta: { title: 'pvp物品详情' }},

      // info
      {path: '/infomain', component: infomain, meta: { keepAlive: true, title: '资讯' }},
      {path: '/infodetail/:id', component: infodetail, meta: { title: '资讯详情' }},

      // tv
      {path: '/tvmain', component: tvmain, meta: { keepAlive: true, title: '直播' }},

      // forum
      {path: '/forummain', component: forummain, meta: { keepAlive: true, title: '贴吧' }},
      {path: '/forumdetail/:id', component: forumdetail, meta: { title: '帖子详情' }}
    ]
  }
]

export default new Router({
  routes,
  // mode: 'history',
  // base: '/static/pve/',
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
