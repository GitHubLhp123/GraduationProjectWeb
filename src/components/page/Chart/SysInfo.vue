<template>
    <div class="main" id="main">
        <div class="quarter-div " id="cpu">


        </div>
        <div class="quarter-div " id="systemMemory">


        </div>
        <div class="quarter-div " id="jvmMemory">


        </div>
        <div class="quarter-div " id="disk">


        </div>
    </div>
</template>

<script>

    export default {
        props: {
            SysInfo: {
                type: Object
            }
        },
        name: 'Echarts',
        data() {
            return {}
        },
        created() {
            console.log(this.SysInfo);
        }, mounted() {
            console.log(this.SysInfo);
            this.echartsCpu();
            this.echartsSystemMemory();
            this.echartsJvmMemory();
            this.echartsDisk();
            console.log(this.SysInfo);
        },
        methods: {

            //         if (this.SysInfo.diskFree / this.SysInfo.diskTotal > 0.8) {
            //     return "磁盘空间警告";
            // }
            // if (this.SysInfo.cpuUser + this.SysInfo.cpuUser > 80) {
            //     return "cpu警告";
            // }
            // if (this.SysInfo.systemUsedMemory / this.SysInfo.systemTotalMemory > 0.8) {
            //     return "系统内存警告";
            // }
            // if (this.SysInfo.jvmFreeMemory / this.SysInfo.jvmTotalMemory > 0.8) {
            //     return "JVM内存警告";
            // }
            // if (this.SysInfo.diskFree / this.SysInfo.diskTotal > 0.8) {
            //     return "磁盘空间警告";
            // }
            echartsCpu() {
                // 基于准备好的dom，初始化echarts实例
                console.log(document.getElementById('cpu'));
                var myChart = this.$echarts.init(document.getElementById('cpu'));
                // 指定图表的配置项和数据
                var option = undefined;

                option = {
                    series: [{
                        type: 'gauge',
                        axisLine: {
                            lineStyle: {
                                width: 30/2,
                                color: [
                                    [0.3, '#67e0e3'],
                                    [0.7, '#37a2da'],
                                    [1, '#fd666d']
                                ]
                            }
                        },
                        pointer: {
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {
                            distance: -10,
                            length: 8,
                            lineStyle: {
                                color: '#fff',
                                width: 2
                            }
                        },
                        splitLine: {
                            distance: -20,
                            length: 30,
                            lineStyle: {
                                color: '#fff',
                                width: 4
                            }
                        },
                        axisLabel: {
                            color: 'auto',
                            distance:10,
                            fontSize: 10
                        },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value} %',
                            color: 'auto'
                        },
                        data: [{
                            value: (this.SysInfo.cpuUser + this.SysInfo.cpuSys),
                            name: 'CPU'
                        }]
                    }]
                };
                console.log("=====================");
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            echartsSystemMemory() {
                // 基于准备好的dom，初始化echarts实例
                console.log(document.getElementById('cpu'));
                var myChart = this.$echarts.init(document.getElementById('systemMemory'));
                // 指定图表的配置项和数据
                var option = {
                    series: [{
                        name:"systemMemory",
                        type: 'gauge',
                        progress: {
                            show: true,
                            width: 10
                        },
                        axisLine: {
                            lineStyle: {
                                width: 10
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 15,
                            lineStyle: {
                                width: 2,
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            distance: 20,
                            color: '#999',
                            fontSize: 10
                        },
                        anchor: {
                            show: true,
                            showAbove: true,
                            size: 20,
                            itemStyle: {
                                borderWidth: 10
                            }
                        },
                        title: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            fontSize: 80,
                            offsetCenter: [0, '70%']
                        },
                        data: [{
                            value:Math.round((this.SysInfo.systemUsedMemory / this.SysInfo.systemTotalMemory) * 100),
                            name:"内存"
                        }]
                    }]
                };
                console.log("=====================");
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            echartsJvmMemory() {
                // 基于准备好的dom，初始化echarts实例
                console.log(document.getElementById('cpu'));
                var myChart = this.$echarts.init(document.getElementById('jvmMemory'));
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [{
                        name: 'jvmMemory',
                        type: 'gauge',
                        progress: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value}'
                        },
                        data: [{
                            value:Math.round( ((this.SysInfo.jvmTotalMemory - this.SysInfo.jvmFreeMemory) / this.SysInfo.jvmTotalMemory) * 100),
                            name: 'JVM'
                        }]
                    }]
                };
                console.log("=====================");
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            echartsDisk() {
                // 基于准备好的dom，初始化echarts实例
                console.log(document.getElementById('cpu'));
                var myChart = this.$echarts.init(document.getElementById('disk'));
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [{
                        name: 'Pressure',
                        type: 'gauge',
                        detail: {
                            formatter: '{value}'
                        },
                        data: [{

                            value:Math.round(((this.SysInfo.diskTotal-this.SysInfo.diskFree )/ this.SysInfo.diskTotal)*100),
                            name: 'DISK'
                        }]
                    }]
                };

                console.log("=====================");
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }

    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .main {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .quarter-div {
        width: 50%;
        height: 50%;
        float: left;
    }

    .blue {
        background-color: #5BC0DE;
    }

    .green {
        background-color: #5CB85C;
    }

    .orange {
        background-color: #F0AD4E;
    }

    .yellow {
        background-color: #FFC706;
    }
</style>