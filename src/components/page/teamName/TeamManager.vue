<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
                <UserList v-bind:teamName="activeTeamName"></UserList>
            </el-tab-pane>
            <el-tab-pane label="数据源管理" name="second">
                <ds-list></ds-list>
            </el-tab-pane>
            <el-tab-pane label="层级管理" name="third">
                <lavel-manager v-bind:teamName="activeTeamName"></lavel-manager>
            </el-tab-pane>
            <el-tab-pane label="插件管理" name="fourth">

                <plung-list v-bind:teamName="activeTeamName"></plung-list>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import UserList from '../user/UserList';
    import DsList from '../ds/DsList';
    import LavelManager from './LavelManager';
    import PlungList from '../plug/PlugList';

    export default {
        components: {UserList, DsList, LavelManager, PlungList},
        data() {
            return {
                activeTeamName: "cmsh_team",
                activeName: 'fourth'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);


                let array1 = [1, 2, 3];
                let array2 = [1, 2, 3];
                let array3 = [1, 2, 3];
                let array = [];
                for (let index = 0; index < array1.length; index++) {
                    array.push({
                        c1: array1[index],
                        c2: array2[index],
                        c3: array3[index],
                    })
                }

                array = array.filter((value, index, arr) => {
                    return arr.indexOf(value) == index
                });
                console.log(array);


            }
        }
    };
</script>