import Layout from '@/views/layout.vue'

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        // 独享守卫
        // beforeEnter: (to, from, next) => {
        //   // ...
        // },
        meta: {
          title: '首页',
          icon: 'ios-home'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: {
          title: '关于',
          icon: 'ios-desktop'
        }
      },
      {
        path: 'color',
        name: 'color',
        component: () => import(/* webpackChunkName: "color" */ '@/views/Color.vue'),
        meta: { title: '颜色', icon: 'ios-desktop' },
        children: [
          {
            path: 'red',
            name: 'color/red',
            component: () => import(/* webpackChunkName: "color" */ '@/views/Red.vue'),
            meta: { title: '红色' }
          },
          {
            path: 'green',
            name: 'color/green',
            component: () => import(/* webpackChunkName: "color" */ '@/views/Green.vue'),
            meta: { title: '绿色' },
            children: [
              {
                path: 'test',
                name: 'color/green/test',
                component: () => import(/* webpackChunkName: "color" */ '@/views/Test.vue'),
                meta: { title: '测试' }
              }
            ]
          }
        ]
      }
      // {
      //   path: 'argu/:name',
      //   name: 'argu',
      //   component: () => import ('@/views/Argu.vue'),
      //   props: true
      //   // props: {
      //   //   name: 'xxxxx'
      //   // },
      //   // props: route => ({
      //   //   name: route.params.name
      //   // })
      // },
      // {
      //   path: 'info',
      //   name: 'info',
      //   components: {
      //     default: () => import('@/views/default.vue'),
      //     email: () => import('@/views/email.vue'),
      //     tel: () => import('@/views/tel.vue')
      //   }
      // },
      // {
      //   path: 'count-up',
      //   name: 'count-up',
      //   component: () => import('@/views/count-up-page.vue')
      // },
      // {
      //   path: 'split-pane',
      //   name: 'split-pane',
      //   component: () => import('@/views/split-pane-page.vue')
      // },
      // {
      //   path: 'render-page',
      //   name: 'render-page',
      //   component: () => import(/* webpackChunkName: "render-page" */'@/views/render-page.vue')
      // },
      // {
      //   path: 'render-page2',
      //   name: 'render-page2',
      //   component: () => import(/* webpackChunkName: "render-page2" */'@/views/render-page2.js')
      // },
      // {
      //   path: 'slot-scope',
      //   name: 'slot-scope',
      //   component: () => import('@/views/slot-scope-page.vue')
      // },
      // {
      //   path: 'recursive-page',
      //   name: 'recursive-page',
      //   component: () => import('@/views/recursive-page.vue')
      // },
      // {
      //   path: 'redirect',
      //   // redirect: '/',
      //   // redirect: { name: 'home' },
      //   // redirect: to => '/',
      //   redirect: to => ({ name: 'home' })
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    component: () => import ('@/views/error.vue')
  }
]
