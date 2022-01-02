  

import { createApp } from "vue";
import App from "./app.vue";
import { router } from './router';
import store from './store/index';
import directive from '../../../lib/vue.directive';
// import message from '../../component/message/message';
import compt from "./modules";
// import { ElButton, ElSelect } from 'element-plus';

const app=createApp(App);
// app.use(ElButton)
// app.use(ElSelect)
compt(app);
// directive(app);
// message(app);
app.use(router).use(store).mount('#app')

// createApp(app).use(router).mount('#app');