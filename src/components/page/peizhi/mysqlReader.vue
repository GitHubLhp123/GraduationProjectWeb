<template>
    <div>
        <button @click="getMysqlReaderData">button</button>
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="数据源" prop="dsName">
                <el-select v-model="mysqlReaderData.dsName" @change="setDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in dsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="模式名" prop="dsSchema">
                <el-select v-model="mysqlReaderData.dsSchema" clearable
                           class="handle-select mr10">
                    <el-option v-for="(ele,ele_index) in dsSchemaListData" :key="ele_index" :label="ele"
                               :value="ele"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="表名" prop="tableName">
                <el-input v-model="mysqlReaderData.tableName" placeholder="请输入内容"></el-input>

            </el-form-item>
            <el-form-item label="sql语句" prop="sql">
                <el-input type="textarea" :rows="2" autosize v-model="mysqlReaderData.sql"></el-input>
                <el-button>格式化sql</el-button>
            </el-form-item>
            <el-form-item label="字段列表" prop="columns">
                <el-input type="textarea" :rows="2" autosize v-model="mysqlReaderData.columns"></el-input>
            </el-form-item>
            <el-form-item label="where条件" prop="where">
                <el-input type="textarea" :rows="2" autosize v-model="mysqlReaderData.where"></el-input>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "mysqlReader",
        props: {mysqlReaderKey: String},
        data() {
            return {
                dsDataList: [],
                dsSchemaListData: [],
                mysqlReaderData: {
                    key: '',
                    label: 'mysqlReader',
                    name: 'mysqlReader_',
                    dsName: '',
                    tableName: '',
                    dsSchema: '',
                    sql: '',
                    columns: 'c1,c2',
                    where: ''
                }
            }
        },
        created() {
            this.getMysqlDsList();
        },
        methods: {
            setDsName() {
                let dsInfo = this.dsDataList.filter(ele => ele.dsName == this.mysqlReaderData.dsName)[0];
                this.mysqlReaderData.dsSchema = '';
                this.dsSchemaListData = dsInfo.dsSchema.split("|")[0].split(",");
                this.mysqlReaderData.dsSchema = this.dsSchemaListData[0];
            },
            getMysqlReaderData() {
                this.mysqlReaderData.key = this.mysqlWriterKey;
                this.$emit('mysqlReaderData', this.mysqlReaderData, this.mysqlReaderKey);
                //   return this.mysqlReaderData;
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