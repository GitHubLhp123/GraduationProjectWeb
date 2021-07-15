<template>
    <div>

        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in runSqlData"
                    :key="item.tabId"
                    :label="'query_'+item.tabLabel"
                    :name="item.tabId">
                <el-form label-width="80px">
                    <el-form-item label="数据源" prop="dsName">
                        <el-select v-model="item.dsName" @change="setDsName(item)"
                                   class="handle-select mr10"
                                   filterable clearable>
                            <el-option v-for="(ele,ele_index) in dsListData" :key="ele_index"
                                       :label="ele.dsName+'\xa0\xa0\xa0'+ele.dsType"
                                       :value="ele.dsName"></el-option>
                        </el-select>
                        <el-select v-model="item.schema" clearable class="handle-select mr10">
                            <el-option v-for="(ele,ele_index) in dsSchemaListData" :key="ele_index" :label="ele"
                                       :value="ele"></el-option>
                        </el-select>
                        <el-button
                                size="small"
                                @click="addTab(editableTabsValue)">
                            add tab
                        </el-button>
                    </el-form-item>
                </el-form>
                <SqlEditor ref="sqleditor"
                           :value="item.runSql"
                           @changeTextarea="changeTextarea(item,$event)"/>
                <el-button type="primary" size="small" class="sql-btn" @click="formaterSql (item)">
                    格式化sql
                </el-button>
                <el-button type="primary" size="small" v-if="item.isRun" class="sql-btn" @click="runSql(item)">
                    执行sql
                </el-button>
                <el-button type="primary" size="small" v-if="!item.isRun" class="sql-btn" @click="runSql(item)">
                    取消执行
                </el-button>
                <div v-if="item.isOverEun">
                    <el-tabs v-model="item.activeResultName"
                             @tab-click="handleResultTabClick">
                        <template>
                            <el-tab-pane v-for="(dataList,index) in item.dataList"
                                         :key="'result_'+(index+1)"
                                         :label="'result_'+(index+1)"
                                         :name="'result_'+(index+1)">
                                <div>
                                    <span>{{dataList.executeInfo}}</span>
                                    <el-divider></el-divider>
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="1"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="10"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="dataList.pageSet.total">
                                    </el-pagination>
                                </div>
                                <el-table
                                        highlight-current-row
                                        style="font-size: 10px"
                                        :data="dataList.showTableData"
                                        border
                                        :show-header="true">
                                    <el-table-column label="ID"
                                                     type="index"
                                                     :index="countIndex"
                                                     width="50">

                                    </el-table-column>
                                    <el-table-column
                                            type="selection"
                                            width="50">
                                    </el-table-column>
                                    <template v-for="(ele,index) in dataList.columnNames">
                                        <el-table-column show-overflow-tooltip :key="index" :prop="ele.prop"
                                                         :label="ele.label"
                                                         align="left">
                                            <template slot-scope="scope">
                                                        <span>
                                                {{scope.row[ele.prop]}}
                                                      </span>
                                            </template>
                                        </el-table-column>
                                    </template>
                                </el-table>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>
