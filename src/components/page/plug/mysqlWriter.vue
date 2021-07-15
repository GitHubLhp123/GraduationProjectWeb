<template>
    <div>

        <el-form label-width="100px" class="demo-ruleForm" :val="mysqlWriterData">
            <el-form-item label="数据源" prop="dsName">
                <el-select v-model="mysqlWriterData.dsName" @change="setDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in dsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模式名" prop="dsSchema">
                <el-select v-model="mysqlWriterData.dsSchema" clearable
                           class="handle-select mr10">
                    <el-option v-for="(ele,ele_index) in dsSchemaListData" :key="ele_index" :label="ele"
                               :value="ele"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="表名" prop="tableName">
                <el-input v-model="mysqlWriterData.tableName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="字段列表" prop="columns">
                <el-input type="textarea" :rows="2" autosize v-model="mysqlWriterData.columns"></el-input>
            </el-form-item>
            <el-form-item label="前置sql" prop="preSql">
                <el-input type="textarea" :rows="2" autosize v-model="mysqlWriterData.preSql"></el-input>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {
            mysqlWriterKey: String,
            value: {
                type: Object
            },
            data: {
                type: Object
            },
        },
        name: "mysqlWriter",
        data() {
            return {
                dsDataList: [],
                dsSchemaListData: [],
                mysqlWriterData: {
                    key: '',
                    label: 'mysqlWriter',
                    name: 'mysqlWriter_',
                    dsName: '',
                    tableName: '',
                    dsSchema: '',
                    preSql: '',
                    columns: 'writer',
                }

            }
        },
        created() {

            this.getMysqlDsList();
            this.mysqlWriterData = {
                key: this.data.key,
                label: this.data.label,
                name: this.data.name,
                dsName: this.data.dsName,
                tableName: this.data.tableName,
                dsSchema: this.data.dsSchema,
                preSql: this.data.preSql,
                columns: this.data.columns,
            }

        },
        computed: {
            // mysqlWriterData() {
            //     console.log("value_");
            //     ;
            // }
        },
        watch: {
            mysqlWriterData: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    console.log(this.mysqlWriterData);
                    this.$emit('input', this.mysqlWriterData);
                },
                deep: true
            }
        },
        methods: {
            setDsName() {
                let dsInfo = this.dsDataList.filter(ele => ele.dsName == this.mysqlWriterData.dsName)[0];
                this.mysqlWriterData.dsSchema = '';
                this.dsSchemaListData = dsInfo.dsSchema.split("|")[0].split(",");
                this.mysqlWriterData.dsSchema = this.dsSchemaListData[0];
            },
            getMysqlWriterData() {
                this.mysqlWriterData.key = this.mysqlWriterKey;

                //  return this.mysqlWriterData;
            },
            getMysqlDsList() {
                // getDsListByTeamNameAndDsType
                axiosGet({
                    url: '/ds/getDsListByTeamNameAndDsType',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsType: 'mysql'
                    }
                }).then(res => {
                    console.log(res);
                    this.dsDataList = res.data;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
        }
    }
</script>