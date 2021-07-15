<template>
    <div>
        <el-tabs v-model="activeTabName" @tab-remove="removeTab">
            <el-tab-pane label="模型列表" name="modelList">
                <div class="container">
                    <div class="handle-box">
                        <el-input @keyup.enter.native='getData()' v-model="query.modelName" placeholder="模型名"
                                  class="handle-input mr10"></el-input>
                        <el-input @keyup.enter.native='getData()' v-model="query.userName" placeholder="用户名"
                                  class="handle-input mr10"></el-input>
                        <el-select v-model="query.state" clearable placeholder="状态" class="handle-select mr10">
                            <el-option key="1" label="新建" value="NEW"></el-option>
                            <el-option key="2" label="变更" value="CHANGE"></el-option>
                            <el-option key="3" label="已发布" value="PUBLISHED"></el-option>
                            <el-option key="4" label="已下线" value="INVALID"></el-option>
                        </el-select>
                        <el-date-picker
                                style="width:170px;"
                                v-model="query.lastupd"
                                type="daterange"
                                :picker-options="pickerOptions"
                                unlink-panels
                                range-separator="至"
                                placeholder="选择最后更新日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                clearable>
                        </el-date-picker>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                <div class="selecttip"><span>查询</span></div>
                            </div>
                            <el-button type="primary" icon="el-icon-search" @click="getData()"></el-button>
                        </el-tooltip>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                <div class="selecttip"><span>删除</span></div>
                            </div>
                            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10"
                                       @click="delAllSelectionList"></el-button>
                        </el-tooltip>
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                <div class="selecttip"><span>添加</span></div>
                            </div>
                            <el-button type="primary" icon="el-icon-circle-plus" @click="openType('add')"
                                       class="handle-del mr10"
                            ></el-button>
                        </el-tooltip>
                    </div>
                    <el-table
                            :row-style="{height:'30px'}"
                            :cell-style="{padding:'0px'}"
                            style="font-size: 10px"
                            :data="tableData"
                            border
                            class="table"
                            ref="tableData"
                            @cell-click="cellClick"
                            header-cell-class-name="table-header"
                            @selection-change="handleSelectionChange">
                        <el-table-column type="selection" align="left" label="名称"></el-table-column>
                        <el-table-column prop="modelName" label="名称" align="left" sortable='name' show-overflow-tooltip></el-table-column>
                        <el-table-column prop="modelLabel" label="中文名" sortable='lable' show-overflow-tooltip></el-table-column>
                        <el-table-column width="80px" prop="cycleType" label="周期" sortable='cycleType'></el-table-column>
                        <el-table-column prop="dsName" label="数据源" sortable='dsAndSchema' show-overflow-tooltip></el-table-column>
                        <el-table-column width="100px" prop="state" label="状态" sortable='state'></el-table-column>
                        <el-table-column width="100px" prop="lastupdUser" label="责任人" sortable='state'></el-table-column>
                        <el-table-column width="100px" prop="createUser" label="创建人" sortable='state'></el-table-column>
                        <el-table-column prop="createDate" label="创建时间" sortable='createDt'
                        <el-table-column prop="lastupd" label="操作时间" sortable='lastupd' show-overflow-tooltip></el-table-column>
                    </el-table>
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

            </el-tab-pane>


            <el-tab-pane
                    v-for="(item, index) in modelInfoDataLsit"
                    :key="index+' '+item.modelId"
                    :label="item.modelName"
                    :name="item.modelName" closable>
                <ModelInfo ref="modelInfo" v-bind:editType="item.openType"
                           v-bind:modelId="item.modelId"></ModelInfo>
            </el-tab-pane>


        </el-tabs>


        <el-dialog :visible.sync="editModelVisible">
            <div>
                <el-button type="primary" round>血缘</el-button>
                <el-button type="success" round>历史</el-button>
                <el-button type="info" @click="openType('show')" round>查看</el-button>
                <el-button type="warning" round>移交</el-button>
                <el-button type="danger" @click="openType('edit')" round>编辑</el-button>
                <el-button type="danger" round>复制</el-button>
            </div>

        </el-dialog>


    </div>
</template>

