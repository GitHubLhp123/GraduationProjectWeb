import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({

    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['@/components/common/Home'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',

                    component: resolve => require(['@/components/page/Dashboard'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/ds',
                    component: resolve => require(['@/components/page/ds/DsList'], resolve),

                    meta: {title: '数据源管理'}
                },
                {
                    path: '/messageList',

                    component: resolve => require(['@/components/page/message/messageList'], resolve),

                    meta: {title: '消息中心'}
                },
                {
                    path: '/dataQuery',
                    component: resolve => require(['@/components/page/query/DataQuery'], resolve),

                    meta: {title: 'SQL查询'}
                },
                {
                    path: '/runSqlLog',
                    component: resolve => require(['@/components/page/query/RunSqlLog'], resolve),
                    meta: {title: 'SQL查询日志'}
                },
                {
                    path: '/RequestLog',
                    component: resolve => require(['@/components/page/query/RequestLog'], resolve),
                    meta: {title: 'WEB请求日志'}
                },

                {
                    // 图片上传组件
                    path: '/upload',

                    component: resolve => require(['@/components/page/Upload'], resolve),
                    meta: {title: '文件上传'}
                },

                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['@/components/page/BaseCharts'], resolve),

                    meta: {title: 'schart图表'}
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['@/components/page/DragList'], resolve),

                    meta: {title: '拖拽列表'}
                },


                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['@/components/page/Permission'], resolve),

                    meta: {title: '权限测试', permission: true}
                },
                {
                    path: '/404',

                    component: resolve => require(['@/components/page/404'], resolve),

                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['@/components/page/403'], resolve),

                    meta: {title: '403'}
                },

                {
                    path: '/model',
                    component: resolve => require(['@/components/page/model/ModelList'], resolve),

                    meta: {title: '模型开发'}
                },


                {
                    path: '/teamManager',
                    component: resolve => require(['@/components/page/teamName/TeamManager'], resolve),
                    meta: {title: '团队管理'}
                },


                {
                    path: '/JobList',
                    component: resolve => require(['@/components/page/job/JobList'], resolve),
                    meta: {title: '任务列表'}
                },

                {
                    path: '/JobTriggerList',
                    component: resolve => require(['@/components/page/jobTrigger/JobTriggerList'], resolve),
                    meta: {title: '任务监控'}
                },
                {
                    path: '/PlugList',
                    component: resolve => require(['@/components/page/plug/PlugList'], resolve),
                    meta: {title: 'temp_任务编辑'}
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['@/components/page/Login'], resolve),
            meta: {title: '登录'}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
