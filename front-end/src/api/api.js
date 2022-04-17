import Axios from './axios.js';

// 获取 nav list
export function getNavList() {
  return Axios.request({
    url: '/api/base-info/nav-list',
    method: 'get'
  });
}