<script>

    import {axiosGet} from '../../../utils/network/request.js';
    import ModelInfo from './ModelInfo';
    // addModelInit
    export default {
        components: {ModelInfo},
        name: 'ModelList',
        data() {
            return {
                activeTabName: 'modelList',
                openTypeInfo: '',
                modelInfoDataLsit: [],
                modelInfo: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start.getFullYear() + '-' + start.getMonth() + '-' + start.getDay(), end.getFullYear() + '-' + end.getMonth() + '-' + end.getDay()]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start.getFullYear() + '-' + start.getMonth() + '-' + start.getDay(), end.getFullYear() + '-' + end.getMonth() + '-' + end.getDay()]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start.getFullYear() + '-' + start.getMonth() + '-' + start.getDay(), end.getFullYear() + '-' + end.getMonth() + '-' + end.getDay()]);
                        }
                    }]
                },
                query: {
                    state: '',
                    pageIndex: 1,
                    pageSize: 10,
                    lastupd: [],
                    userName: '',
                    modelName: '',
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editModelVisible: false,
                pageTotal: 0,
                currentModelId: '',
                currentModelName: ''

            };
        },
        created() {
            this.getData();
        },
        methods: {

            removeTab(targetName) {
                let tabs = this.modelInfoDataLsit;
                let activeName = this.activeTabName;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.modelName === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.modelName;
                            }
                        }
                    });
                }
                this.activeTabName = 'modelList';
                this.modelInfoDataLsit = tabs.filter(tab => tab.modelName !== targetName);
            },
            openType(type) {
                if (type === 'edit') {
                    this.openTypeInfo = 'edit';
                    this.editModelVisible = false;
                    this.modelInfo = true;

                    let flag = false;
                    this.modelInfoDataLsit.forEach(ele => {
                        if (ele.modelName === this.currentModelName) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        this.activeTabName = this.currentModelName;
                    } else {
                        let modeInfo = {
                            modelId: this.currentModelId,
                            openType: 'edit',
                            modelName: this.currentModelName
                        };
                        this.modelInfoDataLsit.push(modeInfo);
                        this.activeTabName = this.currentModelName;
                    }
                }
                else if (type === 'show') {
                    let flag = false;
                    this.modelInfoDataLsit.forEach(ele => {
                        if (ele.modelName === this.currentModelName) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        this.activeTabName = this.currentModelName;
                    } else {
                        let modeInfo = {
                            modelId: this.currentModelId,
                            openType: 'show',
                            modelName: this.currentModelName
                        };
                        this.modelInfoDataLsit.push(modeInfo);
                        this.activeTabName = this.currentModelName;
                    }

                }
                else if (type === 'add') {
                    let flag = false;
                    this.modelInfoDataLsit.forEach(ele => {
                        if (ele.modelName === 'newModel') {
                            flag = true;
                        }
                    });
                    if (flag) {
                        this.activeTabName = "newModel";
                    } else {
                        let modeInfo = {modelId: "", openType: 'add', modelName: "newModel"};
                        this.modelInfoDataLsit.push(modeInfo);
                        this.activeTabName = "newModel";
                    }


                }
                this.editModelVisible = false;
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

            getData() {

                let lastupd = '';
                if (this.query.lastupd.length > 0) {
                    lastupd = this.query.lastupd.toString();
                }
                axiosGet({
                    url: '/model/getModelList',
                    methods: 'get',
                    params: {
                        modelName: this.query.modelName,
                        userName: this.query.userName,
                        state: this.query.state,
                        lastupd: lastupd,
                        pageNum: this.query.pageIndex,
                        pageSize: this.query.pageSize,
                        teamName: this.$store.state.personInfo.currentTeam.teamName
                    }
                }).then(res => {
                    this.tableData = res.data;
                    this.pageTotal = res.dataLength;
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
            closeAddmodel(done) {
                this.modelInfo = false;
                this.$refs.modelInfo.init();
            },
            // 多选操作
            handleSelectionChange(val) {


                this.multipleSelection = val;
                console.log(this.multipleSelection);

            },
            delModelList() {
                console.log(this.multipleSelection);
                let modelList = this.multipleSelection.map((ele, index) => {
                    return ele.modelId
                });
                axiosGet({
                    url: '/model/deleteModelByModelIdList',
                    methods: 'get',
                    params: {
                        modelIdList: modelList.toString(),
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!' + res.message,
                        });
                    }
                    this.getData();
                }).catch(err => {

                });
            },
            delAllSelectionList() {
                let modelNameList = this.multipleSelection.map((ele, index) => {
                    return ele.modelName + "\r\n"
                });
                this.$confirm('此操作将永久删除' + modelNameList + '\r\n是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delModelList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },


            cellClick(row, column, event, cell) {
                //table行级点击
                this.currentModelId = row.modelId;
                this.currentModelName = row.modelName;
                this.editModelVisible = true;

            }
        },


    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .elx-card-list .card-top {
        width: 100%;
        position: absolute;
        top: 0px;
    }

    .elx-card-list .card-bottom {
        width: 100%;
        position: absolute;
        bottom: 0px;
    }
</style>
