<template>

    <div>
        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
        <el-select v-model="sentUserName" clearable
                   class="handle-select mr10">
            <el-option v-for="(ele,ele_index) in userList" :key="ele_index" :label="ele.user_name"
                       :value="ele.user_name"></el-option>
        </el-select>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>

</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {quillEditor} from 'vue-quill-editor';

    import {uuid} from 'vue-uuid'; // uuid object is also exported to things
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {
            messageId: String,
        },
        name: 'textEditor',
        data: function () {
            return {
                userList: [],
                sentUserName: '',
                content: '',
                editorOption: {
                    placeholder: ''
                }
            }
        },
        components: {
            quillEditor
        },
        created() {
            this.getUserList();
            this.content = '';
            console.log("我被打开");
            console.log(this.userList);
            console.log("我被打开2");

        },
        methods: {
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
            },
            onEditorChange({editor, html, text}) {
                this.content = html;
            },
            submit() {
                console.log(this.messageId);
                console.log(this.$store.state.personInfo);
                console.log(this.content);
                if (this.messageId === undefined) {
                    //新建任务
                    this.$emit('returnEditor', this.content, this.sentUserName, 'add');
                } else {
                    let messageOperation = {
                        id: uuid.v1(),
                        messageId: this.messageId,
                        userName: this.sentUserName
                    };
                    let messageInfo = {
                        id: uuid.v1(),
                        messageId: this.messageId,
                        createUserName: this.$store.state.personInfo.user.userName,
                        content: this.content
                    };

                    axiosPost('/message/createMessageInfo',
                        {
                            "messageOperation": JSON.stringify(messageOperation),
                            "messageInfo": JSON.stringify(messageInfo),
                            "type": JSON.stringify("edit"),
                        }
                    ).then(res => {
                        if (res.status === 200) {
                            this.$message.success('提交成功！');
                            this.$emit('returnEditorInfo', this.content,this.messageId);
                            this.content = '';
                        } else {
                            this.$message.error('提交失败！' + res.message);

                        }
                    }).catch(err => {

                    });


                }


            }
        }
    }
</script>
<style scoped>
    .editor-btn {
        margin-top: 20px;
    }
</style>