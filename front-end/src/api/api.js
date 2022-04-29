import Axios from './axios.js';

// 获取 nav list
export function getNavList() {
  return Axios.request({
    url: '/api/base-info/nav-list',
    method: 'get'
  });
}

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
    url: '/api/manage/add_links',
    method: 'post',
    data
  });
}

// 获取友情链接列表
export function friendLinks(params) {
  return Axios.request({
    url: '/api/manage/links',
    method: 'get',
    params
  });
}

// 修改友情链接
export function editFriendLinks(data) {
  return Axios.request({
    url: '/api/manage/edit_links',
    method: 'post',
    data
  });
}