<script>
    import sqlFormatter from 'sql-formatter'
    import SqlEditor from './SqlEditor'
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';


    export default {
        components: {
            SqlEditor,

        },
        data() {
            return {
                editableTabsValue: '1',
                tabIndex: 1,
                dsListData: [],
                dsSchemaListData: [],
                runSqlData: [
                    {
                        tabId: "1",
                        tabLabel: "1",
                        runSql: '#以防他人恶意删库#暂时写死，后台默认执行select * from model limit 30;show tables;',
                        dsName: 'mysql',
                        schema: 'my_project',
                        dsType: 'mysql',
                        isRun: true,
                        dataList: [{
                            columnNames: [],
                            tableData: [],
                            showTableData: [],
                            executeInfo: '',
                            pageSet: {
                                pageSize: 10,
                                pageIndex: 1,
                                total: 0
                            },

                        }],
                        isOverEun: false,
                        activeResultName: 'result_1'
                    }
                ],

            }
        },
        created() {
            this.getDsListData();
        },
        methods: {
            handleResultTabClick(tab, event) {
                console.log(tab, event);
            },
            handleSizeChange(val) {
                console.log(Number(this.editableTabsValue));
                let param1 = Number(this.editableTabsValue);//那个查询窗口
                let param2 = Number(this.runSqlData[Number(this.editableTabsValue) - 1].activeResultName.split("_")[1]);
                this.runSqlData[Number(this.editableTabsValue) - 1].dataList[param2 - 1].pageSet.pageSize = val;
                let data = this.runSqlData[Number(this.editableTabsValue) - 1].dataList[param2 - 1];

                if ((data.pageSet.pageIndex) * data.pageSet.pageSize <= data.tableData.length) {
                    data.showTableData = data.tableData.slice((data.pageSet.pageIndex - 1) * data.pageSet.pageSize, (data.pageSet.pageIndex) * data.pageSet.pageSize);
                } else {
                    data.showTableData = data.tableData.slice((data.pageSet.pageIndex - 1) * data.pageSet.pageSize, data.tableData.length);
                }


                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let param1 = Number(this.editableTabsValue);//那个查询窗口
                let param2 = Number(this.runSqlData[Number(this.editableTabsValue) - 1].activeResultName.split("_")[1]);
                this.runSqlData[Number(this.editableTabsValue) - 1].dataList[param2 - 1].pageSet.pageIndex = val;
                let data = this.runSqlData[Number(this.editableTabsValue) - 1].dataList[param2 - 1];

                if ((data.pageSet.pageIndex) * data.pageSet.pageSize <= data.tableData.length) {
                    data.showTableData = data.tableData.slice((data.pageSet.pageIndex - 1) * data.pageSet.pageSize, (data.pageSet.pageIndex) * data.pageSet.pageSize);
                } else {
                    data.showTableData = data.tableData.slice((data.pageSet.pageIndex - 1) * data.pageSet.pageSize, data.tableData.length);
                }
            },
            countIndex(index) {

                let param1 = Number(this.editableTabsValue);//那个查询窗口
                let param2 = Number(this.runSqlData[Number(this.editableTabsValue) - 1].activeResultName.split("_")[1]);
                let data = this.runSqlData[Number(this.editableTabsValue) - 1].dataList[param2 - 1];
                return (data.pageSet.pageIndex - 1) * data.pageSet.pageSize + index + 1;

            },
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.runSqlData.push({
                    tabId: newTabName,
                    tabLabel: newTabName,
                    runSql: '',
                    dsName: '',
                    schema: '',
                    dsType: '',
                    isRun: true,
                    dataList: [{
                        columnNames: [],
                        tableData: [],
                        showTableData: [],
                        executeInfo: '',
                        pageSet: {
                            pageSize: 10,
                            pageIndex: 1,
                            total: 0
                        },

                    }],
                    activeResultName: 'result_1',
                    isOverEun: false
                })
                ;
                this.editableTabsValue = newTabName;
                console.log(this.runSqlData);
            },
            removeTab(targetName) {
                let tabs = this.runSqlData;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.tabId === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.tabId;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.runSqlData = tabs.filter(tab => tab.tabId !== targetName);
            },

            setResultData(res, item) {
                item.dataList = [];
                console.log("======1==============:" + res.data.length);
                let i = 0;
                for (i; i < res.data.length; i++) {
                    console.log("=数据==:" + i);
                    {
                        item.dataList.push({
                            columnNames: [],
                            tableData: [],
                            showTableData: [],
                            executeInfo: '',
                            pageSet: {
                                pageSize: 10,
                                pageIndex: 1,
                                total: 0
                            },
                            activeResultName: 'result_1'
                        });
                    }


                    if (res.data[i].status === 100) {
                        item.dataList[i].executeInfo = res.data[i].sql + "; \n " + res.data[i].message;
                    } else {
                        if (res.data[i].type === 'ResultData') {
                            item.dataList[i].executeInfo = res.data[i].sql + "; \n " + res.data[i].executeTime;
                            item.dataList[i].tableData = res.data[i].data;
                            let columnNames = new Array;
                            res.data[i].columnNames.forEach(ele => {
                                columnNames.push({label: ele, prop: ele})
                            });
                            item.dataList[i].columnNames = columnNames;
                            let data = item.dataList[i];
                            if ((data.pageSet.pageIndex) * data.pageSet.pageSize <= data.tableData.length) {
                                data.showTableData = data.tableData.slice((data.pageSet.pageIndex - 1) * data.pageSet.pageSize, (data.pageSet.pageIndex) * data.pageSet.pageSize);
                            } else {
                                data.showTableData = data.tableData.slice((data.pageSet.pageIndex - 1) * data.pageSet.pageSize, data.tableData.length);
                            }


                            item.dataList[i].pageSet.total = (item.dataList[i].tableData.length);

                            console.log(item.dataList[i].columnNames);
                            console.log(item.dataList[i].tableData);
                        } else if (res.data[i].type === 'UpdateData') {
                            //successRow
                            item.dataList[i].executeInfo = res.data[i].sql + "; \n " + res.data[i].executeTime + "成功行数：" + res.data[i].successRow;
                        } else if (res.data[i].type === 'ExecuteData') {
                            //successRow
                            item.dataList[i].executeInfo = res.data[i].sql + "; \n " + res.data[i].executeTime + "执行成功";
                        }


                    }

                }
                item.isOverEun = true;

            },
            runSql(item) {
                item.isOverEun = false;
                item.isRun = false;

                let runSQlDataTemp = {
                    runSql: item.runSql,
                    dsName: item.dsName,
                    dsSchema: item.schema,
                    dsType: item.dsType,
                    teamName: this.$store.state.personInfo.currentTeam.teamName,
                    userName: this.$store.state.personInfo.user.userName
                };
                axiosPost('/ds/runSql',
                    {
                        "runSqlData": JSON.stringify(runSQlDataTemp),
                    }
                ).then(res => {
                    item.isRun = true;
                    this.setResultData(res, item);

                }).catch(err => {

                    this.$notify({
                        title: '警告',
                        message: '保存失败',
                        type: 'warning'
                    });
                });


            },
            setDsName(item) {
                let dsInfo = this.dsListData.filter(ele => ele.dsName == item.dsName)[0];
                console.log(dsInfo);
                this.dsSchemaListData = dsInfo.dsSchema.split("|")[0].split(",");
                item.schema = this.dsSchemaListData[0];
                item.dsType = dsInfo.dsType;

            },
            changeTextarea(item, val) {
                this.$set(item, 'runSql', val)
            },
            formaterSql(item) {
                let dom = this.$refs.sqleditor[parseInt(item.tabId) - 1];
                dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
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
        },
    }
</script>
