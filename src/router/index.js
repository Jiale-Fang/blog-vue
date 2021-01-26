import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Blog from '../components/Blog'
import Types from '../components/Types'
import Tags from '../components/Tags'
import Archives from '../components/Archives'
import About from '../components/About'
import Blogs from '../components/admin/Blogs'
import PostBlogs from '../components/admin/PostBlogs'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/Types',
    name: 'Types',
    component: Types
  },
  {
    path: '/Tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/Archives',
    name: 'Archives',
    component: Archives
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/Blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/PostBlogs',
    name: 'PostBlogs',
    component: PostBlogs
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
