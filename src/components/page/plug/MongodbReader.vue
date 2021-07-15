<template>
    <div>

        <el-form label-width="100px" class="demo-ruleForm" :val="mongodbreaderData">
            <el-form-item label="数据源" prop="dsName">
                <el-select v-model="mongodbreaderData.dsName" @change="setDsName"
                           class="handle-select mr10"
                           filterable clearable>
                    <el-option v-for="(ele,ele_index) in dsDataList" :key="ele_index"
                               :label="ele.dsName"
                               :value="ele.dsName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模式名" prop="dsSchema">
                <el-select v-model="mongodbreaderData.dsSchema" clearable
                           class="handle-select mr10">
                    <el-option v-for="(ele,ele_index) in dsSchemaListData" :key="ele_index" :label="ele"
                               :value="ele"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="集合名" prop="collectionName">
                <el-input  v-model="mongodbreaderData.collectionName"></el-input>
            </el-form-item>
            <el-button @click="addColumn">添加字段</el-button>
            <el-form-item label="字段" prop="column">
                <el-table :data="mongodbreaderData.column">
                    <el-table-column prop="name" label="名称">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.type" clearable
                                       class="handle-select mr10">
                                <el-option v-for="(ele,ele_index) in mongodbTypeList" :key="ele_index" :label="ele"
                                           :value="ele"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="delete" label="删除字段">
                        <template slot-scope="scope">
                            <el-button @click="deleteColumn(scope.row.name)">删除字段</el-button>
                        </template>
                    </el-table-column>
                </el-table>


            </el-form-item>

        </el-form>

    </div>
</template>
<script>
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: "mongodbReader",
        props: {
            mysqlReaderKey: String,
            data: {
                type: Object
            }
        },
        data() {
            return {
                value: {
                    type: Object
                },
                mongodbTypeList: ["String", "int", "Long", "double", "array", "date", "boolean", "bytes"],
                dsDataList: [],
                dsSchemaListData: [],
                mongodbreaderData: {
                    key: '',
                    label: 'mongodbReader',
                    name: 'mongodbReader',
                    dsName: '',
                    column: [],
                    collectionName:'',
                    dsSchema: '',
                    collectionName:''
                }
            }
        },
        created() {
            this.getMysqlDsList();

            this.mongodbreaderData = {
                key: this.data.key,
                label: this.data.label,
                name: this.data.name,
                dsName: this.data.dsName,
                column: JSON.parse(this.data.column),
                dsSchema: this.data.dsSchema,
                collectionName:this.data.collectionName
            }
        },
        watch: {
            mongodbreaderData: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    console.log(this.mongodbreaderData);
                    let column=JSON.stringify(this.mongodbreaderData.column);
                    this.mongodbreaderData.columnList=column;
                    this.$emit('input', this.mongodbreaderData);
                },
                deep: true
            }
        },
        methods: {
            deleteColumn(name) {
                this.mongodbreaderData.column = this.mongodbreaderData.column.filter(ele => ele.name != name);
            },
            addColumn() {
                this.mongodbreaderData.column.push({name: '', type: ''});
            },
            setDsName() {
                let dsInfo = this.dsDataList.filter(ele => ele.dsName == this.mongodbreaderData.dsName)[0];
                this.mongodbreaderData.dsSchema = '';
                this.dsSchemaListData = dsInfo.dsSchema.split("|")[0].split(",");
                this.mongodbreaderData.dsSchema = this.dsSchemaListData[0];
            },
            // getMysqlReaderData() {
            //     this.mongodbreaderData.key = this.mysqlWriterKey;
            //     this.$emit('mongodbreaderData', this.mongodbreaderData, this.mysqlReaderKey);
            //     //   return this.mongodbreaderData;
            // },
            getMysqlDsList() {
                // getDsListByTeamNameAndDsType
                axiosGet({
                    url: '/ds/getDsListByTeamNameAndDsType',
                    methods: 'get',
                    params: {
                        teamName: this.$store.state.personInfo.currentTeam.teamName,
                        dsType: 'mongodb'
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