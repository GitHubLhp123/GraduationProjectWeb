<template>
    <section class="main">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="流程选择" name="plugs">


                <div class="container">
                    <div class="drag-box">

                        <div class="drag-box-item">
                            <div class="item-title">plugs</div>
                            <draggable v-model="plugs" @remove="removeHandle"
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
                            <draggable v-model="selectedPlugs" @remove="removeHandle" :options="dragOptions">
                                <transition-group tag="div" id="doing" class="item-ul">
                                    <div v-for="(item ,index) in selectedPlugs" class="drag-list" :key="index">
                                       {{index}} {{item.content}}
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                </div>

            </el-tab-pane>
            <el-tab-pane label="配置数据" name="second">

                {{selectedPlugs}}
            </el-tab-pane>

        </el-tabs>

    </section>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'draglist',
        data() {
            return {
                activeName:'plugs',
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
                        content: 'mysqlReader'
                    },
                    {
                        id: 2,
                        name: 'mysqlWriter',
                        content: 'mysqlWriter'
                    }
                ],
                selectedPlugs: [],

            }
        },
        components: {
            draggable
        },
        methods: {
            removeHandle(event) {
                console.log(event);
                this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            }
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
