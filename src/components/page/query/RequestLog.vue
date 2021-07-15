<template>
    <div>
        <div class="handle-box">

            <el-form class="demo-form-inline" :inline="true">
                <el-form-item label="用户名">

                    <el-input @keyup.enter.native='getLogListData()' v-model="query.userName"
                              class="handle-input mr10"></el-input>
                </el-form-item>

                <el-form-item label="团队名">
                    <el-input @keyup.enter.native='getLogListData()' v-model="query.teamName"
                              class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="url">

                    <el-input @keyup.enter.native='getLogListData()' v-model="query.url"
                              class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getLogListData()"></el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-model="logDataList"
                  :data="logDataList"
                  border
                  class="table"
                  ref="logDataList"
                  header-cell-class-name="table-header">

            <el-table-column prop="userName" label="用户名" align="left"></el-table-column>
            <el-table-column prop="args" label="参数列表" align="left"></el-table-column>
            <el-table-column prop="teamName" label="团队名" align="left"v-if="query.teamName!==''"></el-table-column>
            <el-table-column prop="requestWay" label="请求方式" align="left"></el-table-column>
            <el-table-column prop="url" label="url" align="left"></el-table-column>
            <el-table-column prop="ip" label="ip" align="left"></el-table-column>
            <el-table-column prop="createDt" label="执行时间" align="left"></el-table-column>
        </el-table>
        <div>

            利用AOP来实现记录请求信息，但是现在MONGODB崩了
        </div>
        <div class="pagination">

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.pageTotal">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "RequestLog",
        data() {
            return {
                pageTotal: 0,
                query: {
                    userName: '',
                    teamNAme: '',
                    url: '',
                    pageIndex: 1,
                    pageSize: 10,
                },
                logDataList: [],
            }
        },
        created() {
            this.getLogListData();
        },
        methods: {
            handleSizeChange(val) {
                this.query.pageSize = val;
                this.getLogListData();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.query.pageIndex = val;
                this.getLogListData();
                console.log(`当前页: ${val}`);
            },
            getLogListData() {
                axiosGet({
                    url: '/user/getRequestLog',
                    methods: 'get',
                    params: {
                        teamName: this.query.teamName,
                        userName: this.query.userName,
                        url: this.query.url,
                        pageNum: this.query.pageIndex,
                        pageSize: this.query.pageSize
                    }

                }).then(res => {
                    this.logDataList = res.data;
                    this.pageTotal = res.dataLength;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
        }

    }
</script>

<style scoped>

</style>