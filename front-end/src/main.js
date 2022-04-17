import { createApp } from 'vue';
import Router from './router/router.js';
import Store from './store/index.js';
import './assets/scss/main.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(ElementPlus);

app.mount('#app');
