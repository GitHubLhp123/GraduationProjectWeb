import Vue from 'vue';
import Vuex from 'vuex';

import team from './modules/personInfo.js';

//安装插件
Vue.use(Vuex);
const store = new Vuex.Store({
        modules: {
            personInfo: team,

        }
    })
;
export default store





