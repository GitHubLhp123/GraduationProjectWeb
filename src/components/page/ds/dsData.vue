<template>

    <div>
        <div v-if="dsId===undefined">
            <el-radio-group v-model="localDsType">
                <el-radio-button :label="item" :key="item" v-for="item in dsTypeS">
                </el-radio-button>
            </el-radio-group>
            <br>
            <br>
            <br>
        </div>
        <div v-if="localDsType==='mysql'">
            <mysqlDs v-bind:dsType="localDsType"
                     v-bind:dsId="dsId"></mysqlDs>
        </div>
        <div v-if="localDsType==='sftp'">
            <sftpDs v-bind:dsType="localDsType"
                    v-bind:dsId="dsId">
            </sftpDs>
        </div>

        <div v-if="localDsType==='oss'">
            <OssDs v-bind:dsType="localDsType"
                    v-bind:dsId="dsId">
            </OssDs>
        </div>
        <div v-if="localDsType==='hive'">
            <HiveDs v-bind:dsType="localDsType"
                   v-bind:dsId="dsId">
            </HiveDs>
        </div>
        <div v-if="localDsType==='mongodb'">
            <mongodb-ds v-bind:dsType="localDsType"
                    v-bind:dsId="dsId">
            </mongodb-ds>
        </div>
    </div>
</template>
<script>

    import mysqlDs from './MysqlDs';
    import sftpDs from './SftpDs';
    import OssDs from './OssDs';
    import MongodbDs from './MongodbDs';
    import HiveDs from './HiveDs';
    export default {
        props: {
            dsType: String,
            dsId: String
        },
        name: "dsData",
        components: {
            mysqlDs, sftpDs,OssDs,MongodbDs,HiveDs
        },
        data() {
            return {
                dsTypeS: ['mysql', 'mysql8', 'hive', 'oracle', 'pg', 'sftp', 'ftp', 'oss','mongodb'],
                localDsType: ''
            };
        },
        created() {

            this.localDsType = this.dsType;
        },
        methods: {}
    }
</script>