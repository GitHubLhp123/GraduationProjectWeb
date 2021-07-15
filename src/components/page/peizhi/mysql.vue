<template>
    <div>
        <el-button @click="save()">保存获得数据</el-button>
        <el-tabs v-model="activeName">
            <el-tab-pane label="mysqlReader" name="mysqlReader">
                <mysql-reader ref="mysqlReader"></mysql-reader>
            </el-tab-pane>
            <el-tab-pane label="mysqlWriter" name="mysqlWriter">
                <mysql-writer ref="mysqlWriter"></mysql-writer>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>
<script>
    import mysqlReader from './mysqlReader';
    import mysqlWriter from './mysqlWriter';
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        components: {mysqlReader, mysqlWriter},
        name: "test",
        data() {
            return {activeName: 'mysqlReader'}
        },
        methods: {

            save() {
                console.log("我进来了 save");
                let mysqlWriterData = this.$refs.mysqlWriter.getMysqlWriterData();
                let mysqlReaderData = this.$refs.mysqlReader.getMysqlReaderData();


                let body = {
                    readerDsName: mysqlReaderData.dsName,
                    readerTableName: mysqlReaderData.tableName,
                    readerDsSchema: mysqlReaderData.dsSchema,
                    readerSql: mysqlReaderData.sql,
                    readerColumns: mysqlReaderData.columns,
                    readerWhere: mysqlReaderData.where,
                    writerColumns: mysqlWriterData.columns,
                    writerDsName: mysqlWriterData.dsName,
                    writerTableName: mysqlWriterData.tableName,
                    writerDsSchema: mysqlWriterData.dsSchema,
                    writerPreSql: mysqlWriterData.preSql,


                };


                //处理json
                axiosPost('/componentAnalysisController/mysqlAnalysis',
                    body
                ).then(res => {
                    console.log(res);


                }).catch(err => {

                });
                console.log("我出去了 save");
            }
        }


    }
</script>