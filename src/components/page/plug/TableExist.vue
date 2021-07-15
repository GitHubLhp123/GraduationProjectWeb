<template>

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
</template>

<script>
    export default {
        name: "TableExist",
        data(){
            return{
                TableExist:{
                    dsType:'',
                    dsName:'',
                    dsSchema:'',
                    tableName:''
                }
            }
        }
    }
</script>

<style scoped>

</style>