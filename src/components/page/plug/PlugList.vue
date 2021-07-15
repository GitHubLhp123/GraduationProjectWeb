<template>
    <div>


        <el-button type="primary">添加插件(开发中)</el-button>
        <el-table
                :data="tableData">
            <el-table-column prop="plugLabel" label="标签符号"></el-table-column>
            <el-table-column prop="plugName" label="标签名"></el-table-column>
            <el-table-column prop="createDt" label="授权时间"></el-table-column>
            <el-table-column label="操作"
                             width="50">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-delete"
                               circle @click="deletePlug(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things

    import {axiosGet, axiosPost} from '../../../utils/network/request.js';


    export default {
        props: {
            teamName: String
        },
        components: {},
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.getListData();
        }, methods: {
            deletePlug(id) {
                axiosGet({
                    url: '/team/deletePlugById',
                    methods: 'get',
                    params: {
                        id: id
                    }
                }).then(res => {
                    this.getListData();
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
            getListData() {
                axiosGet({
                    url: '/team/getTeamPlug',
                    methods: 'get',
                    params: {
                        teamName: this.teamName
                    }
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
        }

    }
</script>

<style lang="less">

    .ellipsis {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
    }

    .link-base-style-form {
        .el-form-item {
            margin-bottom: 12px;
        }

        padding-bottom: 20px;
        border-bottom: 1px solid #DCDCDC;
    }

    .super-flow-demo1 {
        margin-top: 20px;
        width: 100%;
        height: 800px;
        background-color: #f5f5f5;
        @list-width: 200px;

        > .node-container {
            width: @list-width;
            float: left;
            height: 100%;
            text-align: center;
            background-color: #FFFFFF;
        }

        > .flow-container {
            width: calc(100% - @list-width);
            float: left;
            height: 100%;
            overflow: hidden;
        }

        .super-flow__node {
            .flow-node {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                line-height: 40px;
                padding: 0 6px;
                font-size: 12px;
            }
        }
    }

    .node-item {
        @node-item-height: 30px;

        font-size: 14px;
        display: inline-block;
        height: @node-item-height;
        width: 120px;
        margin-top: 20px;
        background-color: #FFFFFF;
        line-height: @node-item-height;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        user-select: none;
        text-align: center;
        z-index: 6;

        &:hover {
            box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
        }
    }

</style>
