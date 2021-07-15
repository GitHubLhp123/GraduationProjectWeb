<template>
    <div>

        <el-form label-width="100px" class="demo-ruleForm" :val="ossData">
            <el-form-item label="oss数据源" prop="sourceDsName">
                <el-select v-model="ossData.sourceDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in ossDsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="目标Sftp" prop="targetDsName">
                <el-select v-model="ossData.targetDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in sftpDsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="目标路径" prop="targetFilePath">
                <el-input
                        v-model="ossData.targetFilePath">
                </el-input>
            </el-form-item>
            <el-form-item label="文件名" prop="fileNameList">
                <el-input
                        type="textarea"
                        :rows="3"
                        v-model="ossData.fileNameList">
                </el-input>
            </el-form-item>


        </el-form>

    </div>
</template>
<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "OssToSftp",
        props: {
            value: {
                type: Object
            },
            data: {
                type: Object
            },
        },
        data() {
            return {
                ossDsDataList: [],
                sftpDsDataList: [],
                ossData: {
                    key: '',
                    label: 'OssToSftp',
                    name: 'OssToSftp',
                    sourceDsName: '',
                    targetDsName: '',
                    fileNameList: '',
                    targetFilePath: ''
                }
            }
        },
        created() {
            this.getDsList();
            this.ossData = {
                key: '',
                label: 'OssToSftp',
                name: 'OssToSftp',
                sourceDsName: this.data.sourceDsName,
                targetDsName: this.data.targetDsName,
                targetFilePath: this.data.targetFilePath,
                fileNameList: this.data.fileNameList,
            }
        },
        watch: {
            ossData: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    console.log(this.ossData);
                    this.$emit('input', this.ossData);
                },
                deep: true
            }
        },
        methods: {

            // getsftpData() {
            //     this.sftpData.key = this.mysqlWriterKey;
            //     this.$emit('sftpData', this.sftpData, this.mysqlReaderKey);
            //     //   return this.sftpData;
            // },
            getDsList() {
                // getDsListByTeamNameAndDsType
                axiosGet({
                    url: '/ds/getDsListByTeamNameAndDsType',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsType: 'oss'
                    }
                }).then(res => {
                    this.ossDsDataList = res.data;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });


                axiosGet({
                    url: '/ds/getDsListByTeamNameAndDsType',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsType: 'sftp'
                    }
                }).then(res => {
                    this.sftpDsDataList = res.data;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });








            }
        }
    }
</script>