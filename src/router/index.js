import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from '../components/Blog'
const Login = () => import(/* webpackChunkName: "Login_NotFound" */ '../components/admin/Login.vue')
const NotFound = () => import(/* webpackChunkName: "Login_NotFound" */ '../components/NotFound.vue')
// import Login from '../components/admin/Login'
// /import NotFound from '../components/NotFound'
const Home = () => import(/* webpackChunkName: "Home_Types_Tag" */ '../components/Home.vue')
const Types = () => import(/* webpackChunkName: "Home_Types_Tag" */ '../components/Types.vue')
const Tags = () => import(/* webpackChunkName: "Home_Types_Tag" */ '../components/Tags.vue')
// import Home from '../components/Home'
// import Types from '../components/Types'
// import Tags from '../components/Tags'
const Link = () => import(/* webpackChunkName: "Archives_About_Link_message" */ '../components/Link.vue')
const Archives = () => import(/* webpackChunkName: "Archives_About_Link_message" */ '../components/Archives.vue')
const About = () => import(/* webpackChunkName: "Archives_About_Link_message" */ '../components/About.vue')
const Message = () => import(/* webpackChunkName: "Archives_About_Link_message" */ '../components/Message.vue')
// import Archives from '../components/Archives'
// import About from '../components/About'
// const Blog = () => import(/* webpackChunkName: "Blog" */ '../components/Blog.vue')
const PostBlogs = () => import(/* webpackChunkName: "admin" */ '../components/admin/PostBlogs.vue')
const Blogs = () => import(/* webpackChunkName: "admin" */ '../components/admin/Blogs.vue')
const Types2 = () => import(/* webpackChunkName: "admin" */ '../components/admin/Types2.vue')
const AddTypes = () => import(/* webpackChunkName: "admin" */ '../components/admin/AddTypes.vue')
const Tags2 = () => import(/* webpackChunkName: "admin" */ '../components/admin/Tags2.vue')
// import PostBlogs from '../components/admin/PostBlogs'
// import Blogs from '../components/admin/Blogs'
// import Types2 from '../components/admin/Types2'
// import AddTypes from '../components/admin/AddTypes'
// import Tags2 from '../components/admin/Tags2'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'home' },
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
    path: '/Tags2',
    name: 'Tags2',
    component: Tags2
  },
  {
    path: '/Archives',
    name: 'Archives',
    component: Archives
  },
  {
    path: '/Link',
    name: 'Link',
    component: Link
  },
  {
    path: '/Message',
    name: 'message',
    component: Message
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
  if (!tokenStr && (to.path === '/blogs')) return next('/login')
  next()
})
export default router
