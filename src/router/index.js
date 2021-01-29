import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/admin/Login'
import Home from '../components/Home'
import Blog from '../components/Blog'
import Types from '../components/Types'
import Tags from '../components/Tags'
import Archives from '../components/Archives'
import About from '../components/About'
import Blogs from '../components/admin/Blogs'
import PostBlogs from '../components/admin/PostBlogs'
import NotFound from '../components/NotFound'
import Types2 from '../components/admin/Types2'
import AddTypes from '../components/admin/AddTypes'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  { path: '/login', component: Login },
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
    path: '/Types2',
    name: 'Types2',
    component: Types2
  },
  {
    path: '/AddTypes',
    name: 'AddTypes',
    component: AddTypes
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

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 后端指定接口验证了token的正确性
  if (!tokenStr) return next('/login')
  next()
})
export default router
