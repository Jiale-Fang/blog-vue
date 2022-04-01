import router from "../../router";
import store from "../../store";
import Layout from "../../components/layout/AdminHome.vue";
import axios from "axios";
import Vue from "vue";
export function generaMenu () {
  axios.get("/api/server/menu/admin/listUserMenus").then(({ data }) => {
    if (data.flag) {
      const asyncRoutes = [
        {
          path: '/AdminHome',
          component: resolve => require(["@/components/layout/AdminHome.vue"], resolve),
          redirect: '/welcome',
          children: [
            { path: '/welcome', component: loadView("/admin/Welcome.vue") },
          ]
        }
      ]
      var userMenuList = data.data;
      userMenuList.forEach(item => {
        if (JSON.stringify(item.component) === "Layout") {
          item.component = Layout;
        }
        if (item.children && item.children.length > 0) {
          item.children.forEach(route => {
            asyncRoutes[0].children.push({
              path: route.path,
              component: loadView(route.component)
            })
          });
        }
      });
      // 加载用户菜单
      router.addRoutes(asyncRoutes);
      store.commit('saveAsyncRoutes', asyncRoutes)
      // 添加侧边栏菜单
      store.commit("saveUserMenuList", userMenuList);
    } else {
      Vue.prototype.$message.error("请先登录");
      router.push({ path: "/login" });
    }
  });
}

export const loadView = view => {
  // 路由懒加载
  return resolve => require([`@/views${view}`], resolve);
};
