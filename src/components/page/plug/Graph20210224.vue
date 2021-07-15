<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>

        <el-button type="success" @click="saveGraph" :disabled="openType==='show'">保存</el-button>
        <el-tabs v-model="activeTabName">
            <el-tab-pane label="画板" name="first">
                <div class="super-flow-demo1">
                    <div class="node-container">
        <span
                class="node-item"
                v-for="item in nodeItemList"
                @mousedown="evt => nodeItemMouseDown(evt, item.value)">
          {{item.label}}
        </span>
                    </div>
                    <div
                            class="flow-container"
                            ref="flowContainer">
                        <super-flow
                                ref="superFlow"
                                :graph-menu="graphMenu"
                                :node-menu="nodeMenu"
                                :link-menu="linkMenu"
                                :link-base-style="linkBaseStyle"
                                :link-style="linkStyle"
                                :link-desc="linkDesc">
                            <template v-slot:node="{meta}">
                                <div
                                        @mouseup="nodeMouseUp"
                                        @click="nodeClick"
                                        class="flow-node ellipsis">
                                    {{meta.label}}
                                </div>
                            </template>
                        </super-flow>
                    </div>
                </div>

            </el-tab-pane>
            <el-tab-pane label="列表" name="second">
                <el-tabs v-model="activePlugTabName">
                    <el-tab-pane v-for="item in plugDataList" :label="item.label" :key="item.id">

                        <mysql-reader v-if="item.meta.name==='mysqlReader'" v-model="item.data"
                                      v-bind:data="item.data"></mysql-reader>
                        <mysql-writer v-if="item.meta.name==='mysqlWriter'" v-model="item.data"
                                      v-bind:data="item.data"></mysql-writer>
                    </el-tab-pane>

                </el-tabs>


            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import mysqlReader from './mysqlReader';
    import mysqlWriter from './mysqlWriter';

    const drawerType = {
        node: 0,
        link: 1
    }

    export default {
        props: {
            jobName: String,
            openType: String
        },
        components: {
            mysqlReader, mysqlWriter
        },
        created() {

            if (this.jobName === undefined) {

            } else {
                this.getPlugData();
            }
        },
        data() {
            return {
                linkArray: [],
                activeTabName: "first",
                activePlugTabName: '',
                plugDataList: [],
                drawerType,
                drawerConf: {
                    title: '',
                    visible: false,
                    type: null,
                    info: null,
                    open: (type, info) => {
                        const conf = this.drawerConf
                        conf.visible = true
                        conf.type = type
                        conf.info = info
                        if (conf.type === drawerType.node) {
                            conf.title = '节点'
                            if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
                            this.$set(this.nodeSetting, 'name', info.meta.name)
                            this.$set(this.nodeSetting, 'desc', info.meta.desc)
                        } else {
                            conf.title = '连线'
                            if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
                            this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
                        }
                    },
                    cancel: () => {
                        this.drawerConf.visible = false
                        if (this.drawerConf.type === drawerType.node) {
                            this.$refs.nodeSetting.clearValidate()
                        } else {
                            this.$refs.linkSetting.clearValidate()
                        }
                    }
                },
                linkSetting: {
                    desc: ''
                },
                nodeSetting: {
                    name: '',
                    desc: ''
                },

                dragConf: {
                    isDown: false,
                    isMove: false,
                    offsetTop: 0,
                    offsetLeft: 0,
                    clientX: 0,
                    clientY: 0,
                    ele: null,
                    info: null
                },
                nodeItemList: [
                    {
                        label: 'mysql加载',
                        value: {
                            width: 120,
                            height: 40,
                            meta: {
                                label: 'mysql加载',
                                name: 'mysqlWriter'
                            }
                        }
                    }, {
                        label: 'mysql读取',
                        value: {
                            width: 120,
                            height: 40,
                            meta: {
                                label: 'mysql读取',
                                name: 'mysqlReader'
                            }
                        }
                    }
                ],

                graphMenu: [
                    [


                        {
                            label: '全选',
                            selected: graph => {
                                graph.selectAll()
                            }
                        }
                    ]
                ],
                nodeMenu: [
                    [
                        {
                            label: '删除',
                            selected: node => {
                                node.remove()
                                this.removePlug(node);
                            }
                        },
                        {
                            label: '编辑',
                            selected: node => {
                                this.drawerConf.open(drawerType.node, node)
                            }
                        }
                    ]
                ],
                linkMenu: [],

                linkBaseStyle: {
                    color: '#666666',           // line 颜色
                    hover: '#FF0000',           // line hover 的颜色
                    textColor: '#666666',       // line 描述文字颜色
                    textHover: '#FF0000',       // line 描述文字 hover 颜色
                    font: '14px Arial',         // line 描述文字 字体设置 参考 canvas font
                    dotted: false,              // 是否是虚线
                    lineDash: [4, 4],           // 虚线时生效
                    background: 'rgba(255,255,255,0.6)'    // 描述文字背景色
                },
                fontList: [
                    '14px Arial',
                    'italic small-caps bold 12px arial'
                ]
            }
        },
        mounted() {
            document.addEventListener('mousemove', this.docMousemove)
            document.addEventListener('mouseup', this.docMouseup)
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('mousemove', this.docMousemove)
                document.removeEventListener('mouseup', this.docMouseup)
            })
        },
        methods: {
            checkGraph() {
                console.log(this.$refs.superFlow.toJSON());
                let toJson = this.$refs.superFlow.toJSON();
                let linkListData = toJson.linkList;
                let linkListLength = toJson.linkList.length;
                let nodeListData = toJson.nodeList;
                console.log(nodeListData);
                console.log(linkListData);
                let nodeListLength = toJson.nodeList.length;
                if (nodeListLength - linkListLength !== 1) {
                    this.$message.error('错了哦，检查是否有环路');
                    return;
                }
                if (nodeListLength <= 1) {
                    return;
                }

                let startMap = new Map();
                let endMap = new Map();
                linkListData.forEach(ele => {
                    startMap.set(ele.startId, ele.endId);
                    endMap.set(ele.endId, ele.startId);
                });


                this.linkArray = [];
                this.linkArray.push(linkListData[0].startId);
                console.log(startMap);
                console.log(endMap);
                this.preLink(startMap);
                this.nextLink(endMap);


                for (let index = 0; index < this.plugDataList.length; index++) {
                    let plug = this.plugDataList[index];
                    for (let subIndex = 0; subIndex < this.linkArray.length; subIndex++) {
                        let link = this.linkArray[subIndex];
                        if (plug.id === link) {
                            plug.num = subIndex;
                        }
                    }
                }
                console.log(this.plugDataList);

                this.plugDataList.sort(function (a, b) {
                    return a.num - b.num;
                });
                console.log(this.linkArray);
                return true;
            },
            saveGraph() {
                let flag = this.checkGraph();
                if (flag) {
                    // System.out.println(body.get("plugData").toString());
                    // System.out.println(body.get("linkList").toString());
                    // System.out.println(body.get("jobName"));
                    let toJson = this.$refs.superFlow.toJSON();
                    let linkListData = toJson.linkList;

                    axiosPost('/plug/saveGraphData',
                        {
                            plugData: JSON.stringify(this.plugDataList),
                            linkList: JSON.stringify(linkListData),
                            jobName: this.jobName
                        }
                    ).then(res => {
                        console.log(res);
                        this.dsDataList = res.data;
                    }).catch(err => {
                        console.log("===================");
                        console.log(err);
                    });


                }
            },
            preLink(startMap) {

                for (let [key, value] of startMap) {
                    console.log(key + ' = ' + value);
                    if (value === this.linkArray[0]) {
                        this.linkArray.unshift(key);
                        startMap.delete(key);
                        this.preLink(startMap);
                    }


                }

            },
            nextLink(endMap) {


                for (let [key, value] of endMap) {
                    console.log(key + ' = ' + value);
                    if (value === this.linkArray[this.linkArray.length - 1]) {
                        this.linkArray.push(key);
                        endMap.delete(key);
                        this.nextLink(endMap);
                    }
                }
            }
            ,
            getPlugData() {
                axiosGet({
                    url: '/plug/getGraphData',
                    methods: 'get',
                    params: {
                        jobName: this.jobName
                    }
                }).then(res => {
                    console.log(res);

                    this.setGraph(res.data);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
            ,

            setGraph(data) {
                let linkDataList = JSON.parse(data.linkData);
                let plugDataList = JSON.parse(data.plungData);
                this.plugDataList.push(...plugDataList);
                console.log("=============================");
                console.log(linkDataList);
                console.log(plugDataList);
                console.log("=============================");
                this.setGraphLink(linkDataList);
                console.log("=============================");
                this.setGraphPlug(plugDataList);
            }

            ,
            removePlug(node) {
                console.log(node);
                this.plugDataList = this.plugDataList.filter(ele => ele.id !== node.id);
            },
            setGraphPlug(plugDataList) {
                plugDataList.forEach(ele => {
                    let conf = this.dragConf;
                    console.log("ele");
                    console.log(ele);
                    this.$refs.superFlow.addNode({
                        coordinate: ele.coordinate,
                        data: ele.data,
                        height: ele.height,
                        id: ele.id,
                        label: ele.label,
                        meta: ele.meta,
                        num: ele.num,
                        width: ele.width
                    });
                });

            }
            ,
            setGraphLink(linkDataList) {
                console.log(this.$refs.superFlow.linkList.push(...linkDataList));
            }
            ,

            flowNodeClick(meta) {
                console.log(this.$refs.superFlow.graph)
            }
            ,
            linkStyle(link) {
                return {
                    // hover: '#FF00FF'
                }
            }
            ,
            linkDesc(link) {
                return link.meta ? link.meta.desc : ''
            }
            ,
            settingSubmit() {
                const conf = this.drawerConf
                if (this.drawerConf.type === drawerType.node) {
                    if (!conf.info.meta) conf.info.meta = {}
                    Object.keys(this.nodeSetting).forEach(key => {
                        this.$set(conf.info.meta, key, this.nodeSetting[key])
                    })
                    this.$refs.nodeSetting.resetFields()
                } else {
                    if (!conf.info.meta) conf.info.meta = {}
                    Object.keys(this.linkSetting).forEach(key => {
                        this.$set(conf.info.meta, key, this.linkSetting[key])
                    })
                    this.$refs.linkSetting.resetFields()
                }
                conf.visible = false
            }
            ,

            nodeMouseUp(evt) {
                evt.preventDefault()
            }
            ,

            nodeClick() {
                console.log(arguments)
            }
            ,

            docMousemove({clientX, clientY}) {
                const conf = this.dragConf

                if (conf.isMove) {

                    conf.ele.style.top = clientY - conf.offsetTop + 'px'
                    conf.ele.style.left = clientX - conf.offsetLeft + 'px'

                } else if (conf.isDown) {

                    // 鼠标移动量大于 5 时 移动状态生效
                    conf.isMove =
                        Math.abs(clientX - conf.clientX) > 5
                        || Math.abs(clientY - conf.clientY) > 5

                }
            }
            ,

            docMouseup({clientX, clientY}) {
                const conf = this.dragConf
                conf.isDown = false

                if (conf.isMove) {
                    const {
                        top,
                        right,
                        bottom,
                        left
                    } = this.$refs.flowContainer.getBoundingClientRect()

                    // 判断鼠标是否进入 flow container
                    if (
                        clientX > left
                        && clientX < right
                        && clientY > top
                        && clientY < bottom
                    ) {

                        // 获取拖动元素左上角相对 super flow 区域原点坐标
                        const coordinate = this.$refs.superFlow.getMouseCoordinate(
                            clientX - conf.offsetLeft,
                            clientY - conf.offsetTop
                        )

                        // 添加节点
                        console.log("coordinate");
                        console.log(coordinate);

                        console.log("conf.info");
                        console.log(conf.info);
                        this.$refs.superFlow.addNode({
                            coordinate,
                            ...conf.info
                        });


                        let toJson = this.$refs.superFlow.toJSON();

                        toJson.nodeList.forEach(ele => {
                            let flag = true;
                            for (let index = 0; index < this.plugDataList.length; index++) {
                                if (ele.id === this.plugDataList[index].id) {
                                    this.plugDataList[index].coordinate = ele.coordinate;
                                    flag = false;
                                }
                            }
                            if (flag) {
                                this.plugDataList.push({
                                    coordinate,
                                    ...conf.info,
                                    num: 0,
                                    data: {},
                                    label: conf.info.meta.label,
                                    id: ele.id
                                });
                            }
                        });


                    }

                    conf.isMove = false
                }

                if (conf.ele) {
                    conf.ele.remove()
                    conf.ele = null
                }
            }
            ,

            nodeItemMouseDown(evt, info) {
                const {
                    clientX,
                    clientY,
                    currentTarget
                } = evt

                const {
                    top,
                    left
                } = evt.currentTarget.getBoundingClientRect()

                const conf = this.dragConf
                const ele = currentTarget.cloneNode(true)

                Object.assign(this.dragConf, {
                    offsetLeft: clientX - left,
                    offsetTop: clientY - top,
                    clientX: clientX,
                    clientY: clientY,
                    info,
                    ele,
                    isDown: true
                })

                ele.style.position = 'fixed'
                ele.style.margin = '0'
                ele.style.top = clientY - conf.offsetTop + 'px'
                ele.style.left = clientX - conf.offsetLeft + 'px'

                this.$el.appendChild(this.dragConf.ele)
            }
        }
    }
</script>

<style lang="less">

    .ellipsis {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
    }

    .link-base-style-form {
        .el-form-item {
            margin-bottom: 12px;
        }

        padding-bottom: 20px;
        border-bottom: 1px solid #DCDCDC;
    }

    .super-flow-demo1 {
        margin-top: 20px;
        width: 100%;
        height: 800px;
        background-color: #f5f5f5;
        @list-width: 200px;

        > .node-container {
            width: @list-width;
            float: left;
            height: 100%;
            text-align: center;
            background-color: #FFFFFF;
        }

        > .flow-container {
            width: calc(100% - @list-width);
            float: left;
            height: 100%;
            overflow: hidden;
        }

        .super-flow__node {
            .flow-node {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                line-height: 40px;
                padding: 0 6px;
                font-size: 12px;
            }
        }
    }

    .node-item {
        @node-item-height: 30px;

        font-size: 14px;
        display: inline-block;
        height: @node-item-height;
        width: 120px;
        margin-top: 20px;
        background-color: #FFFFFF;
        line-height: @node-item-height;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        user-select: none;
        text-align: center;
        z-index: 6;

        &:hover {
            box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
        }
    }

</style>
