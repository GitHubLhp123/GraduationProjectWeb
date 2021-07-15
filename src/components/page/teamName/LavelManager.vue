<template>
    <div>
        <el-button type="primary"   @click="edit=!edit">编辑</el-button>
        <el-button type="primary" v-if="edit" @click="addLevel">添加</el-button>
        <el-button type="primary" v-if="edit" @click="saveLevelData">保存</el-button>
        <el-form :inline="true" v-for="(item,index) in levelData" :key="index" class="demo-form-inline">
            <el-form-item label="层级中文名">
                <el-input v-model="item.label"></el-input>
            </el-form-item>
            <el-form-item label="层级英文名">
                <el-input v-model="item.value"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="edit" @click="delLevel(index)">删除</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>

    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        props: {teamName: String},
        data() {
            return {
                levelData: [],
                edit: false

            }
        },
        created() {
            this.levelData.push({label: '', value: ''});
            this.teamName = 'cmsh_team';
            this.getLevelData();
        },
        methods: {


            saveLevelData() {
                axiosPost('/team/saveTeamLevel',
                    {
                        "levelData": JSON.stringify(this.levelData),
                        "teamName": this.teamName
                    }
                ).then(res => {

                }).catch(err => {

                });
            },

            getLevelData() {

                axiosGet({
                    url: '/team/getTeamLevel',
                    methods: 'get',
                    params: {
                        teamName: this.teamName
                    }
                }).then(res => {
                    this.levelData = res.data;
                }).catch(err => {

                });
            },
            addLevel() {
                this.levelData.push({label: '', value: ''});
            },
            delLevel(index) {
                console.log(index);
                this.levelData.splice(index, 1);
            },
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>