<template>

    <div>
        <el-button @click="saveJobDepend()" :disabled="openType==='show'">保存</el-button>
        <el-table :data="dependList">
            <el-table-column prop="dependName" label="名称">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.jobName" :disabled="true"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button title="移除任务" @click="removeJob(scope.row.jobName)" class="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>


</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {
            openType: String,
            jobName: String,
            inputTabs: String,
        },
        name: "Depend",
        data() {
            return {
                dependList: [],
                outputTabs: String,
            }
        },
        created() {
            if (this.openType === 'show') {
                this.getJobDepend();
            } else {
                this.computedJobDepend();
            }
        },
        methods: {
            saveJobDepend() {
                let dependList = [];
                this.dependList.forEach(ele => {
                    dependList.push(ele.jobName)
                });
                axiosGet({
                    url: '/job/saveJobDepend',
                    methods: 'get',
                    params: {
                        jobName: this.jobName,
                        dependList: dependList.toString()
                    }
                }).then(res => {

                }).catch(err => {

                });
            },
            removeJob(jobName) {
                this.dependList = this.dependList.filter(ele => ele.jobName !== jobName)
            },
            computedJobDepend() {
                axiosGet({
                    url: '/job/computedJobDepend',
                    methods: 'get',
                    params: {
                        inputDataList: this.inputTabs
                    }
                }).then(res => {
                    this.dependList = res.data;
                }).catch(err => {

                });
            },
            getJobDepend() {
                axiosGet({
                    url: '/job/getJobDepend',
                    methods: 'get',
                    params: {
                        jobName: this.jobName
                    }
                }).then(res => {
                    let jobNames = [];
                    res.data.forEach(ele => {
                        jobNames.push({
                            jobName: ele.dependName
                        })
                    });
                    this.dependList.push(...jobNames);
                    res.data.filter(function (item, index) {
                        return res.data.indexOf(item, 0) === index;
                    });

                }).catch(err => {

                });
            },
        }
    }
</script>

<style scoped>
    .list-group button {
        background: none;
        border: 0;
        color: red;
        outline: 0;
        float: right;
        font-weight: bold;
    }
</style>