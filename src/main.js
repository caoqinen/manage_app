import {
    createApp,
    // Vue
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import * as echarts from 'echarts';
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
// Vue.prototype.$echarts = echarts
import 'animate.css'


const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')