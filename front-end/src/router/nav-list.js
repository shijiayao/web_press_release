export default [
  // 公用组
  {
    index: 10001,
    title: '用户中心',
    name: 'user-center',
    path: '/user-center',
    redirect: '/user-center/user-info',
    icon: 'user',
    component: () => import('@/components/layout/layout-router-view.vue'),
    children: [
      { index: 1, title: '个人信息', name: 'user-info', path: '/user-center/user-info', component: () => import('@/components/user-center/user-info/user-info-page.vue'), children: [] },
      { index: 2, title: '修改密码', name: 'edit-password', path: '/user-center/edit-password', component: () => import('@/components/user-center/edit-password/edit-password-page.vue'), children: [] }
    ]
  },
  // 管理员用户组
  {
    index: 7002,
    title: '用户管理',
    name: 'user-manage',
    path: '/user-manage',
    redirect: '/user-manage/user-normal',
    icon: 'coordinate',
    component: () => import('@/components/layout/layout-router-view.vue'),
    children: [
      { index: 1, title: '普通用户信息', name: 'user-normal', path: '/user-manage/user-normal', component: () => import('@/components/user-manage/user-normal/user-normal-page.vue'), children: [] },
      { index: 2, title: '管理员信息', name: 'user-admin', path: '/user-manage/user-admin', component: () => import('@/components/user-manage/user-admin/user-admin-page.vue'), children: [] }
    ]
  },
  {
    index: 7003,
    title: '内容管理',
    name: 'content-manage',
    path: '/content-manage',
    redirect: '/content-manage/notice-manage',
    icon: 'notebook',
    component: () => import('@/components/layout/layout-router-view.vue'),
    children: [
      { index: 1, title: '友情链接', name: 'links', path: '/content-manage/links', component: () => import('@/components/content-manage/links/links-page.vue'), children: [] },
      { index: 2, title: '公告管理', name: 'notice-manage', path: '/content-manage/notice-manage', component: () => import('@/components/content-manage/notice-manage/notice-manage-page.vue'), children: [] },
      { index: 3, title: '新闻管理', name: 'news-manage', path: '/content-manage/news-manage', component: () => import('@/components/content-manage/news-manage/news-manage-page.vue'), children: [] },
      { index: 4, title: '评论管理', name: 'remark-manage', path: '/content-manage/remark-manage', component: () => import('@/components/content-manage/remark-manage/remark-manage-page.vue'), children: [] }
    ]
  },
  // 普通用户组
  {
    index: 2002,
    title: '公告消息',
    name: 'notice-message',
    path: '/notice-message',
    icon: 'message',
    component: () => import('@/components/notice-message/notice-message-page.vue'),
    children: []
  },
  {
    index: 2003,
    title: '新闻资讯',
    name: 'news-info',
    path: '/news-info',
    icon: 'document',
    component: () => import('@/components/news-info/news-info-page.vue'),
    children: []
  }
];
