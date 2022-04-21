import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/login/login-page.vue';
import LayoutMain from '@/components/layout/layout-main.vue';
import navList from './nav-list.js';

const childrenArray = [];

navList.forEach((element) => {
  childrenArray.push({
    name: element.name,
    path: element.path,
    component: element.component,
    meta: { title: element.title },
    redirect: element.redirect,
    children: formatChildren(element.children)
  });
});

function formatChildren(childArray) {
  let tempChild = [];

  childArray.forEach((element) => {
    tempChild.push({
      name: element.name,
      path: element.path,
      component: element.component,
      meta: { title: element.title },
      children: formatChildren(element.children)
    });
  });

  return tempChild;
}

const routes = [
  { name: 'login', path: '/login', component: LoginPage, meta: { title: 'login' } },
  {
    path: '/',
    component: LayoutMain,
    redirect: '/user-center/user-info',
    children: childrenArray
  }
];

console.log(routes);

const router = createRouter({ history: createWebHistory(), routes });

export default router;
