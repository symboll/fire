const routes = [
  {
    path: '/',
    name: 'points_waves',
    component: () => import('@/views/pointsWaves.vue')
  },
  {
    path: '/lesson1',
    name: 'lesson1',
    component: () => import('@/views/lesson1.vue')
  },
  {
    path: '/lesson2',
    name: 'lesson2',
    component: () => import('@/views/lesson2.vue')
  },
  {
    path: '/lesson3',
    name: 'lesson3',
    component: () => import('@/views/lesson3.vue')
  },
  {
    path: '/lesson4',
    name: 'lesson4',
    component: () => import('@/views/lesson4.vue')
  },
  {
    path: '/lesson5',
    name: 'lesson5',
    component: () => import('@/views/lesson5.vue')
  }
]

export default routes
