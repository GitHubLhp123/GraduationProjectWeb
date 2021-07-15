<template>

    <div>
        <el-table :data="sysInfoList" style="width: 100%" @cell-dblclick="handleClick">
            <el-table-column prop="hostName" label="主机名" width="180"></el-table-column>
            <el-table-column prop="ip" label="ip"></el-table-column>
            <el-table-column prop="cpuUser" label="用户cpu使用率"></el-table-column>
            <el-table-column prop="cpuSys" label="系统cpu使用率"></el-table-column>
            <el-table-column prop="systemTotalMemory" label="系统总内存"></el-table-column>
            <el-table-column prop="systemUsedMemory" label="系统已用内存"></el-table-column>
            <el-table-column prop="jvmTotalMemory" label="JVM总内存"></el-table-column>
            <el-table-column prop="jvmFreeMemory" label="JVM已用内存">
                <template slot-scope="scope">
                    {{scope.row.jvmTotalMemory-scope.row.jvmFreeMemory}}
                </template>
            </el-table-column>
            <el-table-column prop="diskTotal" label="磁盘总空间"></el-table-column>

            <el-table-column prop="diskFree" label="磁盘已用空间">

                <template slot-scope="scope">
                    {{scope.row.diskTotal-scope.row.diskFree}}
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">{{getSysInfoState(scope.row)}}</div>
                        <el-button type="primary" v-if="getSysInfoState(scope.row)==='正常'" plain>正常</el-button>
                        <el-button type="danger" v-else plain>警告</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="createDt" label="心跳时间" width="140"></el-table-column>
        </el-table>
        <el-dialog :visible.sync="viewSysInfoVisible" v-if="viewSysInfoVisible" width="80%">
            <div style="height:500px;">
                <sys-info v-bind:SysInfo="viewSysInfo"></sys-info>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import sysInfo from './SysInfo';

    export default {
        components: {sysInfo},
        name: "SysInfoList",
        data() {
            return {
                timer: null, //定时器名称
                sysInfoList: [],
                viewSysInfoVisible: false,
                viewSysInfo: {}
            }
        },
        created() {
            this.getSysInfoList();
        },
        mounted() {

            this.timer = setInterval(() => {
                setTimeout(this.getSysInfoList, 0)
            }, 1000 * 60)
        }, beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },

        methods: {
            messageAlert(row, column, event, cell) {
                alert(this.getSysInfoState(row));

            },
            getSysInfoState(row) {
                let message = "";
                if ((row.diskTotal-row.diskFree) / row.diskTotal > 0.8) {
                    message += "磁盘空间,";
                }
                if (row.cpuUser + row.cpuSys > 80) {
                    message += "cpu,";
                }
                if ((row.systemUsedMemory / row.systemTotalMemory) > 0.8) {
                    message += "系统内存,";
                }
                if ((row.jvmTotalMemory-row.jvmFreeMemory )/ row.jvmTotalMemory > 0.8) {
                    message += "JVM内存,";
                }
                if ((row.diskTotal-row.diskFree) / row.diskTotal > 0.8) {
                    message += "磁盘空间,";
                }
                if (this.getDateDiff(row.createDt) > 5) {
                    message += "宕机,";
                }
                if (message.length > 1) {
                    return "警告:" + message;
                }
                return "正常";


            },
            getDateDiff(createDt) {
                console.log(createDt);

                createDt = createDt.substring(0, 19);
                createDt = createDt.replace(/-/g, '/');
                let infoTimestamp = new Date(createDt).getTime();
                console.log(infoTimestamp);
                let currentTimestamp = (new Date().getTime());
                console.log(currentTimestamp);
                let timestampDiff = currentTimestamp - infoTimestamp;
                let days = Math.floor(timestampDiff / 1000 / 60);
                console.log(days);


                return days;
            },
            handleClick(row, column, event, cell) {
                this.viewSysInfo = row;
                this.viewSysInfoVisible = true;

            },
            getSysInfoList() {
                axiosGet({
                    url: '/chart/getSysInfoList',
                    methods: 'get',
                    params: {}
                }).then(res => {
                    console.log(res);
                    this.sysInfoList = [];
                    this.sysInfoList.push(...res.data);
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }


        }
    }
</script>

<style scoped>

</style>