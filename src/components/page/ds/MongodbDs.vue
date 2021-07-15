<template>
    <div>

        <el-form :model="mongodb.dsData" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="数据源id">
                <el-input v-model="mongodb.dsData.dsId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="数据源名称" prop="dsName">
                <el-input v-model="mongodb.dsData.dsName" :disabled="isShow"></el-input>
            </el-form-item>
            <el-form-item label="ip:端口" prop="dsInstLoc">
                <el-input v-model="mongodb.dsData.dsInstLoc"></el-input>
            </el-form-item>
            <el-form-item label="库名" prop="dsSchema">
                <el-input v-model="mongodb.dsData.dsSchema"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="dsUser">
                <el-input v-model="mongodb.dsData.dsUser"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="dsPassword">
                <el-input v-model="mongodb.dsData.dsPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="扩展属性" prop="extendCfg">
                <el-input v-model="mongodb.dsData.extendCfg"></el-input>
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
        name: "mongodbDs",
        created() {
            if (this.dsId !== undefined) {
                this.isShow = true;
                this.getDsData(this.dsId);
            } else {
                //没有传dsid则为新增
                this.mongodb.dsData = {
                    dsId: uuid.v1(),
                    dsType: 'mongodb',
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
                mongodb: {
                    dsData: {
                        dsType: 'mongodb',
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
                if (!this.mongodb.dsData.isOverTest) {
                    console.log("come in" + this.mongodb.dsData.isOverTest);
                    return;
                }

                axiosPost('/ds/saveDs',
                    {
                        "dsData": JSON.stringify(this.mongodb.dsData)
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
                    this.mongodb.dsData = res.data;
                    this.mongodb.dsData.isOverTest = true;
                    this.oldPassword = this.mongodb.dsData.dsPassword;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
            encryptorDsPassword() {
                if (this.oldPassword === this.mongodb.dsData.dsPassword) {
                    this.testDs();
                    return;
                }
                axiosGet({
                    url: '/ds/encryptorDsPassword',
                    methods: 'get',
                    params: {
                        dsPassword: this.mongodb.dsData.dsPassword
                    }
                }).then(res => {
                    console.log(res);
                    this.mongodb.dsData.dsPassword = res.data;
                    this.oldPassword = res.data;
                    this.testDs();
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }, testDs() {
                axiosPost('/ds/testDsConnectivity',
                    {
                        "dsData": JSON.stringify(this.mongodb.dsData)
                    }
                ).then(res => {
                    if (res.message === undefined) {//此处不能用200来判断
                        this.mongodb.dsData.isOverTest = true;
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
                        this.mongodb.dsData.isOverTest = false;
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