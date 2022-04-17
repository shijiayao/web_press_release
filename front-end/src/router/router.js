import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/login/login-page.vue';
import LayoutMain from '@/components/layout/layout-main.vue';

const routes = [
  { path: '/login', component: LoginPage, meta: { title: 'login' } },
  {
    path: '/',
    component: LayoutMain,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile'
        // component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts'
        // component: UserPosts,
      }
    ]
  }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
