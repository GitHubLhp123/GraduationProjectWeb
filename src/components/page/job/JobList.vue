<template>
    <el-tabs v-model="activeJobName" @tab-remove="removeTab">
        <el-tab-pane label="任务列表" name="jobList">

            <div>
                <div>
                    <el-form class="demo-form-inline" :inline="true">
                        <el-form-item label="任务名">
                            <el-input v-model="query.jobName">topic</el-input>
                        </el-form-item>
                        <el-form-item label="任务标签">
                            <el-input v-model="query.jobLabel">id</el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="query.state" clearable
                                       class="handle-select mr10">
                                <el-option key="1" label="新建" value="NEW"></el-option>
                                <el-option key="2" label="变更" value="CHANGE"></el-option>
                                <el-option key="3" label="已发布" value="PUBLISHED"></el-option>
                                <el-option key="4" label="已下线" value="INVALID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="当前操作者">
                            <el-input v-model="query.lastUserName"></el-input>
                        </el-form-item>
                        <el-button icon="el-icon-search" circle @click="getJobList"></el-button>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                <div class="selecttip"><span>添加(开发中)</span></div>
                            </div>
                            <el-button type="primary" icon="el-icon-circle-plus" @click="createJob()"
                                       class="handle-del mr10"
                            ></el-button>
                        </el-tooltip>


                    </el-form>


                </div>
                <div>
                    <el-table
                            :row-style="{height:'30px'}"
                            :cell-style="{padding:'0px'}"
                            style="font-size: 10px"
                            :data="tableData"
                            border
                            class="table"
                            ref="tableData"
                            @cell-dblclick="cellClick"
                            header-cell-class-name="table-header">
                        <el-table-column prop="jobName" label="名称" align="left"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="jobLabel" label="中文名"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column width="80px" prop="teamName" label="团队名"
                                         sortable='cycleType'></el-table-column>
                        <el-table-column width="100px" prop="state" label="状态" sortable='state'></el-table-column>
                        <el-table-column prop="createUserName" label="创建人"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column width="100px" prop="lastUserName" label="当前责任人"></el-table-column>
                        <el-table-column width="100px" prop="createUser" label="创建人" sortable='state'></el-table-column>
                        <el-table-column prop="createTime" label="创建时间" sortable='createTime'
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="lastUpdTime" label="操作时间" sortable='lastUpdTime'
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作"
                                         width="50">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit"
                                           circle @click="cellDbClick(scope)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="1"
                                :page-sizes="[10, 20, 50]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="this.pageTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </el-tab-pane>

        <el-tab-pane
                v-for="item in jobInfoDataList"
                :key="item.jobName"
                :label="item.jobName"
                :name="item.jobName" closable>
            <el-tabs :tab-position="'left'">

                <el-tab-pane label="用户管理">
                    <jobInfo ref="jobInfo"
                             v-bind:jobName="item.jobName" v-bind:openType="item.openType"></jobInfo>
                </el-tab-pane>


                <el-tab-pane label="配置管理">
                    <graph ref="plugList" v-bind:jobName="item.jobName"
                               v-bind:openType="item.openType"></graph>
                </el-tab-pane>


            </el-tabs>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {axiosGet} from '../../../utils/network/request.js';
    import jobInfo from './JonInfo.vue';
    import Graph from '../plug/Graph.vue';
    import depend from './Depend'

    export default {
        name: "JobList",
        components: {
            jobInfo, Graph, depend
        },
        data() {
            return {
                tableData: [],
                query: {
                    state: '',
                    pageIndex: 1,
                    pageSize: 10,
                    jobName: '',
                    jobLabel: '',
                    teamName: this.$store.state.personInfo.currentTeam.teamName,
                    lastUserName: ''
                },
                pageTotal: 0,
                activeJobName: "jobList",
                jobInfoDataList: [],
                currentJobName: ''
            }
        },
        created() {
            this.getJobList();
        },
        methods: {
            removeTab(targetName) {

                let tabs = this.jobInfoDataList;
                let activeName = this.activeJobName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.jobName === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.jobName;
                            }
                        }
                    });
                }
                this.activeJobName = 'jobList';
                this.jobInfoDataList = tabs.filter(tab => tab.jobName !== targetName);
            },
            cellClick(row, column, event, cell) {
                //table行级点击
                console.log("table行级点击");
                console.log(row.jobName);
                let flag = false;
                this.jobInfoDataList.forEach(ele => {
                    if (ele.jobName === row.jobName) {
                        flag = true;
                        return;
                    }
                });
                if (!flag) {
                    let jobInfo = {
                        jobName: row.jobName,
                        openType: 'show'
                    };
                    this.jobInfoDataList.push(jobInfo);
                }
                this.activeJobName = row.jobName;
                console.log(this.jobInfoDataList);

            },
            createJob() {


                this.jobInfoDataList.push({
                    depends: '',
                    inputTabs: '',
                    outputTabs: '',
                    state: '',
                    jobName: 'newJob',
                    jobLabel: '',
                    cron: '',
                    startDate: '',
                    endDate: '',
                    emails: '',
                    retryCount: '',
                });

                this.activeJobName = 'newJob';
            },
            cellDbClick(scope) {
                console.log(scope);
                //table行级点击
                console.log("table行级点击");
                console.log(scope.row.jobName);
                let flag = false;
                this.jobInfoDataList.forEach(ele => {
                    if (ele.jobName === scope.row.jobName) {
                        flag = true;
                        return;
                    }
                });
                if (!flag) {
                    let jobInfo = {
                        jobName: scope.row.jobName,
                        openType: 'edit'
                    };
                    this.jobInfoDataList.push(jobInfo);
                }
                this.activeJobName = scope.row.jobName;
                console.log(this.jobInfoDataList);

            },

            handleSizeChange(val) {
                this.query.pageSize = val;
                this.getJobList();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.query.pageIndex = val;
                this.getJobList();
                console.log(`当前页: ${val}`);
            },
            getJobList() {
                axiosGet({
                    url: '/job/getJobList',
                    methods: 'get',
                    params: {
                        jobName: this.query.jobName,
                        jobLabel: this.query.jobLabel,
                        state: this.query.state,
                        lastUserName: this.query.lastUserName,
                        pageIndex: this.query.pageIndex,
                        pageSize: this.query.pageSize,
                        teamName: this.query.teamName
                    }
                }).then(res => {
                    this.tableData = res.data;
                    this.pageTotal = res.dataLength;

                }).catch(err => {
                });
            },

        }
    }
</script>

<style scoped>

</style>