<template>
    <el-input
            type="textarea"
            :rows="2"
            placeholder="参数"
            v-model="parameters.parameterList">
    </el-input>
</template>

<script>
    export default {
        props: {
            value: {
                type: Object
            },
            data: {
                type: Object
            },
        },
        name: "Parameters"
        , data() {
            return {
                parameters:{
                    parameterList:''
                }
            }
        },
        created(){
            this.parameters={
                parameterList:this.data.parameterList
            }
        },
        watch: {
            parameters: {//深度监听，可监听到对象、数组的变化
                handler(val, oldVal) {
                    console.log(this.parameters);
                    this.$emit('input', this.parameters);
                },
                deep: true
            }
        },
    }
</script>

<style scoped>

</style>