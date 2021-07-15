<template>
    <div>

        <el-form label-width="100px" class="demo-ruleForm" :val="sftpData">
            <el-form-item label="源Sftp" prop="sourceDsName">
                <el-select v-model="sftpData.sourceDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in dsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="目标Sftp" prop="targetDsName">
                <el-select v-model="sftpData.targetDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in dsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="目标路径" prop="targetFilePath">
                <el-input
                        v-model="sftpData.targetFilePath">
                </el-input>
            </el-form-item>
            <el-form-item label="文件名" prop="fileNameList">
                <el-input
                        type="textarea"
                        :rows="3"
                        v-model="sftpData.fileNameList">
                </el-input>
            </el-form-item>


        </el-form>

    </div>
</template>
<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "SftpToSftp",
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

                dsDataList: [],
                sftpData: {
                    key: '',
                    label: 'SftpToSftp',
                    name: 'SftpToSftp',
                    sourceDsName: '',
                    targetDsName: '',
                    fileNameList: '',
                    targetFilePath: ''
                }
            }
        },
        created() {
            this.getSftpDsList();
            this.sftpData = {
                key: '',
                label: 'SftpToSftp',
                name: 'SftpToSftp',
                sourceDsName:this.data.sourceDsName,
                targetDsName: this.data.targetDsName,
                targetFilePath: this.data.targetFilePath,
                fileNameList: this.data.fileNameList,
            }
        },
        watch: {
            sftpData: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    console.log(this.sftpData);
                    this.$emit('input', this.sftpData);
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
            getSftpDsList() {
                // getDsListByTeamNameAndDsType
                axiosGet({
                    url: '/ds/getDsListByTeamNameAndDsType',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsType: 'sftp'
                    }
                }).then(res => {
                    this.dsDataList = res.data;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
        }
    }
</script>