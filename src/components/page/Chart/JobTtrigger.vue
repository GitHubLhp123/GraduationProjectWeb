<template>
    <div class="Echarts">

        <div id="job" style="width: 450px;height:450px;">


        </div>
    </div>
</template>

<script>
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        name: 'Echarts',
        props: {
            value: {
                type: String,
                default: "DAILY"
            },
        },
        data() {
            return {
                timer: null, //定时器名称
                xData: [],
                series: []
            }
        }, mounted() {

            this.timer = setInterval(() => {
                setTimeout(this.getEchartData, 0)
            }, 1000 * 60)
        }, beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },
        created() {

            this.getEchartData();
            // this.$nextTick(() => {
            //     setInterval(this.getEchartData(), 1000);
            // })
        },
        watch: {
            value: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    this.getEchartData();
                    console.log(this.value);
                    this.getEchartData();
                },
                deep: true
            }
        },
        methods: {


            getEchartData() {
                axiosGet({
                    url: '/chart/getJobTriggerNum',
                    methods: 'get',
                    params: {
                        dateType: this.value
                    }
                }).then(res => {
                    console.log(res.data);
                    this.xData = [];
                    this.series = [];
                    let xData = new Array();
                    let y = new Array();

                    this.series = [
                        {
                            name: 'error',
                            type: 'line',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: 'success',
                            type: 'line',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: 'run',
                            type: 'line',
                            stack: '总量',
                            data: []
                        }
                    ];

                    res.data.reverse().forEach(ele => {
                        this.xData.push(ele.flag.split(",")[0]);
                        if (ele.flag.split(",")[1] === 'error') {
                            this.series[0].data.push(ele.count);
                            // this.series[1].data.push(0);
                            // this.series[2].data.push(0);
                        }
                        if (ele.flag.split(",")[1] === 'success') {
                            this.series[1].data.push(ele.count);
                            // this.series[0].data.push(0);
                            // this.series[2].data.push(0);
                        }
                        if (ele.flag.split(",")[1] === 'run') {
                            this.series[2].data.push(ele.count);
                            // this.series[0].data.push(0);
                            // this.series[1].data.push(0);
                        }
                    });
                    console.log(this.series);
                    this.myEcharts();
                    console.log(res.data)
                }).catch(err => {

                });
            },
            myEcharts() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('job'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '任务运行图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['error', 'success', 'run']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: this.series
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    }
</script>

<style>

</style>
