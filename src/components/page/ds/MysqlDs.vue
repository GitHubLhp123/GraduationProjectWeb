<template>
    <div>

        <el-form :model="mysql.dsData" :rules="mysql.dsDataRules" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="数据源id">
                <el-input v-model="mysql.dsData.dsId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="数据源名称" prop="dsName">
                <el-input v-model="mysql.dsData.dsName" :disabled="isShow"></el-input>
            </el-form-item>
            <el-form-item label="ip:端口" prop="dsInstLoc">
                <el-input v-model="mysql.dsData.dsInstLoc"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="dsUser">
                <el-input v-model="mysql.dsData.dsUser"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="dsPassword">
                <el-input v-model="mysql.dsData.dsPassword" show-password></el-input>
            </el-form-item>

            <el-form-item label="schema" prop="dsSchema">
                <el-input v-model="mysql.dsData.dsSchema"></el-input>
            </el-form-item>
            <el-form-item label="扩展属性" prop="extendCfg">
                <el-input v-model="mysql.dsData.extendCfg"></el-input>
            </el-form-item>
            <el-form-item label="dsUrl">
                <el-input type="textarea" v-model="mysql.dsData.dsUrl"></el-input>
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
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {
            dsType: String,
            dsId: String
        },
        name: "dsData",
        data() {
            return {
                isShow: false,
                oldPassword: '',
                mysql: {
                    dsData: {
                        dsType: 'mysql',
                        dsId: '',
                        dsName: '',
                        dsInstLoc: '',
                        dsUser: '',
                        dsPassword: '',
                        dsSchema: '',
                        extendCfg: '',
                        dsUrl: '',
                        isOverTest: false

                    },
                    dsDataRules: {
                        dsName: [
                            {required: true, message: '请输入数据源名称', trigger: 'blur'},
                        ],
                        dsInstLoc: [
                            {required: true, message: '请输入ip和端口', trigger: 'blur'},
                        ],
                        dsUser: [
                            {required: true, message: '请输入账号', trigger: 'blur'},
                        ],
                        dsPassword: [
                            {required: true, message: '请输入密码', trigger: 'blur'},
                        ],
                        dsType: [
                            {required: true, message: '请选择数据类型', trigger: 'blur'},
                        ],

                    }
                },

            };
        },
        created() {

            if (this.dsId !== undefined) {
                this.isShow = true;
                this.getDsData(this.dsId);
            } else {
                //没有传dsid则为新增
                this.mysql.dsData = {
                    dsType: 'mysql',
                    dsId: uuid.v1(),
                    dsName: '',
                    dsInstLoc: '',
                    dsUser: '',
                    dsPassword: '',
                    dsSchema: '',
                    extendCfg: '',
                    dsUrl: '',
                    isOverTest: false,
                    teamName: this.$store.state.personInfo.currentTeam.teamName,

                };
            }

            console.log("初始化info " + new Date());

        },
        methods: {
            getDsData(dsIdParam) {
                axiosGet({
                    url: '/ds/getDsByDsId',
                    methods: 'get',
                    params: {
                        dsId: dsIdParam
                    }
                }).then(res => {
                    console.log(res);
                    this.mysql.dsData = res.data;
                    this.mysql.dsData.isOverTest = true;
                    this.oldPassword = this.mysql.dsData.dsPassword;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },

            saveDs() {
                this.testDs();

                if (!this.mysql.dsData.isOverTest) {
                    console.log("come in" + this.mysql.dsData.isOverTest);
                    return;
                }

                axiosPost('/ds/saveDs',
                    {
                        "dsData": JSON.stringify(this.mysql.dsData)
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
            encryptorDsPassword() {

                if (this.oldPassword === this.mysql.dsData.dsPassword) {
                    this.testDs();
                    return;
                }

                axiosGet({
                    url: '/ds/encryptorDsPassword',
                    methods: 'get',
                    params: {
                        dsPassword: this.mysql.dsData.dsPassword
                    }
                }).then(res => {
                    console.log(res);
                    this.mysql.dsData.dsPassword = res.data;
                    this.oldPassword = res.data;
                    this.testDs();
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },

            generateURL() {
                let dsSchemaList = Array.from(new Set(this.mysql.dsData.dsSchema.split(",")));
                this.mysql.dsData.dsUrl = '';
                if (this.mysql.dsData.dsType === 'mysql') {
                    //  jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8&relaxAutoCommit=true&zeroDateTimeBehavior=convertToNull&allowMultiQueries=true
                    dsSchemaList.forEach(ele => {
                        this.mysql.dsData.dsUrl += "jdbc:mysql://" + this.mysql.dsData.dsInstLoc + "/" + ele + '?' + this.mysql.dsData.extendCfg + "\r\n";
                    });
                }
            },
            testDs() {
                // console.log("我来测试了");
                // console.log("this.oldPassword====" + this.oldPassword);
                // console.log("this.dsPassword====" + this.mysql.dsData.dsPassword);
                // if (this.oldPassword !== this.mysql.dsData.dsPassword) {
                //     this.encryptorDsPassword();
                // }


                console.log("boolean" + this.mysql.dsData.isOverTest && (this.openType === 'edit' || this.openType === 'add'));
                this.generateURL();
                axiosPost('/ds/testDsConnectivity',
                    {
                        "dsData": JSON.stringify(this.mysql.dsData)
                    }
                ).then(res => {
                    console.log("进来2");
                    console.log(res);
                    if (res.message === undefined) {//此处不能用200来判断
                        this.mysql.dsData.isOverTest = true;
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
                        this.mysql.dsData.isOverTest = false;
                        return;
                    }


                }).catch(err => {
                    this.$message({
                        message: '测试失败\r\n' + err,
                        type: 'warning'
                    });

                });

            }
        },
        destroyed() {
            console.log('销毁');
        }
    }
</script>