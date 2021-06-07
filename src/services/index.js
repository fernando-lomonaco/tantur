import axios from 'axios'
import AuthService from './auth'
import UserService from './users'
import CategoriesService from './categories'
import ProductsService from './products'
import router from '../router'
import { setGlobalLoading } from '../store/global'

// const API_ENVS = {
//   local: 'http://localhost:3000',
//   production: ''
// }

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API
})

httpClient.interceptors.request.use(config => {
  console.log('config', config)
  // if (config.data === undefined) {
  //   window.localStorage.removeItem('token')
  //   router.push({ name: 'Home' })
  // }

  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  console.log('error', error)
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  console.log('error', error)
  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient),
  categories: CategoriesService(httpClient),
  products: ProductsService(httpClient)
}
