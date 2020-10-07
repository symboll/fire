
/**
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { setTitle, setToken, getToken } from '@/lib/util'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes
})

// 全局守卫
// router.beforeEach((to, from, next)=> {})
// router.afterEach((to, from)=> {})
// router.beforeResolve((to, from, next)=> {})

router.beforeEach((to, from, next) => {
  setTitle(to.meta)
  const token = getToken()
  if (token && token !== '') {
    store.dispatch('authorization').then(() => {
      if (to.name === 'login') {
        next({ name: 'home' })
      } else { next() }
    }).catch(_ => {
      setToken('')
      if (from.name !== 'login') next({ name: 'login' })
    })
  } else {
    if (to.name === 'login') next()
    else next({ name: 'login' })
  }
})
export default router
