<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="大屏展示">
                <div>
                    <el-select v-model="dateType" clearable
                               class="handle-select mr10">
                        <el-option key="1" label="时" value="HOUR"></el-option>
                        <el-option key="2" label="日" value="DAILY"></el-option>
                        <el-option key="3" label="月" value="MONTH"></el-option>
                        <el-option key="4" label="年" value="YEAR"></el-option>
                    </el-select>
                </div>
                <div class="quarter-div blue">
                    <TransferNum v-model="dateType"></TransferNum>
                </div>
                <div class="quarter-div green">
                    <JobTrigger v-model="dateType"></JobTrigger>
                </div>
            </el-tab-pane>
            <el-tab-pane label="主机监控">
                <sys-info-list></sys-info-list>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import TransferNum from './Chart/TransferNum';
    import JobTrigger from './Chart/JobTtrigger';
    import SysInfoList from './Chart/SysInfoList';

    export default {
        name: 'dashboard',
        data() {
            return {
                dateType: "DAILY"
            }
        },
        components: {
            TransferNum, JobTrigger, SysInfoList
        },
        computed: {},

        methods: {}
    };
</script>


<style scoped>
    .quarter-div {
        width: 50%;
        height: 40%;
        float: left;
    }

    .blue {

    }

    .green {

    }

    .orange {

    }

    .yellow {

    }
</style>
