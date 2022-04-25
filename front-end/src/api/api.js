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
export function logout(param) {
  return Axios.request({
    url: '/api/user/logout',
    method: 'get',
    param
  });
}

// 获取用户信息
export function userInfo(param) {
  return Axios.request({
    url: '/api/user/user-info',
    method: 'get',
    param
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
