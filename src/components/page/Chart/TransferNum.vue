<template>
    <div class="Echarts">

        <div id="main" style="width: 450px;height:450px;">


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
                TransferNum: {x: [], y: []}
            }
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
        created() {
            this.getEchartData();
        }, mounted() {

            this.timer = setInterval(() => {
                setTimeout(this.getEchartData, 0)
            }, 1000 * 60)
        }, beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },
        methods: {

            getEchartData() {
                axiosGet({
                    url: '/chart/getTransferNum',
                    methods: 'get',
                    params: {
                        dateType: this.value
                    }
                }).then(res => {
                    console.log(res.data)
                    let x = new Array();
                    let y = new Array();
                    res.data.forEach(ele => {
                        x.push(ele.time);
                        y.push(ele.sum);
                    });
                    this.TransferNum.x = [];
                    this.TransferNum.y = [];
                    this.TransferNum.x.push(...x);
                    this.TransferNum.y.push(...y);
                    this.myEcharts();
                    console.log(res.data)
                }).catch(err => {

                });
            },
            myEcharts() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '任务传输数量'
                    },
                    tooltip: {},
                    legend: {
                        data: ['数量']
                    },
                    xAxis: {
                        data: this.TransferNum.x
                    },
                    yAxis: {},
                    series: [{
                        name: '时间',
                        type: 'line',
                        data: this.TransferNum.y
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },

    }
</script>

<style>

</style>
