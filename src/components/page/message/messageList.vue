<template>

    <div class="container,block">
        <el-tabs v-model="activeTabName" @edit="handleTabsEdit">


            <el-tab-pane :label="`消息`" name="message">
                <div>
                    <el-form class="demo-form-inline" :inline="true">

                        <el-form-item label="主题">
                            <el-input v-model="query.topic">topic</el-input>
                        </el-form-item>
                        <el-form-item label="标题">
                            <el-input v-model="query.title">id</el-input>
                        </el-form-item>
                        <el-form-item label="状态">


                            <el-select v-model="query.state" clearable
                                       class="handle-select mr10">
                                <el-option :key="'已解决'"
                                           :label="'已解决'"
                                           :value="'已解决'"></el-option>
                                <el-option :key="'待解决'"
                                           :label="'待解决'"
                                           :value="'待解决'"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="消息id">
                            <el-input v-model="query.messageId"></el-input>
                        </el-form-item>

                        <el-button icon="el-icon-search" circle @click="getMessageDataList"></el-button>

                    </el-form>
                </div>
                <el-table :data="message" style="width: 100%" @cell-dblclick="handleClick1">
                    <el-table-column prop="messageId" width="180" label="消息id"></el-table-column>
                    <el-table-column prop="topic" width="180" label="主题"></el-table-column>
                    <el-table-column prop="title" width="180" label="标题"></el-table-column>
                    <el-table-column prop="createDate" width="180" label="创建时间">
                        <template slot-scope="scope">
                            {{scope.row.messageId.split("-").slice(0,3).join("-")}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUserName" width="180" label="创建人">
                    </el-table-column>
                    <el-table-column prop="currentUserName" width="180" label="当前拥有者"></el-table-column>
                    <el-table-column prop="type" width="180" label="状态">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="handleClick1(scope.row, '', '', '')"
                                       circle></el-button>
                            <el-button :disabled="scope.row.type==='已解决'"
                                       v-if="$store.state.personInfo.user.userName===scope.row.createUserName"
                                       type="success" icon="el-icon-check" @click="resolveMessage(scope.row)"
                                       circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">

                    <el-pagination
                            @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[5,10 ,20,30,50]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.messageLength">
                    </el-pagination>
                </div>
            </el-tab-pane>

            <el-tab-pane :label="`新建消息`" name="createMessage">
                <div>
                    <el-form class="demo-form-inline" :inline="true">

                        <el-form-item label="主题">
                            <el-input v-model="createMessageInfo.topic">topic</el-input>
                        </el-form-item>

                        <el-form-item label="标题">
                            <el-input v-model="createMessageInfo.title">id</el-input>
                        </el-form-item>

                    </el-form>
                </div>
                <text-editor ref="createEditor" @returnEditor="saveEditorData"> ></text-editor>
            </el-tab-pane>
            <el-tab-pane
                    closable
                    :key="item.messageIdOfTag"
                    v-for="(item, index) in messageTabs"
                    :label="item.messageIdOfTag"
                    :name="item.messageIdOfTag">
                <message-info
                        v-bind:messageIdOfInfo="item.messageIdOfTag"
                        v-bind:messageInfoList="item.messageInfoListOfTabs"
                        v-bind:replyMessage="item.replyMessageOfTag"
                        @returnEditorOfInfo2="getMessageInfoList"
                ></message-info>
            </el-tab-pane>
        </el-tabs>


    </div>


</template>

<script>

    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import messageInfo from './MessageInfo';
    import textEditor from './VueEditor';
    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    export default {
        components: {
            messageInfo, textEditor
        },
        name: 'tabs',
        data() {
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 10,
                    title: '',
                    topic: '',
                    messageId: '',
                    state: '',
                    userName: this.$store.state.personInfo.user.userName,
                },
                userList: [],
                createMessageInfo: {
                    id: uuid.v1(),
                    title: '',
                    topic: '',
                    messageId: '',
                    createUserName: this.$store.state.personInfo.user.userName,
                    currentUserName: ''
                },
                replyMessageOfTag: false,
                messageInfoListOfTabs: [],
                isShowMessageInfo: false,
                messageIdOfTag: '',
                activeTabName: 'message',
                showHeader: false,
                message: [],
                messageLength: 0,
                recycle: [],
                messageTabs: []
            }
        },
        created() {
            this.getMessageDataList();
            this.getUserList();
        },
        methods: {
            resolveMessage(row) {
                axiosGet({
                    url: '/message/resolveMessageByMessageId',
                    methods: 'get',
                    params: {
                        messageId: row.messageId
                    }
                }).then(res => {
                    console.log(res);
                    this.getMessageDataList();
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            },
            handleSizeChange(val) {

                this.query.pageSize = val;

                this.getMessageDataList();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.query.pageIndex = val;
                this.getMessageDataList();
                console.log(`当前页: ${val}`);
            },
            dateFormat(date) {
                let ret;
                let fmt = "YYYY-mm-dd HH:MM";
                const opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "M+": date.getMinutes().toString(),         // 分
                    "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    }
                    ;
                }

                return fmt;
            }
            ,
            saveEditorData(data, sentUserName, type) {
                if (type === 'add') {
                    this.createMessageInfo.currentUserName = sentUserName;
                    console.log("name");
                    console.log(this.createMessageInfo.currentUserName);


                    this.createMessageInfo.messageId = (this.dateFormat(new Date())) + "-" + this.createMessageInfo.topic;
                    let messageInfo = {
                        id: this.createMessageInfo.messageId,
                        topic: this.createMessageInfo.topic,
                        createUserName: this.createMessageInfo.createUserName,
                        content: data,
                        messageId: this.createMessageInfo.messageId,

                    };
                    axiosPost('/message/createMessageInfo',
                        {
                            "createMessage": JSON.stringify(this.createMessageInfo),
                            "messageInfo": JSON.stringify(messageInfo),
                            "type": JSON.stringify("add"),
                        }
                    ).then(res => {
                        console.log({
                            "createMessage": JSON.stringify(this.createMessageInfo),
                            "messageInfo": JSON.stringify(messageInfo),
                            "type": JSON.stringify("add"),
                        });
                        console.log("==================我提交了信息 保存");
                        console.log(res);
                        if (res.status === 200) {
                            this.getMessageInfoList(this.createMessageInfo.messageId, null);
                            this.activeTabName = this.createMessageInfo.messageId;
                            this.createMessageInfo = {
                                id: uuid.v1(),
                                title: '',
                                topic: '',
                                messageId: '',
                                createUserName: this.$store.state.personInfo.user.userName,
                                currentUserName: ''
                            };
                            this.$refs.createEditor.content = '';
                            this.$refs.createEditor.sentUserId = '';
                            this.getMessageDataList();
                        }


                    }).catch(err => {

                    });
                }


            }
            ,
            getUserList() {
                axiosGet({
                    url: '/user/getUserList',
                    methods: 'get',
                    params: {}
                }).then(res => {
                    this.userList = res.data;
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
            ,
            handleTabsEdit(targetName, action) {

                if (action === 'remove') {
                    let tabs = this.messageTabs;
                    let activeName = this.activeTabName;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.messageIdOfTag === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.messageIdOfTag;
                                }
                            }
                        });
                    }
                    this.activeTabName = activeName;
                    this.messageTabs = tabs.filter(tab => tab.messageIdOfTag !== targetName);
                }
            }
            ,
            getMessageInfoList(messageId, type) {
                console.log("我被调用" + type);
                axiosGet({
                    url: '/message/getMessageInfoList',
                    methods: 'get',
                    params: {
                        messageId: messageId
                    }
                }).then(res => {
                    let messageInfoListOfTabs = [];
                    messageInfoListOfTabs = res.data;
                    if (type === 'emit') {
                        console.log("我被调用emit+===========" + type);
                        this.messageTabs.forEach(ele => {
                            if (ele.messageIdOfTag === messageId) {
                                ele.messageInfoListOfTabs = messageInfoListOfTabs;
                                return;
                            }
                        });

                    } else {

                        this.setTabData(messageInfoListOfTabs, messageId);
                    }

                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
            ,
            handleClick1(row, column, event, cell) {

                let flag = false;
                this.messageTabs.forEach(ele => {
                    if (ele.messageIdOfTag === row.messageId) {
                        this.activeTabName = row.messageId;
                        flag = true;
                        return;
                    }
                });
                if (!flag) {
                    this.getMessageInfoList(row.messageId, null);
                }
                this.activeTabName = row.messageId;
            }
            ,


            setTabData(messageInfoListOfTabs, messageId) {
                this.messageTabs.push({

                    messageIdOfTag: messageId,
                    messageInfoListOfTabs: messageInfoListOfTabs,
                    replyMessageOfTag: ''
                });
            }

            ,
            getMessageDataList() {
                let userId = this.$store.state.personInfo.user.userId;
                console.log(userId);
                axiosGet({
                    url: '/message/getMessageList',
                    methods: 'get',
                    params: {
                        title: this.query.title,
                        topic: this.query.topic,
                        messageId: this.query.messageId,
                        state: this.query.state,
                        userName: this.query.userName,
                        pageNum: this.query.pageIndex,
                        pageSize: this.query.pageSize,
                    }
                }).then(res => {
                    let data = res.data;
                    this.message = data;
                    this.messageLength = res.dataLength;
                    console.log(res);
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });
            }
        }


    }

</script>

<style>
    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }
</style>

