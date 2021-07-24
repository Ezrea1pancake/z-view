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
  },
  {
    path: '/table1',
    name: 'table1',
    component: () => import('@/views/table/table1')
  },
  {
    path: '/table2',
    name: 'table2',
    component: () => import('@/views/table/table2')
  },
  {
    path: '/table3',
    name: 'table3',
    component: () => import('@/views/table/table3')
  },
  {
    path: '/table4',
    name: 'table4',
    component: () => import('@/views/table/table4')
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('@/views/tree')
  }
]
