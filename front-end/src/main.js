import { createApp } from 'vue';
import Store from '@/store/index.js';
import Router from '@/router/router.js';
import '@/assets/scss/main.scss';
import ElementPlus from 'element-plus';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from '@/App.vue';

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(ElementPlus);

Object.keys(ElementPlusIcons).forEach((key) => {
  app.component(ElementPlusIcons[key].name, ElementPlusIcons[key]);
});

app.mount('#app');
