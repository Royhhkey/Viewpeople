import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/school'
  },
  {
    path: '/school',
    name: 'School',
    component: () => import('../views/SchoolView.vue'),
    meta: { title: '校级数据' }
  },
  {
    path: '/unit',
    name: 'Unit',
    component: () => import('../views/UnitView.vue'),
    meta: { title: '单位数据' }
  },
  {
    path: '/counselor',
    name: 'Counselor',
    component: () => import('../views/CounselorView.vue'),
    meta: { title: '辅导员数据' }
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('../views/TeacherView.vue'),
    meta: { title: '班导师数据' }
  },
  {
    path:'/detail',
    name: 'Detail',
    component: () => import('../views/DetailView.vue'),
    meta: { title: '详情' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router