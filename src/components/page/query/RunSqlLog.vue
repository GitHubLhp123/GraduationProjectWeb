<template>
    <div>
        <div class="handle-box">
            <el-form>


                <el-form-item>
                    <el-col :span="5">
                        <el-input @keyup.enter.native='getLogListData()' v-model="dsName" placeholder="数据源名称"
                        ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input @keyup.enter.native='getLogListData()' v-model="userName" placeholder="用户名"
                        ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input @keyup.enter.native='getLogListData()' v-model="runSql" placeholder="sql"
                        ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                                v-model="runTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="2">
                        <el-button @click="getLogListData()" icon="el-icon-search" circle></el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-model="logDataList"
                  :data="logDataList"
                  border
                  class="table"
                  ref="logDataList"
                  header-cell-class-name="table-header">
            <el-table-column prop="dsName" label="数据源名称" align="left"></el-table-column>
            <el-table-column prop="dsSchema" label="Schema" align="left"></el-table-column>
            <el-table-column prop="dsType" label="数据源类型" align="center"></el-table-column>
            <el-table-column prop="runSql" label="执行语句" align="left" show-overflow-tooltip>




            </el-table-column>
            <el-table-column prop="userName" label="执行者" align="left"></el-table-column>
            <el-table-column prop="runTime" label="执行时间" align="left">
            </el-table-column>
            <el-table-column prop="resultType" label="执行情况" align="left"></el-table-column>
            <el-table-column prop="copyContent" label="复制内容" align="center"></el-table-column>
            <el-table-column prop="ipAddress" label="执行ip地址" align="center"></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "logDataList",
        data() {
            return {
                logDataList: [],
                total: 0,
                runSql: '',
                runTime: '',
                dsName: '',
                userName: '',
                pageSize: 10,
                pageIndex: 1
            }
        },
        created() {
            this.getLogListData();
        },
        computed:{
            setDateFormat(date) {
                return date;
                let ret;
                let fmt = "YYYY-mm-dd HH:MM:SS";
                const opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "M+": date.getMinutes().toString(),         // 分
                    "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    }
                    ;
                }

                return fmt;
            },
        },
        methods: {

            handleSizeChange(val) {
                this.pageSize = val;
                console.log(`每页 ${val} 条`);
                this.getLogListData();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                console.log(`当前页: ${val}`);
                this.getLogListData();
            },
            getLogListData() {
                axiosGet({
                    url: '/ds/getRunSqlLog',
                    methods: 'get',
                    params: {
                        runSql: this.runSql,
                        runTime: this.runTime,
                        userName: this.userName,
                        dsName: this.dsName,
                        pageSize: this.pageSize,
                        pageIndex: this.pageIndex
                    }
                }).then(res => {
                    console.log(res);
                    this.logDataList = res.data;
                    this.total = res.dataLength;
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