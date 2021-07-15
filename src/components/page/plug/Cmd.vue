<template>
    <div>

        <el-form label-width="100px" class="demo-ruleForm" :val="cmdData">
            <el-form-item label="文件源" prop="sourceDsName">
                <el-select v-model="cmdData.sourceDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in dsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件名" prop="fileName">
                <el-input
                        :rows="3"
                        v-model="cmdData.fileName">
                </el-input>
            </el-form-item>
            <el-form-item label="执行命令" prop="cmd">
                <el-input
                        type="textarea"
                        :rows="3"
                        v-model="cmdData.cmdLine">
                </el-input>
            </el-form-item>


        </el-form>

    </div>
</template>
<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "cmd",
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
                cmdData: {
                    key: '',
                    label: 'cmd',
                    name: '执行脚本',
                    sourceDsName: '',
                    fileName: '',
                    cmdLine:''

                }
            }
        },
        created() {
            this.getOssDsList();
            this.cmdData = {
                key: '',
                label: 'cmd',
                name: '执行脚本',
                sourceDsName:this.data.sourceDsName,
                fileName: this.data.fileName,
                cmdLine:this.data.cmdLine
            }
        },
        watch: {
            cmdData: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    console.log(this.cmdData);
                    this.$emit('input', this.cmdData);
                },
                deep: true
            }
        },
        methods: {


            getOssDsList() {
                axiosGet({
                    url: '/ds/getDsListByTeamNameAndDsType',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsType: 'oss'
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