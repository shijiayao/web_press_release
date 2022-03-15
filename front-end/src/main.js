import { createApp } from 'vue';
import Axios from 'axios';
import Router from './router/router.js';
import './assets/scss/main.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.axios = Axios;

app.use(Router);
app.use(ElementPlus);

app.mount('#app');
