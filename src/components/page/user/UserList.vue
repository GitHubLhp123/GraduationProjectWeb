<template>
    <div>


        <el-button type="primary">添加用户(开发中)</el-button>
        <el-table
                :data="tableData"
                style="width: 100%"
                height="250">
            <el-table-column
                    fixed
                    prop="userName"
                    label="用户名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="role"
                    label="角色"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="defaultTeamName"
                    label="默认团队"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建时间"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="是否启用"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-size="10"
                layout="total,  prev, pager, next"
                :total="this.tableDataLength">
        </el-pagination>
        <el-dialog :visible.sync="editUserVisible" v-if="editUserVisible">

            <user-info v-bind:userInfoJson="activeUserInfo" @userSave="getUserListByTeam"></user-info>
        </el-dialog>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import UserInfo from './UserInfo';

    export default {
        components: {UserInfo},
        props: {teamName: String},
        data() {
            return {
                tableData: [],
                pageIndex: 1,
                tableDataLength: 0,
                editUserVisible: false,
                activeUserInfo: ''
            }
        },
        created() {
            console.log(this.teamName);
            this.getUserListByTeam(this.teamName);
        },
        methods: {
            handleClick(row) {
                console.log(row);
                this.activeUserInfo = JSON.stringify(row);

                this.editUserVisible = true;

            },

            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getUserListByTeam(this.teamName);
                console.log(`当前页: ${val}`);
            },

            getUserListByTeam(teamName) {
                axiosGet({
                    url: '/user/getUserListByTeamName',
                    methods: 'get',
                    params: {
                        teamName: this.teamName,
                        pageIndex: this.pageIndex
                    }
                }).then(res => {
                    this.tableData = res.data;
                    this.tableDataLength = res.dataLength;
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
            getUserList() {

            },
        },

    }
</script>