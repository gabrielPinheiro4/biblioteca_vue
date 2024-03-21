import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/livros',
    name: 'book',
    component: () => import('../views/BookView.vue')
  },
  {
    path: '/usuarios',
    name: 'users',
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/emprestimodevolucao',
    name: 'loan',
    component: () => import('../views/LoanDevolutionView.vue')
  },
  {
    path: '/historico',
    name: 'historico',
    component: () => import('../views/HistoricView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
