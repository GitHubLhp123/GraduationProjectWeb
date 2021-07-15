import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {messages} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import sqlFormatter from "sql-formatter";
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'

Vue.use(SuperFlow);


Vue.config.productionTip = false;
Vue.use(sqlFormatter);
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
import UUID from 'vue-uuid'

Vue.use(UUID)
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {



    //
    // document.title = `${to.meta.title} | vue-manage-system`;
    // const role = localStorage.getItem('ms_username');
    // console.log("123");
    // console.log(to);
    // if (to.path === '/login' || to.path === '/404') {
    //     next();
    // }
    // else if (role === undefined) {
    //     console.log("用户名不存在");
    //     next('/login');
    // }
    // else if (role !== undefined) {
    //     let permissions = localStorage.getItem("permissions").split(",");
    //     if (!permissions.includes(to.path)) {
    //         next('/404');
    //     }
    // }
    //


    const token = localStorage.getItem('token');
    if (token === undefined) {
        console.log("用户名不存在");
        next('/login');
    }
    else if (!token && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {

    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }

    }


});

import store from './store/index.js'

Vue.prototype.$store = store;
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
