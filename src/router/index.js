import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Blog from '../components/Blog'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: Blog
  }
]

const router = new VueRouter({
  routes
})

export default router
