import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home/index.vue')
const Dashboard = () => import('../views/Dashboard/index.vue')
const Categories = () => import('../views/Categories/index.vue')
const Products = () => import('../views/Products/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // '/'
  routes
})

export default router
