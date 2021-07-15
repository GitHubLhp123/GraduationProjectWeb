<template>
    <div>
        <div style="height: 100px;">
            <el-steps :active="stepIndex" finish-status="success">
                <el-step title="模型配置"></el-step>
                <el-step title="模型字段"></el-step>
                <el-step title="质量检查"></el-step>
            </el-steps>
            <el-button v-if="stepIndex!=0" style="margin-left: 00%;" @click="stepPre">上一步</el-button>
            <el-button v-if="stepIndex!=3" style="margin-left: 85%;" @click="stepNext">下一步</el-button>
            <el-button v-if="stepIndex==3&&(editType==='add'||editType==='edit')" style="margin-left: 85%;"
                       :disabled="saveModelFlag" @click="saveModel">保存
            </el-button>
        </div>
        <div v-if="stepIndex==0">
            <el-form label-width="80px" :model="modelData" :rules="modelDataRules" ref="modelData">
                <el-form-item label="数据源" prop="dsName">
                    <el-select v-model="modelData.dsName" :disabled="editType==='show'" @change="setDsName"
                               class="handle-select mr10"
                               filterable clearable>
                        <el-option v-for="(ele,ele_index) in dsListData" :key="ele_index"
                                   :label="ele.dsName+'\xa0\xa0\xa0'+ele.dsType"
                                   :value="ele.dsName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模式名" prop="modelSchema">
                    <el-select v-model="modelData.modelSchema" :disabled="editType==='show'" clearable
                               class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in dsSchemaListData" :key="ele_index" :label="ele"
                                   :value="ele"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="表名" prop="modelName">
                    <el-input v-model="modelData.modelName"
                              :disabled="editType==='show'|| editType==='edit'"></el-input>
                </el-form-item>
                <el-form-item label="表标签" prop="modelLabel">
                    <el-input v-model="modelData.modelLabel" :disabled="editType==='show'"></el-input>
                </el-form-item>
                <el-form-item label="层级" prop="lvl">
                    <el-select v-model="modelData.lvl" :disabled="editType==='show'" clearable
                               class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in lvl" :key="ele_index" :label="ele.value"
                                   :value="ele.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主题" prop="topic">
                    <el-select v-model="modelData.topic" :disabled="editType==='show'" clearable
                               class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in topic" :key="ele_index" :label="ele.label"
                                   :value="ele.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="敏感级别" prop="modelSensLvl">
                    <el-select v-model="modelData.modelSensLvl" :disabled="editType==='show'" clearable
                               class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in modelSensLvl" :key="ele_index" :label="ele.label"
                                   :value="ele.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="周期类型" prop="cycleType">
                    <el-select v-model="modelData.cycleType" :disabled="editType==='show'" clearable
                               class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in cycleType" :key="ele_index" :label="ele.label"
                                   :value="ele.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="modelDescr">
                    <el-input v-model="modelData.modelDescr" :disabled="editType==='show'"></el-input>
                </el-form-item>
                <el-form-item label="是否公用表" prop="isPublic" >
                    <el-switch v-model="modelData.isPublic"  :disabled="editType==='show'"
                               active-value="1"
                               inactive-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item label="生命周期" prop="storageTime">
                    <el-select v-model="modelData.storageTime" :disabled="editType==='show'" clearable
                               class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in storageTime" :key="ele_index" :label="ele.label"
                                   :value="ele.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </div>
        <div v-if="stepIndex===1">
            <mysql-column-data v-if="dsType==='mysql'" ref="mysqlColumnData"
                               v-bind:mysqlColumnData="columnData" v-bind:columnEditType="editType"></mysql-column-data>
        </div>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import MysqlColumnData from './MysqlColumnData';

    export default {
        props: {
            editType: String,
            modelId: String,
        },
        components: {MysqlColumnData},
        name: 'addModel',
        data() {
            return {
                saveModelFlag: false,
                modelData: {
                    modelId: '',
                    modelName: '',
                    dsName: '',
                    modelSchema: '',
                    modelLabel: '',
                    modelDescr: '',
                    modelSensLvl: '',
                    lvl: '',
                    topic: '',
                    cycleType: '',
                    isPublic: 0,
                    storageTime: '',
                    state: 'NEW',
                    teamName: ''
                },
                modelSensLvl: [
                    {label: '1级敏感', value: "1"},
                    {label: '2级敏感', value: "2"},
                    {label: '3级敏感', value: "3"}
                ],
                cycleType: [
                    {label: '年', value: "year"},
                    {label: '月', value: "month"},
                    {label: '周', value: "week"},
                    {label: '日', value: "day"},
                    {label: '时', value: "hour"},
                    {label: '分', value: "minute"},
                ],
                topic: [
                    {label: '主题1', value: "value1"},
                    {label: '主题2', value: "value2"}
                ],
                lvl: [
                    {label: 'ods', value: "ods"},
                    {label: 'dwd', value: "dwd"},
                    {label: 'shared', value: "shared"},
                    {label: 'fusion', value: "fusion"},
                    {label: 'pre', value: "pre"},
                ],
                storageTime: [
                    {label: '年', value: "year"},
                    {label: '月', value: "month"},
                    {label: '周', value: "week"},
                    {label: '日', value: "day"},
                    {label: '时', value: "hour"},
                    {label: '分', value: "minute"},
                ],
                stepIndex: 0,
                dsType: "mysql",
                dsListData: [],
                dsSchemaListData: [],
                columnData: [],
                modelDataRules: {
                    modelName: [
                        {required: true, message: '请输入模型名', trigger: 'blur'},
                    ],
                    dsName: [
                        {required: true, message: '请选择数据源', trigger: 'blur'},
                    ],
                    modelSchema: [
                        {required: true, message: '请选择数据源Schema', trigger: 'blur'},
                    ],
                    modelLabel: [
                        {required: true, message: '请输入标签', trigger: 'blur'},
                    ],
                    modelDescr: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    lvl: [
                        {required: true, message: '请选择层级', trigger: 'blur'},
                    ],
                    topic: [
                        {required: true, message: '请选择主题', trigger: 'blur'},
                    ],
                    cycleType: [
                        {required: true, message: '请选择周期', trigger: 'blur'},
                    ],
                }

            }
        },
        created() {

            this.getDsListData();
            this.init();
            this.getLevelData();
        },
        mounted() {

        },
        beforeUpdate() {

        },
        methods: {

            init() {
                if (this.editType === 'show' || this.editType === 'edit') {
                    console.log('show' + '进来展示');
                    this.getModelByModelId();
                    this.getModelFieldListByModelId()
                } else {
                    //否则为add模型，需要初始化一些信息


                }

            },
            setDsName() {
                //根据数据源设置schema
                let dsInfo = this.dsListData.filter(ele => ele.dsName == this.modelData.dsName)[0];
                this.modelData.modelSchema = '';
                this.dsSchemaListData = dsInfo.dsSchema.split("|")[0].split(",");
                this.dsType = dsInfo.dsType;
                this.modelData.modelSchema = this.dsSchemaListData[0];
            },
            getDsListData() {
                axiosGet({
                    url: '/ds/getDsListByTeamName',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName
                    }
                }).then(res => {
                    console.log(res);
                    this.dsListData = res.data;

                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },

            check() {

            },
            checkModelByName() {
                let flag = true;
                axiosGet({
                    url: '/model/checkExistedModel',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsName: this.modelData.dsName,
                        modelName: this.modelData.modelName,
                        modelSchema: this.modelData.modelSchema
                    }
                }).then(res => {
                    if (res.data !== undefined) {
                        let flag = false;
                        this.$message({
                            message: '模型已存在' + res.data,
                            type: 'warning'
                        });
                    }

                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
                return flag;
            },
            stepNext() {

                // if (this.stepIndex == 0) {
                //
                //     console.log(this.modelData.modelName + "1" + this.modelData.dsName + "2" + this.modelData.modelSchema + "3" + this.modelData.modelLabel + "4" + this.modelData.modelDescr + "5" + this.modelData.lvl + "6" + this.modelData.topic + "7" + this.modelData.cycleType);
                //     if (
                //         this.modelData.modelName === '' || this.modelData.dsName === '' ||
                //         this.modelData.modelSchema === '' || this.modelData.modelLabel === '' ||
                //         this.modelData.modelDescr === '' || this.modelData.lvl === '' ||
                //         this.modelData.topic === '' || this.modelData.cycleType === '' || !this.checkModelByName()
                //     ) {
                //         this.$message.error('请配置所有信息');
                //         return;
                //     }
                //     ;
                //
                // }
                // if (this.stepIndex == 1) {
                //
                //     if (this.dsType === 'mysql') {
                //         let columnData = this.$refs.mysqlColumnData.getColumnData();
                //         let returnData = columnData.map(ele => {
                //             if (ele.columnLabel === '' || ele.columnName === '' || ele.columnName === 'precisionVal') {
                //                 return false;
                //             }
                //         });
                //         console.log('returnData' + returnData);
                //         if (returnData.toString().indexOf('false') > -1) {
                //             this.$message.error('请配置所有信息');
                //             return;
                //         }
                //         this.columnData = columnData;
                //     }
                //
                // }
                this.stepIndex++;
            },
            stepPre() {
                this.stepIndex--;


            },
            getLevelData() {

                axiosGet({
                    url: '/team/getTeamLevel',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName
                    }
                }).then(res => {
                    this.lvl = res.data;
                }).catch(err => {

                });
            },
            getModelByModelId() {
                axiosGet({
                    url: '/model/getModelByModelId',
                    methods: 'get',
                    params: {
                        modelId: this.modelId
                    }
                }).then(res => {
                    this.modelData = res.data;

                }).catch(err => {

                });
            },
            getModelFieldListByModelId() {
                axiosGet({
                    url: '/model/getModelFieldListByModelId',
                    methods: 'get',
                    params: {
                        modelId: this.modelId
                    }
                }).then(res => {
                    this.columnData = res.data;
                    console.log("getModelFieldListByModelId" + res);
                }).catch(err => {

                });
            },
            saveModel() {
                let teamName = this.$store.state.personInfo.currentTeam.teamName;
                if (this.editType === 'add') {
                    this.modelData.modelId = teamName + "_" + uuid.v1();
                    this.modelData.teamName = teamName;

                }
                console.log({
                    "modelData": JSON.stringify(this.modelData),
                    "columnData": JSON.stringify(this.columnData)
                });
                axiosPost('/model/saveModel',
                    {
                        "modelData": JSON.stringify(this.modelData),
                        "columnData": JSON.stringify(this.columnData)
                    }
                ).then(res => {
                    console.log(res);
                    if (res.status == 100) {
                        this.$message({
                            message: '保存失败' + res.message,
                            type: 'warning'
                        });
                        return;
                    }
                    this.stepIndex = 0;
                    this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success'
                    });

                }).catch(err => {

                });

            }
        }
    }
</script>