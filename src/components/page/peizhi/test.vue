<template>
    <section class="main">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="流程选择" name="plugs">


                <div class="container">
                    <div class="drag-box">

                        <div class="drag-box-item">
                            <div class="item-title">plugs</div>
                            <draggable v-model="plugs" @start="start"
                                       @end="end" @remove="removeHandle"
                                       :options="{group:{name: 'sortlist',pull:'clone'},sort: true}">
                                <transition-group tag="div" id="done" class="item-ul">
                                    <div v-for="item in plugs" class="drag-list" :key="item.id">
                                        {{item.content}}
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                        <div class="drag-box-item">
                            <div class="item-title">selectedPlugs</div>
                            <draggable v-model="selectedPlugs" @start="start"
                                       @end="end" @remove="removeHandle" :options="dragOptions">
                                <transition-group tag="div" id="doing" class="item-ul">
                                    <div v-for="(item ,index) in selectedPlugs" class="drag-list"
                                         :key="index">
                                        {{index}} {{item.content}}
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                </div>

            </el-tab-pane>
            <el-tab-pane label="配置数据" name="second">
                <el-button @click="savePlugData">保存</el-button>
                <el-tabs type="card">
                    <el-tab-pane
                            v-for="(item, index) in selectedPlugsData"
                            :key="index+' '+item.key"
                            :label="index+' '+item.name"
                            :name="index+' '+item.name">
                        <div v-if="item.name==='mysqlReader'">
                            <mysql-reader v-bind:mysqlReaderKey="item.key"
                                          @mysqlReaderData="getMysqlData"></mysql-reader>
                        </div>
                        <div v-else-if="item.name==='mysqlWriter'">
                            <mysql-writer v-bind:mysqlWriterKey="item.key"
                                          @mysqlWriterData="getMysqlData"></mysql-writer>
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </el-tab-pane>

        </el-tabs>

    </section>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import draggable from 'vuedraggable'
    import mysqlReader from './mysqlReader';
    import mysqlWriter from './mysqlWriter';
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    export default {
        components: {mysqlReader, mysqlWriter, draggable},
        name: 'draglist',
        data() {
            return {
                activeName: 'plugs',
                dragOptions: {
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                plugs: [
                    {
                        id: 1,
                        name: 'mysqlReader',
                        content: 'mysqlReader',
                        key: ''
                    },
                    {
                        id: 2,
                        name: 'mysqlWriter',
                        content: 'mysqlWriter',
                        key: ''
                    }
                ],
                selectedPlugs: [],
                selectedPlugsData: [],
                data: new Map(),
            }
        },

        methods: {
            removeHandle(event) {
                console.log(event, 'event...');
                console.log(event);
                this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);


            },
            getMysqlData(data, key) {
                console.log("getMysqlData");
                console.log(data);
                console.log(key);
                let plugData = {
                    data: data,
                    key: key
                };
                this.data.set(key, data);
                console.log(this.data);

            },
            savePlugData() {
                console.log("savePlugData");
                console.log({
                    "data": JSON.stringify(this.data)

                });
                axiosPost('/plug/savePlugData',
                    {
                        "data": JSON.stringify(this.data)

                    }
                ).then(res => {
                    console.log(res);
                }).catch(err => {
                });

            },
            end(evt) {
                //   console.log(evt, 'end...');
                //   console.log(evt, 'end....');
                //   this.drag = true;
                //   console.log(evt.item);
                //   ;//可以知道拖动的本身
                //   console.log(evt.to);
                //   ;    // 可以知道拖动的目标列表
                //   console.log(evt.from);
                //   ; // 可以知道之前的列表
                //   console.log(evt.oldIndex);
                //   ; // 可以知道拖动前的位置
                //   console.log(evt.newIndex);
                //   this.selectedPlugsData = this.selectedPlugs;
                // //  this.selectedPlugsData[evt.newIndex - 1].key = uuid.v1();
                //   ; // 可以知道拖动后的位置

                if (evt.from === evt.to) {
                    console.log('evt.from===evt.to');
                    console.log(evt.newIndex - evt.oldIndex);
                    this.selectedPlugsData.splice(evt.newIndex, 0, this.selectedPlugsData[evt.oldIndex]);
                } else {

                }
                console.log('selectedPlugs');
                let selectedPlugs = this.selectedPlugs;
                this.selectedPlugsData = [];
                // for (let i = 0; i < selectedPlugs.length; i++) {
                //     let object = selectedPlugs[i];
                //     object.key = uuid.v1();
                //     this.selectedPlugsData.push(object);
                // }
                this.selectedPlugsData = this.selectedPlugs.map((item, index) => {
                    return {
                        key: uuid.v1(),
                        name: item.name,
                    }
                });

                console.log(this.selectedPlugsData);
            },
            start(evt) {
                this.drag = true
                console.log(evt, 'start...')
            },
        }
    }

</script>

<style scoped>
    .drag-box {
        display: flex;
        user-select: none;
    }

    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }

    .item-title {
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }

    .item-ul {
        padding: 0 8px 8px;
        height: 500px;
        overflow-y: scroll;
    }

    .item-ul::-webkit-scrollbar {
        width: 0;
    }

    .drag-list {
        border: 1px #e1e4e8 solid;
        padding: 10px;
        margin: 5px 0 10px;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
    }

    .drag-list:hover {
        border: 1px solid #20a0ff;
    }

    .drag-title {
        font-weight: 400;
        line-height: 25px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }

    .ghost-style {
        display: block;
        color: transparent;
        border-style: dashed
    }
</style>
