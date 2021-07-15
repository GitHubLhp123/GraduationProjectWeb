<template>

    <div class="elx-transfer" style="width: 100%">
        <div class="elx-transfer-left" style="width: 40%">
            <el-input v-model="query1.modelName" placeholder="请输入搜索内容" clearable>
                <i class="el-icon-search el-input__icon" slot="suffix" @click="getData">
                </i>
            </el-input>
            <el-table @selection-change="handleSelectionChange1" :data="tableData1" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="modelName" label="模型名称"></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                        @current-change="handleCurrentChange1"
                        layout="prev, pager, next"
                        :total="pageTotal1"
                >
                </el-pagination>
            </div>
        </div>
        <div class="elx-transfer-operate" style="width: 10%">
            <div class="button-group">
                <el-button @click.native="transferRight">
                    <span class="el-icon-right"></span>
                </el-button>
            </div>
        </div>

        <div class="elx-transfer-right" style="width: 40%" :val="value_">

            <el-table @selection-change="handleSelectionChange2" :data="tableData2" style="width: 100%"
                      height="300">

                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="modelName" label="模型名称"></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
                <el-table-column label="操作" width="55">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-delete-solid" circle
                                   @click="deleteData(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div class="pagination-container">-->
            <!--<el-pagination-->
            <!--@current-change="handleCurrentChange2"-->
            <!--layout="prev, pager, next"-->
            <!--:total="pageTotal2">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>

    </div>


</template>

<script>

    import {axiosGet, axiosPost} from '../../../utils/network/request.js';


    export default {
        name: 'tabs',
        data() {
            return {
                multipleSelection1: [],
                pageTotal1: 0,
                tableData1: [],
                query1: {
                    pageIndex: 1,
                    pageSize: 5,
                    modelName: '',
                },
                multipleSelection2: [],
                pageTotal2: 0,
                tableData2: [],

            }
        },
        computed: {
            value_() {
                let tabs = '';
                this.tableData2.forEach(ele => {
                    tabs += ele.modelName + ":" + ele.dsName + ":" + ele.modelSchema + ","
                });
                this.$emit('input', tabs)
            }
        },
        created() {
            this.getData();
        },
        methods: {

            // handleSizeChange1(val) {
            //     this.query1.pageSize = val;
            //     this.getData();
            //     console.log(`每页 ${val} 条`);
            // },
            handleCurrentChange1(val) {
                this.query1.pageIndex = val;
                this.getData();
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
                console.log(this.multipleSelection1);

            },
            handleSelectionChange2(val) {
                this.multipleSelection2 = val;
                console.log(this.multipleSelection2);

            },
            deleteData(row) {
                console.log(row.modelId);
                this.tableData2 = this.tableData2.filter(ele => {
                    return ele.modelId !== row.modelId;
                });
                this.pageTotal2--;
            },
            transferRight() {
                this.tableData2.push(...this.multipleSelection1);
                this.tableData2 = this.tableData2.filter((value, index, arr) => {
                    return arr.indexOf(value) == index
                });


                let dataList = ["c1_c2_c3", "c4_c5_c6", "c1_c2_c3", "c4_c5_c6"];

                dataList = dataList.filter((value, index, arr) => {
                    return arr.indexOf(value) == index
                });
                console.log(dataList);

                this.pageTotal2 = this.tableData2.length;
                console.log("==========");
                console.log(this.tableData2);
            },
            getData() {
                axiosGet({
                    url: '/model/getModelList',
                    methods: 'get',
                    params: {
                        modelName: this.query1.modelName,
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        pageNum: this.query1.pageIndex,
                        pageSize: this.query1.pageSize,
                    }
                }).then(res => {
                    this.tableData1 = res.data;
                    this.pageTotal1 = res.dataLength;
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },

        }


    }

</script>

<style>
    .elx-transfer {
        width: 880px;
        height: 348px;
    }

    .elx-transfer-left, .elx-transfer-right {
        width: calc(50% - 25px);
        padding: 10px;
        box-shadow: 0px 0px 5px #d3d3d3;
        float: left;
    }

    .elx-transfer-operate {
        width: 50px;
        height: 100%;
        float: left;
        text-align: center;
        position: relative;
    }

    .elx-transfer-operate .button-group {
        display: inline-block;
        position: absolute;
        height: 100px;
        width: 30px;
        margin-top: -50px;
        top: 50%;
        left: 10px
    }

    .elx-transfer-operate button.el-button {
        width: 30px;
        margin-left: 0px;
        position: absolute;
        left: 0px;
    }

    .elx-transfer-operate button.el-button:first-child {
        top: 0px;
    }

    .elx-transfer-operate button.el-button:last-child {
        bottom: 0px;
    }

    .elx-transfer .el-table {
        height: 250px;
    }

    .elx-transfer .el-input, .elx-transfer .el-table {
        margin-bottom: 10px;
    }

    .elx-transfer .pagination-container {
        margin-bottom: 0px
    }

    .elx-transfer .pagination-container .el-input {
        width: 85px;
    }
</style>
