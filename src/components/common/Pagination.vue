<template>
    <div>

        <el-pagination
                @size-change="paginationData.handleSizeChange"
                @current-change="paginationData.handleCurrentChange"
                :current-page="paginationData.currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="paginationData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: ["paginationData"],
        name: "Pagination"
    }
</script>

<style scoped>

</style>