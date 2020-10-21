import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'

export default [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    // 独享守卫
    // beforeEnter: (to, from, next) => {
    //   // ...
    // }
    meta: {
      title: 'layout'
    },
    children: [
      {
        path: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/argu/:name',
    name: 'argu',
    component: () => import ('@/views/Argu.vue'),
    props: true
    // props: {
    //   name: 'xxxxx'
    // },
    // props: route => ({
    //   name: route.params.name
    // })
  },
  {
    path: '/info',
    name: 'info',
    components: {
      default: () => import('@/views/default.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/count-up',
    name: 'count-up',
    component: () => import('@/views/count-up-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split-pane',
    component: () => import('@/views/split-pane-page.vue')
  },
  {
    path: '/render-page',
    name: 'render-page',
    component: () => import(/* webpackChunkName: "render-page" */'@/views/render-page.vue')
  },
  {
    path: '/render-page2',
    name: 'render-page2',
    component: () => import(/* webpackChunkName: "render-page2" */'@/views/render-page2.js')
  },
  {
    path: '/slot-scope',
    name: 'slot-scope',
    component: () => import('@/views/slot-scope-page.vue')
  },
  {
    path: '/recursive-page',
    name: 'recursive-page',
    component: () => import('@/views/recursive-page.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/redirect',
    // redirect: '/',
    // redirect: { name: 'home' },
    // redirect: to => '/',
    redirect: to => ({ name: 'home' })
  },
  {
    path: '*',
    component: () => import ('@/views/error.vue')
  }
]
