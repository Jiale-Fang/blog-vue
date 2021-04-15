import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from '../views/Blog'
import SearchModel from '../components/model/SearchModel'
// import Welcome from '../views/admin/Welcome'
// const Blog = () => import(/* webpackChunkName: "BW" */ '../views/Blog')
const Welcome = () => import(/* webpackChunkName: "BW" */ '../views/admin/Welcome')
const AdminHome = () => import(/* webpackChunkName: "BW" */ '../components/layout/AdminHome')

// import Users from '../views/admin/users/Users'
const Users = () => import(/* webpackChunkName: "Users" */ '../views/admin/users/Users')
const Comments = () => import(/* webpackChunkName: "Users" */ '../views/admin/users/Comments')

const Report = () => import(/* webpackChunkName: "dataWatch" */ '../views/admin/dataWatch/Report')
const Report2 = () => import(/* webpackChunkName: "dataWatch" */ '../views/admin/dataWatch/Report2')

const Login = () => import(/* webpackChunkName: "Login_NotFound" */ '../views/admin/Login.vue')
const NotFound = () => import(/* webpackChunkName: "Login_NotFound" */ '../views/NotFound.vue')
// import Login from '../components/admin/Login'
// /import NotFound from '../components/NotFound'
const Home = () => import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/Home.vue')
const Types = () => import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/type/Types.vue')
const Tags = () => import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/type/Tags.vue')
const Crawler = () => import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/crawler/Crawler.vue')
const CrawlerBlog = () => import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/crawler/CrawlerBlog.vue')

const Music = () => import(/* webpackChunkName: "Music" */ '../views/Music.vue')
const Playlists = () => import(/* webpackChunkName: "Music" */ '../views/music/Playlists.vue')
const Mvs = () => import(/* webpackChunkName: "Music" */ '../views/music/Mvs.vue')
const Songs = () => import(/* webpackChunkName: "Music" */ '../views/music/Songs.vue')
const Discovery = () => import(/* webpackChunkName: "Music" */ '../views/music/Discovery.vue')
const Result = () => import(/* webpackChunkName: "Music" */ '../views/music/Result.vue')
const Mv = () => import(/* webpackChunkName: "Music" */ '../views/music/Mv.vue')
const Playlist = () => import(/* webpackChunkName: "Music" */ '../views/music/Playlist.vue')

// import Home from '../components/Home'
// import Types from '../components/Types'
// import Tags from '../components/Tags'
const Link = () => import(/* webpackChunkName: "Archives_Link_message" */ '../views/Link.vue')
const Archives = () => import(/* webpackChunkName: "Archives_Link_message" */ '../views/Archives.vue')
const Message = () => import(/* webpackChunkName: "Archives_Link_message" */ '../views/Message.vue')

const About = () => import(/* webpackChunkName: "Backyard" */ '../views/backyard/About.vue')
const AI = () => import(/* webpackChunkName: "Backyard" */ '../views/backyard/AI.vue')

// import Archives from '../components/Archives'
// import About from '../components/About'
// const Blog = () => import(/* webpackChunkName: "Blog" */ '../components/Blog.vue')
const PostBlogs = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/PostBlogs.vue')
const Blogs = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/Blogs.vue')
const Types2 = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/Types2.vue')
const Tags2 = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/Tags2.vue')
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
    path: '/search',
    name: 'Search',
    component: SearchModel
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
    path: '/AI',
    name: 'AI',
    component: AI
  },
  {
    path: '/Crawler',
    name: 'Crawler',
    component: Crawler
  },
  {
    path: '/CrawlerBlog',
    name: 'CrawlerBlog',
    component: CrawlerBlog
  },
  {
    path: '/Music',
    name: 'Music',
    component: Music,
    children: [
      {
        // 发现音乐
        path: '/Discovery',
        component: Discovery
      },
      {
        // 推荐歌单
        path: '/Playlists',
        component: Playlists
      },
      {
        // 推荐歌单
        path: '/Playlist',
        component: Playlist
      },
      {
        // 最新音乐
        path: '/Songs',
        component: Songs
      },
      {
        // 最新音乐
        path: '/Mvs',
        component: Mvs
      },
      // mv详情
      {
        path: '/Mv',
        component: Mv
      },
      // 搜索结果页
      {
        path: '/Result',
        component: Result
      }
    ]
  },
  {
    path: '/AdminHome',
    component: AdminHome,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/comments', component: Comments },
      { path: '/PostBlogs', component: PostBlogs },
      { path: '/Blogs', component: Blogs },
      { path: '/tags2', component: Tags2 },
      { path: '/types2', component: Types2 },
      { path: '/report', component: Report },
      { path: '/report2', component: Report2 }
    ]
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
