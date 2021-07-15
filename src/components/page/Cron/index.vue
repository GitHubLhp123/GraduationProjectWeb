<template lang="html">
    <div class="cron" :val="value_">
        <el-tabs v-model="activeName">
            <el-tab-pane label="秒" name="s">
                <second-and-minute v-model="sVal" lable="秒"/>
            </el-tab-pane>
            <el-tab-pane label="分" name="m">
                <second-and-minute v-model="mVal" lable="分"/>
            </el-tab-pane>
            <el-tab-pane label="时" name="h">
                <hour v-model="hVal" lable="时"/>
            </el-tab-pane>
            <el-tab-pane label="日" name="d">
                <day v-model="dVal" lable="日"/>
            </el-tab-pane>
            <el-tab-pane label="月" name="month">
                <month v-model="monthVal" lable="月"/>
            </el-tab-pane>
            <el-tab-pane label="周" name="week">
                <week v-model="weekVal" lable="周"/>
            </el-tab-pane>
            <el-tab-pane label="年" name="year">
                <year v-model="yearVal" lable="年"/>
            </el-tab-pane>
        </el-tabs>
        <!-- table -->
        <el-table :data="tableData" size="mini" border style="width: 100%;">
            <el-table-column prop="sVal" label="秒" width="70"/>
            <el-table-column prop="mVal" label="分" width="70"/>
            <el-table-column prop="hVal" label="时" width="70"/>
            <el-table-column prop="dVal" label="日" width="70"/>
            <el-table-column prop="monthVal" label="月" width="70"/>
            <el-table-column prop="weekVal" label="周" width="70"/>
            <el-table-column prop="yearVal" label="年"/>
        </el-table>
        <el-card class="box-card">
            <el-button type="primary" @click="getRecentTriggerTime(5)">最近五次执行时间</el-button>
            <el-button type="primary" @click="getRecentTriggerTime(5*2)">最近十次次执行时间</el-button>
            <el-button type="primary" @click="getRecentTriggerTime(5*4)">最近二十次次执行时间</el-button>
            <div v-for="(item,index ) in RecentTriggerTimes" :key="index" class="text item">
                {{(index+1)}}


                {{ item }}
            </div>

        </el-card>


    </div>
</template>

<script>
    import SecondAndMinute from './component/secondAndMinute'
    import hour from './component/hour'
    import day from './component/day'
    import month from './component/month'
    import week from './component/week'
    import year from './component/year'
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        components: {
            SecondAndMinute,
            hour,
            day,
            month,
            week,
            year
        },
        props: {
            value: {
                type: String
            }
        },
        data() {
            return {
                //
                RecentTriggerTimes: [],
                RecentTriggerTime: 5,
                activeName: 's',
                sVal: '',
                mVal: '',
                hVal: '',
                dVal: '',
                monthVal: '',
                weekVal: '',
                yearVal: '',
                cron: ''
            }
        },
        computed: {
            tableData() {
                return [
                    {
                        sVal: this.sVal,
                        mVal: this.mVal,
                        hVal: this.hVal,
                        dVal: this.dVal,
                        monthVal: this.monthVal,
                        weekVal: this.weekVal,
                        yearVal: this.yearVal,

                    }
                ]
            },
            value_() {
                if (!this.dVal && !this.weekVal) {
                    return '';
                }
                if (this.dVal === '?' && this.weekVal === '?') {
                    this.$message.error('日期与星期不可以同时为“不指定”')
                    return '';
                }
                if (this.dVal !== '?' && this.weekVal !== '?') {
                    this.$message.error('日期与星期必须有一个为“不指定”')
                    return '';
                }
                const v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`;
                console.log("我进来到vaule_" + v);
                if (v !== this.value) {
                    this.cron = v;//赋值
                    this.getRecentTriggerTime(this.RecentTriggerTime);
                    this.$emit('input', v)
                }
                return v
            }
        },
        watch: {
            value(a, b) {
                this.updateVal();
            },

        },
        created() {
            this.updateVal()
        },
        methods: {
            updateVal() {
                console.log("进来了");
                console.log("getRecentTriggerTime1111" + this.value);
            },
            getRecentTriggerTime(times) {

                this.RecentTriggerTime = times;
                console.log(this.cron);
                axiosGet({
                    url: '/utils/getCronRecentTriggerTime',
                    methods: 'get',
                    params: {
                        cron: this.cron.replace(/s/g, "%2B"),
                        time: this.RecentTriggerTime
                    }
                }).then(res => {
                    console.log(res);
                    this.RecentTriggerTimes = res.data;
                }).catch(err => {
                    console.log("===================");
                    console.log(err);
                });


            }
        }
        ,
    }
</script>

<style lang="css">
    .cron {
        text-align: left;
        padding: 10px;
        background: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }
</style>
