<template>
    <div>

        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="任务名" prop="jobName">
                <el-input v-model="ruleForm.jobName" :disabled="openType==='show'"></el-input>
            </el-form-item>
            <el-form-item label="任务标签" prop="jobLabel">
                <el-input v-model="ruleForm.jobLabel" :disabled="openType==='show'"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-input v-model="ruleForm.state" :disabled="openType==='show'"></el-input>
            </el-form-item>
            <el-form-item label="输入表" prop="inputTabs">
                <el-input v-model="ruleForm.inputTabs" @focus="editInputTabsDialogVisible = true" :disabled="openType==='show'">
                </el-input>
            </el-form-item>
            <el-form-item label="任务依赖">
                <el-button @click="editDependsTabsDialogVisible = true">依赖</el-button>
            </el-form-item>
            <el-form-item label="输出表" prop="state">
                <el-input v-model="ruleForm.outputTabs" @focus="editOutputTabsDialogVisible = true" :disabled="openType==='show'"></el-input>
            </el-form-item>
            <el-form-item label="cron" prop="cron">
                <el-input type="text" v-model="ruleForm.cron" @focus="editCronDialogVisible = true" :disabled="openType==='show'">
                </el-input>
            </el-form-item>
            <el-form-item label="任务时间周期" required>
                <el-col :span="11">
                    <el-form-item prop="startDate">
                        <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.startDate"
                                        style="width: 100%;"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd" :disabled="openType==='show'"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">----------</el-col>
                <el-col :span="11">
                    <el-form-item prop="endDate">
                        <el-date-picker type="date" placeholder="结束时间"
                                        v-model="ruleForm.endDate"
                                        style="width: 100%;"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd" :disabled="openType==='show'">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="报警邮箱" prop="emails">
                <el-input v-model="ruleForm.emails" :disabled="openType==='show'"></el-input>
            </el-form-item>
            <el-form-item label="重试次数" prop="retryCount">
                <el-input-number v-model="ruleForm.retryCount" :min="0" :max="3" :disabled="openType==='show'"></el-input-number>
            </el-form-item>
        </el-form>
        <el-dialog
                title="提示"
                :visible.sync="editCronDialogVisible"
                width="80%">
            <cron v-model="ruleForm.cron"></cron>
        </el-dialog>
        <el-dialog
                :visible.sync="editInputTabsDialogVisible"
                width="60%">
          <div style="height:500px;">
              <tabs v-model="ruleForm.inputTabs"></tabs>
            </div>

        </el-dialog>
        <el-dialog

                :visible.sync="editOutputTabsDialogVisible"
                width="60%">
            <div style="height:500px;">
                <tabs v-model="ruleForm.outputTabs"></tabs>
            </div>
        </el-dialog>

        <el-dialog
                :visible.sync="editDependsTabsDialogVisible">
            <div style="width: 500px;height:500px;">
                <depend v-model="ruleForm.depends" v-bind:inputTabs="ruleForm.inputTabs"
                        v-bind:jobName="ruleForm.jobName"
                        v-bind:openType="openType"></depend>
            </div>

        </el-dialog>
        <el-button type="primary" @click="saveJobData" :disabled="openType==='show'" plain>保存</el-button>
    </div>

</template>
<script>
    import cron from '../Cron/index'
    import tabs from './tabs'
    import depend from './Depend'
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {
            jobName: String,
            openType: String,
        },
        components: {
            depend,
            cron, tabs
        },
        data() {
            return {
                ruleForm: {
                    depends: '',
                    inputTabs: '',
                    outputTabs: '',
                    state: '',
                    jobName: '',
                    jobLabel: '',
                    cron: '',
                    startDate: '',
                    endDate: '',
                    emails: '',
                    retryCount: '',
                },
                editCronDialogVisible: false,
                editInputTabsDialogVisible: false,
                editOutputTabsDialogVisible: false,
                editDependsTabsDialogVisible: false

            };
        },
        created() {
            this.getJobInfoByJobName();

        },
        methods: {

            getJobInfoByJobName() {
                axiosGet({
                    url: '/job/getJobInfoByJobName',
                    methods: 'get',
                    params: {
                        jobName: this.jobName
                    }
                }).then(res => {
                    this.ruleForm = res.data;
                }).catch(err => {
                });
            }
            , saveJobData() {
                console.log(this.ruleForm);

                axiosPost('/job/saveJobData',
                    {
                        "jonData": JSON.stringify(this.ruleForm),

                    }
                ).then(res => {
                    console.log(res);
                    if (res.status == 100) {
                        this.$message({
                            message: '保存失败' + res.message,
                            type: 'warning'
                        });
                        return;
                    } else {
                        this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success'
                        });
                    }


                }).catch(err => {

                });
            }
        },


        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             alert('submit!');
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // }

    }
</script>
