<template>


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
                        <el-option key="1" label="运行中" value="run"></el-option>
                        <el-option key="2" label="成功" value="success"></el-option>
                        <el-option key="3" label="失败" value="error"></el-option>
                        <el-option key="4" label="失效" value="invalid"></el-option>

                    </el-select>
                </el-form-item>

                <el-button icon="el-icon-search" circle @click="getData"></el-button>
            </el-form>
        </div>
        <el-table
                highlight-current-row
                style="font-size: 10px"
                :data="tableData"
                border
                :show-header="true">
            <el-table-column
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column label="ID"
                             type="index"
                             :index="countIndex"
                             width="50">
            </el-table-column>
            <template v-for="(ele,index) in columnNames">
                <el-table-column show-overflow-tooltip :key="index" :prop="ele.prop"
                                 :label="ele.label"
                                 align="left">
                    <template slot-scope="scope">
                                                        <span>
                                                {{scope.row[ele.prop]}}
                                                      </span>
                    </template>
                </el-table-column>
            </template>
            <el-table-column label="日志"
                             width="50">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-document"
                               circle @click="getJobTriggerLog(scope)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.pageTotal">
        </el-pagination>
        <el-dialog
                :visible.sync="dialogVisible"
                width="100%">
            <el-input
                    type="textarea"
                    :rows="50"
                    placeholder=""
                    v-model="textarea">
            </el-input>
        </el-dialog>
    </div>


</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "JobTriggerList",
        data() {
            return {
                textarea: '',
                dialogVisible: false,
                columnNames: [],
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
            }
        },
        created() {
            this.columnNames.push({label: 'jobName', prop: 'jobName'});
            this.columnNames.push({label: 'jobLabel', prop: 'jobLabel'});
            this.columnNames.push({label: 'batchNo', prop: 'batchNo'});
            this.columnNames.push({label: 'state', prop: 'state'});
            this.columnNames.push({label: 'teamName', prop: 'teamName'});
            this.columnNames.push({label: 'message', prop: 'message'});
            this.getData();
        },
        methods: {
            getJobTriggerLog(scope) {
                console.log(scope);
                console.log("getJobTriggerLog");
                axiosGet(
                    {
                        url: '/job/getJobTriggerLog',
                        methods: 'get',
                        params: {
                            jobName: scope.row.jobName,
                            batchNo: scope.row.batchNo,

                        }
                    }
                ).then(res => {
                    console.log(res.data);
                    this.textarea = res.data;
                    this.dialogVisible = true;

                }).catch(err => {

                    this.$notify({
                        title: '警告',
                        message: '保存失败',
                        type: 'warning'
                    });
                });
            },
            getData() {
                axiosGet(
                    {
                        url: '/job/getJobTriggerList',
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
                    }
                ).then(res => {
                    this.tableData = res.data;
                    this.pageTotal = res.dataLength;
                }).catch(err => {

                    this.$notify({
                        title: '警告',
                        message: '保存失败',
                        type: 'warning'
                    });
                });
            },
            countIndex(index) {
                return (this.query.pageIndex - 1) * this.query.pageSize + index + 1;
            },
            handleSizeChange(val) {
                this.query.pageSize = val;
                this.getData();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.query.pageIndex = val;
                this.getData();
                console.log(`当前页: ${val}`);
            },
        }
    }
</script>

<style scoped>

</style>