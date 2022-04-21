import axios from 'axios';
import MD5 from 'js-md5';

const Axios = axios.create({
  baseURL: '//127.0.0.1:12580',
  timeout: 5000
});

// 添加请求拦截器
Axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.params = config.params || {};
    config.params.nonce = String(Math.random()).substring(2); // 随机数
    config.params.ts = new Date().getTime(); // 时间戳
    config.params.s = MD5(`${config.url}~${config.params.nonce}${config.params.ts}`); // 签名

    if (localStorage.getItem('user_token')) {
      // 给请求头中添加 Authorization 请求头：
      config.headers.Authorization = JSON.parse(localStorage.getItem('user_token')).token;
    }

    // 开发、测试环境
    config.headers['X-Void-Risk'] = 1;

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default Axios;
