<template>
    <div>
        <el-timeline :reverse="reverse" class="block">
            <el-timeline-item
                    v-for="(messageInfoItem, index) in messageInfoList"
                    :key="index"
                    :timestamp="messageInfoItem.createDate+'    '+messageInfoItem.createUserName" placement="top">
                <el-card>

                    <p v-html="messageInfoItem.content">{{messageInfoItem.content}}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <div>
            <el-card v-if="!replyMessage">
                <el-button class="editor-btn" type="primary" @click="replyMessage=!replyMessage">回复</el-button>
            </el-card>
            <el-card v-else="replyMessage" @click="replyMessage=!replyMessage">
                <text-editor ref="sqleditor" @returnEditorInfo="saveReplayEditorData"
                             v-bind:messageId="messageIdOfInfo"></text-editor>
            </el-card>
        </div>

    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';
    import textEditor from './VueEditor';

    export default {
        props: {
            messageIdOfInfo: String,
            messageInfoList: Array,

        },
        name: 'messageInfo',
        data() {
            return {
                replyMessage: false,
                reverse: true,
            };
        },
        created() {
        },
        components: {
            textEditor
        },
        methods: {
            saveReplayEditorData(content, id) {
                console.log("saveReplayEditorData");
                console.log(this.$parent);
                this.replyMessage = false;
                console.log(this.messageInfoList);
                console.log(this.$parent);
                this.$emit('returnEditorOfInfo2', id, 'emit');

            }
        }
    };
</script>
<style>


</style>