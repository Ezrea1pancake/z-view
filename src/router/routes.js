export const routes = [
  {
    path: '/test-emitter',
    name: 'testEmitter',
    component: () => import('@/views/test-emitter')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/form')
  },
  {
    path: '/display',
    name: 'display',
    component: () => import('@/views/display')
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import('@/views/alert')
  }
]
