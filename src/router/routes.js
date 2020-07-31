import Home from '@/views/Home.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
    // 独享守卫
    // beforeEnter: (to, from, next) => {
    //   // ...
    // }
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
      default: () => import('@/views/About.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/render-page',
    name: 'render-page',
    component: () => import(/* webpackChunkName: "render-page" */'@/views/render-page.vue')
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
