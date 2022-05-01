import Axios from './axios.js';

// 注册
export function register(data) {
  return Axios.request({
    url: '/api/user/register',
    method: 'post',
    data
  });
}

// 登录
export function login(data) {
  return Axios.request({
    url: '/api/user/login',
    method: 'post',
    data
  });
}

// 登出
export function logout(params) {
  return Axios.request({
    url: '/api/user/logout',
    method: 'get',
    params
  });
}

// 获取用户信息
export function userInfo(params) {
  return Axios.request({
    url: '/api/user/user-info',
    method: 'get',
    params
  });
}

// 新增用户
export function addUser(data) {
  return Axios.request({
    url: '/api/user/add_user',
    method: 'post',
    data
  });
}

// 用户列表
export function userList(params) {
  return Axios.request({
    url: '/api/user/user-list',
    method: 'get',
    params
  });
}

// 修改密码
export function editPassword(data) {
  return Axios.request({
    url: '/api/user/edit-password',
    method: 'post',
    data
  });
}

// 编辑用户
export function editUser(data) {
  return Axios.request({
    url: '/api/user/edit-user',
    method: 'post',
    data
  });
}

// 新增友情链接
export function addFriendLinks(data) {
  return Axios.request({
    url: '/api/manage/add-links',
    method: 'post',
    data
  });
}

// 获取友情链接列表
export function friendLinksList(params) {
  return Axios.request({
    url: '/api/manage/links-list',
    method: 'get',
    params
  });
}

// 修改友情链接
export function editFriendLinks(data) {
  return Axios.request({
    url: '/api/manage/edit-links',
    method: 'post',
    data
  });
}

// 新增公共消息
export function addNotice(data) {
  return Axios.request({
    url: '/api/manage/add-notice',
    method: 'post',
    data
  });
}

// 获取公告消息列表
export function noticeList(params) {
  return Axios.request({
    url: '/api/manage/notice-list',
    method: 'get',
    params
  });
}

// 编辑公告消息
export function editNotice(data) {
  return Axios.request({
    url: '/api/manage/edit-notice',
    method: 'post',
    data
  });
}

// 新增新闻分类
export function addNewsType(data) {
  return Axios.request({
    url: '/api/manage/add-news-type',
    method: 'post',
    data
  });
}

// 获取新闻分类列表
export function newsTypeList(params) {
  return Axios.request({
    url: '/api/manage/news-type-list',
    method: 'get',
    params
  });
}

// 编辑新闻分类
export function editNewsType(data) {
  return Axios.request({
    url: '/api/manage/edit-news-type',
    method: 'post',
    data
  });
}

// 新增新闻
export function addNews(data) {
  return Axios.request({
    url: '/api/manage/add-news',
    method: 'post',
    data
  });
}

// 获取新闻列表
export function newsList(params) {
  return Axios.request({
    url: '/api/manage/news-list',
    method: 'get',
    params
  });
}

// 编辑新闻
export function editNews(data) {
  return Axios.request({
    url: '/api/manage/edit-news',
    method: 'post',
    data
  });
}
