import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

// 全局守卫
// router.beforeEach((to, from, next)=> {})
// router.afterEach((to, from)=> {})
// router.beforeResolve((to, from, next)=> {})

export default router
