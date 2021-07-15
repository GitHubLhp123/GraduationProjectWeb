<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import {axiosGet, axiosPost} from '../../utils/network/request.js';

    export default {
        data() {
            return {
                collapse: false,
                items: []
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
            this.getUserPagePermissions();
        },
        methods: {

            setPagePermissions(permissions) {
                let addItems = [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },

                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'model',
                        title: '模型开发'
                    },
                    {
                        icon: 'el-icon-chat-dot-round',
                        index: 'messageList',
                        title: '消息中心'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '数据查询',
                        subs: [
                            {
                                index: 'dataQuery',
                                title: 'SQL查询'
                            },
                            {
                                index: 'runSqlLog',
                                title: 'SQL查询日志',
                            },

                            {
                                index: 'RequestLog',
                                title: 'WEB请求日志'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-coin',
                        index: '/ds',
                        title: '数据源管理'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '/JobList',
                        title: '任务列表'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '6',
                        title: '拖拽组件',
                        subs: [
                            {
                                index: 'drag',
                                title: '拖拽列表'
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: 'i18n',
                        title: '国际化功能'
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-redpacket_fill',
                        index: '/donate',
                        title: '支持作者'
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: 'teamManager',
                        title: '团队管理'
                    },
                    {
                        icon: 'el-icon-monitor',
                        index: 'JobTriggerList',
                        title: '任务监控'
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: 'PlugList',
                        title: 'temp_任务编辑'
                    },
                ];
                console.log("step1");
                let items = [];
                addItems.forEach(ele => {
                    let flag = false;//用来判断父组件是否全选
                    if (permissions.includes(ele.index)) {
                        console.log("step2");
                        items.push({
                            icon: ele.icon,
                            index: ele.index,
                            title: ele.title,
                            subs: ele.subs !== undefined ? ele.subs : []
                        });
                        flag = true;
                    }
                    if (flag) {
                        //不需要操作什么
                    } else {
                        if (ele.subs !== undefined) {
                            let item = {
                                icon: ele.icon,
                                index: ele.index,
                                title: ele.title,
                                subs: []
                            };
                            let flag2 = false;//判断是否进入子组件
                            ele.subs.forEach(subEle => {
                                if (permissions.includes(subEle.index)) {
                                    item.subs.push(subEle);
                                    flag2 = true;
                                }
                            });
                            if (flag2) {
                                items.push(item);
                            }
                        }
                    }

                });

                items.map(ele => {
                    if (ele.subs.length === 0) {
                        delete ele.subs;
                    }
                });


                this.items = items;


            },
            getUserPagePermissions() {
                let permissions = [];
                axiosGet({
                    url: '/user/getUserPagePermissions',
                    methods: 'get',
                    params: {
                        teamName: JSON.parse(localStorage.getItem('currentTeam')).teamName,
                        userName: JSON.parse(localStorage.getItem('user')).userName
                    }
                }).then(res => {
                    console.log("===================");
                    console.log("===================");
                    console.log("===================");
                    console.log("===================");
                    console.log(res);
                    permissions = res.data;
                    localStorage.setItem('permissions', res.data);
                    this.setPagePermissions(permissions);
                }).catch(err => {

                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
