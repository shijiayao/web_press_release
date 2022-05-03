import Store from '@/store/index.js';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/login/login-page.vue';
import LayoutMain from '@/components/layout/layout-main.vue';
import navList from './nav-list.js';

const childrenArray = [];
const Group_Admin = []; // 管理员
const Group_ordinary = []; // 普通用户
const Group_Level_10000 = []; // 公用组
const Group_Level_20000 = []; // 游客
const Group_Unlimited = []; // 没有权限限制

navList.forEach((element) => {
  let groupArray = [];

  if (element.level < 1000) {
    groupArray = Group_Admin;
  } else if (element.level < 10000) {
    groupArray = Group_ordinary;
  } else if (element.level < 20000) {
    groupArray = Group_Level_10000;
  } else {
    groupArray = Group_Level_20000;
  }

  groupArray.push(element.path);

  childrenArray.push({
    name: element.name,
    path: element.path,
    component: element.component,
    meta: { title: element.title, keepAlive: false },
    redirect: element.redirect,
    children: formatChildren(element.children, groupArray)
  });
});

function formatChildren(childArray, groupArray) {
  let tempChild = [];

  childArray.forEach((element) => {
    groupArray.push(element.path);

    tempChild.push({
      name: element.name,
      path: element.path,
      component: element.component,
      meta: { title: element.title, keepAlive: false },
      children: formatChildren(element.children)
    });
  });

  return tempChild;
}

const routes = [
  { name: 'login', path: '/login', component: LoginPage, meta: { title: 'login', keepAlive: false } },
  {
    path: '/',
    component: LayoutMain,
    redirect: '/login',
    children: childrenArray
  }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
  if (Store.state.isLogin && Store.state.userInfo.level >= 20000) {
    await Store.dispatch('getUserInfo');
  }

  if (Store.state.isLogin) {
    // 已登录

    if (Store.state.userInfo.level < 1000) {
      // 管理员
      if ([].concat(Group_Admin, Group_ordinary, Group_Level_10000, Group_Level_20000).indexOf(to.path) > -1) {
        next();
      } else {
        next('/user-center/user-info');
      }
    } else if (Store.state.userInfo.level < 10000) {
      // 普通用户
      if ([].concat(Group_ordinary, Group_Level_10000, Group_Level_20000).indexOf(to.path) > -1) {
        next();
      } else {
        next('/user-center/user-info');
      }
    } else {
      // 游客
      if ([].concat(Group_Level_20000).indexOf(to.path) > -1) {
        next();
      } else {
        next('/news-info');
      }
    }
  } else {
    // 未登录

    if ([].concat(['/login'], Group_Level_20000, Group_Unlimited).indexOf(to.path) > -1) {
      console.log(5656);
      next();
    } else {
      console.log(787878);
      next('/login');
    }
  }
});

export default router;
