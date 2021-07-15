<template>
    <div>
        <el-switch
                v-model="state"
                active-text="启用"
                inactive-text="不启用">
        </el-switch>
        <br>     <br>     <br>
        <el-radio-group v-model="role" @change="setPermissions">
            <el-radio-button label="dev">开发者</el-radio-button>
            <el-radio-button label="manager">管理者</el-radio-button>
            <el-radio-button label="supperManager">超级管理者</el-radio-button>
        </el-radio-group>
        <el-tree
                default-expand-all
                :data="items"
                show-checkbox
                ref="tree"
                node-key="index"
                highlight-current
                :default-checked-keys="checkedKeys"
                @node-click="handleNodeClick"
                :props="defaultProps">
        </el-tree>
        <el-button @click="saveUserPermissions">保存</el-button>
    </div>
</template>
<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {
            userInfoJson: String
        },
        created() {
            this.userInfo = JSON.parse(this.userInfoJson);
            this.role = this.userInfo.role;
            this.checkedKeys = this.userInfo.permissions.split(",");
            this.permissions = this.userInfo.permissions.split(",");
            this.state = this.userInfo.state === 'true' ? true : false;
        },
        data() {
            return {
                state: true,
                userInfo: {},
                role: 'dev',
                checkedKeys: ["dashboard", "model", "messageList", "3", "dataQuery", "upload",],
                expandedKeys: [],
                items: [
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
                ],
                defaultProps: {
                    children: 'subs',
                    label: 'title'
                },
                permissions: []
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            setPermissions() {
                if (this.role === 'dev') {
                    this.$refs.tree.setCheckedKeys(["dashboard", "model", "messageList", "3", "dataQuery",
                        "upload", "charts", "6",]);
                } else if (this.role === 'manager') {
                    this.$refs.tree.setCheckedKeys(["dashboard", "model", "messageList", "3", "dataQuery", "runSqlLog",
                        "upload", "/ds", "/JobList", "charts", "6",]);
                } else {
                    this.$refs.tree.setCheckedKeys(["dashboard", "model", "messageList", "3", "dataQuery", "runSqlLog",
                        "upload", "/ds", "/JobList", "charts", "6", "drag", "dialog", "i18n", "7", "permission", "404", "/donate"]);
                }
            },

            saveUserPermissions() {
                let data = [];
                data.push(...this.$refs.tree.getCheckedKeys());
                this.permissions = data;
                axiosGet({
                    url: '/user/saveUserPermissions',
                    methods: 'get',
                    params: {
                        teamName: this.userInfo.teamName,
                        userName: this.userInfo.userName,
                        permissions: this.permissions.toString(),
                        role: this.role,
                        state: this.state.toString()
                    }
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.$emit('userSave');
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
        }
    }
    ;
</script>