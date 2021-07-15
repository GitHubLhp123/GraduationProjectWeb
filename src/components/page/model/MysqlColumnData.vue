<template>
    <div>


        <el-table :data="mysqlColumnData">
            <el-table-column prop="columnName" label="名称">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.columnName"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="columnLabel" label="字段标签">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.columnLabel"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="defValue" label="默认值">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.defValue"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="length" label="长度">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.length"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="precisionVal" label="精确度">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.precisionVal"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.type" class="handle-select mr10">
                        <el-option v-for="(ele,ele_index) in mysql.FieldTypes" :key="ele_index"
                                   :label="ele"
                                   :value="ele"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="primaryKey" label="主键">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.primaryKey" :width="50"
                               active-value="1"
                               inactive-value="0"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="isnullAble" label="为空">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isnullAble" :width="50"
                               active-value="1"
                               inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    export default {
        name: "MysqlColumnData",
        props: {
            mysqlColumnData: Array,
            columnEditType: String,

        },
        created() {


            if (this.mysqlColumnData.length === 0) {
                //表示第一次进来
                this.addItem();
            }


        },
        data() {
            return {
                mysql: {
                    columnData: [{
                        columnLabel: "",
                        columnName: '',
                        primaryKey: '0',
                        defValue: '',
                        isnullAble: '0',
                        precisionVal: '',
                        type: ''
                    }],
                    FieldTypes: ["tinyint", "smallint", "mediumint", "int", "bigint", "float", "double", "decimal", "char", "varchar", "tinyblob", "tinytext", "blob", "text", "mediumblob", "mediumtext", "logngblob", "longtext", "varbinary", "binary", "date", "time", "year", "datetime", "timestamp", "numeric"],
                    columnDataRules: {
                        columnName: [
                            {required: true, message: '请输入字段名', trigger: 'blur',},
                        ],
                        precisionVal: [
                            {required: true, message: '请输入精确度', trigger: 'blur'},
                        ],
                        type: [
                            {required: true, message: '请选择类型', trigger: 'blur'},
                        ]


                    }
                },
            }
        },
        beforeUpdate() {

        },
        methods: {
            addItem() {
                this.mysqlColumnData.push({
                    columnLabel: "",
                    columnName: '',
                    primaryKey: '0',
                    defValue: '',
                    isnullAble: '0',
                    precisionVal: '',
                    type: ''
                });
            },
            removeItem(index) {

                this.mysqlColumnData.splice(index, 1);
            },
            getColumnData() {
                return this.mysqlColumnData;
            },
            setColumnData(columnData) {
                console.log('columnData' + columnData);

            }
        },
    }
</script>

<style scoped>

</style>