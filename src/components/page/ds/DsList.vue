<template>
    <div>
        <el-tooltip placement="top" >
            <div slot="content">
                <div class="selecttip"><span>查询</span></div>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="getDsListData()"></el-button>
        </el-tooltip>
        <el-button
                style="float: right;" type="primary" @click="addDs()">添加数据源
        </el-button>
        <el-table
                :data="dsDataList"
                border
                class="table"
                ref="dsDataList"
                @cell-click="cellClick"
                header-cell-class-name="table-header">
            <el-table-column prop="dsName" label="数据源名称" align="center"></el-table-column>
            <!--<el-table-column prop="dsSchema" label="schema" align="center"></el-table-column>-->
            <el-table-column prop="dsType" label="类型" align="center"></el-table-column>
            <el-table-column prop="dsInstLoc" label="ip:端口" align="center"></el-table-column>
        </el-table>


        <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="1"-->
        <!--:page-size="10"-->
        <!--layout="total,  prev, pager, next"-->
        <!--:total="this.tableDataLength">-->
        <!--</el-pagination>-->
        <el-dialog


                :visible.sync="dialogVisible"
                v-if="dialogVisible"
                width="80%"
                :before-close="handleClose">
            <ds-data :visible.sync="dialogVisible" @saveDsSuccess="updateDsList"
                     v-if="dialogVisible"
                     v-bind:dsType="dsType"
                     v-bind:dsId="dsId"></ds-data>
        </el-dialog>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import dsData from './dsData';

    export default {
        props: {activeDsName: String},
        components: {
            dsData,

        },
        name: "DsList",
        data() {
            return {
                pageIndex: 1,
                tableDataLength: 0,
                openType: '',
                dsType: '',
                dsId: '',
                dialogVisible: false,
                dsDataList: [{dsName: '', dsSchema: '', dsType: '', dsInstLoc: ''}],

            }
        },
        created() {
            this.getDsListData();

            console.log("初始化list" + this.openType);
        },
        methods: {
            addDs() {
                this.dsType = 'mysql';
                this.dsId = undefined;
                this.dialogVisible = true;
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getDsListData();

            },
            handleClose(done) {
                this.dialogVisible = false;
                done();

                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => {
                //     });
            },

            cellClick(row, column, event, cell) {
                //table行级点击
                this.dsType = row.dsType;
                this.dsId = row.dsId;
                this.dialogVisible = true;

            },
            updateDsList() {
                this.dialogVisible = false;
                this.getDsListData();
            },
            getDsListData() {
                let teamName = this.$store.state.personInfo.currentTeam.teamName;
                if (this.activeDsName !== undefined) {
                    teamName = this.activeDsName;
                }
                axiosGet({
                    url: '/ds/getDsListByTeamName',
                    methods: 'get',
                    params: {
                        teamName: teamName,
                        pageIndex: this.pageIndex
                    }
                }).then(res => {
                    this.dsDataList = res.data;
                }).catch(err => {
                });
            },
        }

    }
</script>

<style scoped>

</style>