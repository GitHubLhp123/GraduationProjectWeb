<template>
    <div>

        <el-form :model="oss.dsData" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="数据源id">
                <el-input v-model="oss.dsData.dsId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="数据源名称" prop="dsName">
                <el-input v-model="oss.dsData.dsName" :disabled="isShow"></el-input>
            </el-form-item>
            <el-form-item label="ip:端口" prop="dsInstLoc">
                <el-input v-model="oss.dsData.dsInstLoc"></el-input>
            </el-form-item>
            <el-form-item label="桶名" prop="dsSchema">
                <el-input v-model="oss.dsData.dsSchema"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="dsUser">
                <el-input v-model="oss.dsData.dsUser"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="dsPassword">
                <el-input v-model="oss.dsData.dsPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="扩展属性" prop="extendCfg">
                <el-input v-model="oss.dsData.extendCfg"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="encryptorDsPassword">测试</el-button>
                <el-button
                        type="primary"
                        @click="saveDs">保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    export default {
        props: {
            dsType: String,
            dsId: String
        },
        name: "ossDs",
        created() {
            if (this.dsId !== undefined) {
                this.isShow = true;
                this.getDsData(this.dsId);
            } else {
                //没有传dsid则为新增
                this.oss.dsData = {
                    dsId: uuid.v1(),
                    dsType: 'oss',
                    dsName: '',
                    dsSchema: '',
                    dsInstLoc: '',
                    dsUser: '',
                    dsPassword: '',
                    extendCfg: '',
                    isOverTest: false,
                    teamName: this.$store.state.personInfo.currentTeam.teamName,
                };
            }

            console.log("初始化info " + new Date());
        },
        data() {
            return {
                isShow: false,
                oldPassword: '',
                oss: {
                    dsData: {
                        dsType: 'oss',
                        dsId: '',
                        dsSchema: '',
                        dsName: '',
                        dsInstLoc: '',
                        dsUser: '',
                        dsPassword: '',
                        extendCfg: '',
                        isOverTest: false
                    },
                }
            }
        },
        methods: {
            saveDs() {
                this.testDs();
                if (!this.oss.dsData.isOverTest) {
                    console.log("come in" + this.oss.dsData.isOverTest);
                    return;
                }

                axiosPost('/ds/saveDs',
                    {
                        "dsData": JSON.stringify(this.oss.dsData)
                    }
                ).then(res => {
                    console.log(res);
                    if (res.status === 100) {
                        this.$message({
                            message: '保存失败\r\n' + res.message,
                            type: 'warning'
                        });
                        return;
                    }
                    this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success'
                    });
                    this.$emit('saveDsSuccess');//保存成功了，父组件刷新数据
                }).catch(err => {
                    this.$message({
                        message: '保存失败\r\n' + err,
                        type: 'warning'
                    });
                });

            },
            getDsData(dsIdParam) {
                axiosGet({
                    url: '/ds/getDsByDsId',
                    methods: 'get',
                    params: {
                        dsId: dsIdParam
                    }
                }).then(res => {
                    console.log(res);
                    this.oss.dsData = res.data;
                    this.oss.dsData.isOverTest = true;
                    this.oldPassword = this.oss.dsData.dsPassword;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
            encryptorDsPassword() {
                if (this.oldPassword === this.oss.dsData.dsPassword) {
                    this.testDs();
                    return;
                }
                axiosGet({
                    url: '/ds/encryptorDsPassword',
                    methods: 'get',
                    params: {
                        dsPassword: this.oss.dsData.dsPassword
                    }
                }).then(res => {
                    console.log(res);
                    this.oss.dsData.dsPassword = res.data;
                    this.oldPassword = res.data;
                    this.testDs();
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }, testDs() {
                axiosPost('/ds/testDsConnectivity',
                    {
                        "dsData": JSON.stringify(this.oss.dsData)
                    }
                ).then(res => {
                    if (res.message === undefined) {//此处不能用200来判断
                        this.oss.dsData.isOverTest = true;
                        console.log("进来222222222222");
                        this.$notify({
                            title: '成功',
                            message: '测试通过',
                            type: 'success'
                        });
                        return;
                    } else {
                        console.log("进来");
                        this.$message({
                            message: '测试失败\r\n' + res.message,
                            type: 'warning'
                        });
                        this.oss.dsData.isOverTest = false;
                        return;
                    }


                }).catch(err => {
                    this.$message({
                        message: '测试失败\r\n' + err,
                        type: 'warning'
                    });

                });

            }
        }
    }
</script>

<style scoped>

</style>