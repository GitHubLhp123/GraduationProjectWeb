<template lang="html">
    <div>
        <index v-model="cron"></index>
    </div>
</template>

<script>

    import index from './index'
    import {axiosGet, axiosPost} from '../../../utils/network/request.js';

    export default {
        watch: {
            value(a, b) {
             //   this.getRecentTriggerTime(5);
            }

        },
        components: {
            index,
        },
        props: {
            value: {
                type: String
            }
        },
        data() {
            return {
                cron: ''
            }
        },
        methods: {

        }


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
