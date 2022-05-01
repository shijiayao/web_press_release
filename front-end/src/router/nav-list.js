export default [
  // 游客组
  {
    level: 20000,
    title: '新闻资讯',
    name: 'news-info',
    path: '/news-info',
    icon: 'document',
    component: () => import('@/components/news-info/news-info-page.vue'),
    children: []
  },
  // 公用组
  {
    level: 10000,
    title: '用户中心',
    name: 'user-center',
    path: '/user-center',
    redirect: '/user-center/user-info',
    icon: 'user',
    component: () => import('@/components/layout/layout-router-view.vue'),
    children: [
      { title: '个人信息', name: 'user-info', path: '/user-center/user-info', component: () => import('@/components/user-center/user-info/user-info-page.vue'), children: [] },
      { title: '修改密码', name: 'edit-password', path: '/user-center/edit-password', component: () => import('@/components/user-center/edit-password/edit-password-page.vue'), children: [] }
    ]
  },
  // 普通用户组
  {
    level: 1000,
    title: '公告消息',
    name: 'notice-message',
    path: '/notice-message',
    icon: 'message',
    component: () => import('@/components/notice-message/notice-message-page.vue'),
    children: []
  },
  // 管理员用户组
  {
    level: 10,
    title: '用户管理',
    name: 'user-manage',
    path: '/user-manage',
    icon: 'coordinate',
    component: () => import('@/components/user-manage/user-manage-page.vue'),
    children: []
  },
  {
    level: 10,
    title: '内容管理',
    name: 'content-manage',
    path: '/content-manage',
    redirect: '/content-manage/notice-manage',
    icon: 'notebook',
    component: () => import('@/components/layout/layout-router-view.vue'),
    children: [
      { title: '友情链接', name: 'friend-links', path: '/content-manage/friend-links', component: () => import('@/components/content-manage/friend-links/friend-links-page.vue'), children: [] },
      { title: '公告管理', name: 'notice-manage', path: '/content-manage/notice-manage', component: () => import('@/components/content-manage/notice-manage/notice-manage-page.vue'), children: [] },
      { title: '新闻管理', name: 'news-manage', path: '/content-manage/news-manage', component: () => import('@/components/content-manage/news-manage/news-manage-page.vue'), children: [] },
      { title: '新闻分类管理', name: 'news-type-manage', path: '/content-manage/news-type-manage', component: () => import('@/components/content-manage/news-type-manage/news-type-manage-page.vue'), children: [] },
      { title: '评论管理', name: 'remark-manage', path: '/content-manage/remark-manage', component: () => import('@/components/content-manage/remark-manage/remark-manage-page.vue'), children: [] }
    ]
  }
];
