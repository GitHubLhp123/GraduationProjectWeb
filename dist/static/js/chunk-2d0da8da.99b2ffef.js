(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0da8da"],{"6ba9":function(s,e,t){"use strict";t.r(e);var a=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("el-tooltip",{attrs:{placement:"top"}},[t("div",{attrs:{slot:"content"},slot:"content"},[t("div",{staticClass:"selecttip"},[t("span",[s._v("查询")])])]),t("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){return s.getDsListData()}}})],1),t("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(e){return s.addDs()}}},[s._v("添加数据源\n    ")]),t("el-table",{ref:"dsDataList",staticClass:"table",attrs:{data:s.dsDataList,border:"","header-cell-class-name":"table-header"},on:{"cell-click":s.cellClick}},[t("el-table-column",{attrs:{prop:"dsName",label:"数据源名称",align:"center"}}),t("el-table-column",{attrs:{prop:"dsType",label:"类型",align:"center"}}),t("el-table-column",{attrs:{prop:"dsInstLoc",label:"ip:端口",align:"center"}})],1),s.dialogVisible?t("el-dialog",{attrs:{visible:s.dialogVisible,width:"80%","before-close":s.handleClose},on:{"update:visible":function(e){s.dialogVisible=e}}},[s.dialogVisible?t("ds-data",{attrs:{visible:s.dialogVisible,dsType:s.dsType,dsId:s.dsId},on:{"update:visible":function(e){s.dialogVisible=e},saveDsSuccess:s.updateDsList}}):s._e()],1):s._e()],1)},d=[],o=t("ec9b"),n=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[void 0===s.dsId?t("div",[t("el-radio-group",{model:{value:s.localDsType,callback:function(e){s.localDsType=e},expression:"localDsType"}},s._l(s.dsTypeS,(function(s){return t("el-radio-button",{key:s,attrs:{label:s}})})),1),t("br"),t("br"),t("br")],1):s._e(),"mysql"===s.localDsType?t("div",[t("mysqlDs",{attrs:{dsType:s.localDsType,dsId:s.dsId}})],1):s._e(),"sftp"===s.localDsType?t("div",[t("sftpDs",{attrs:{dsType:s.localDsType,dsId:s.dsId}})],1):s._e(),"oss"===s.localDsType?t("div",[t("OssDs",{attrs:{dsType:s.localDsType,dsId:s.dsId}})],1):s._e(),"hive"===s.localDsType?t("div",[t("HiveDs",{attrs:{dsType:s.localDsType,dsId:s.dsId}})],1):s._e(),"mongodb"===s.localDsType?t("div",[t("mongodb-ds",{attrs:{dsType:s.localDsType,dsId:s.dsId}})],1):s._e()])},l=[],i=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("el-form",{staticClass:"demo-ruleForm",attrs:{model:s.mysql.dsData,rules:s.mysql.dsDataRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"数据源id"}},[t("el-input",{attrs:{disabled:!0},model:{value:s.mysql.dsData.dsId,callback:function(e){s.$set(s.mysql.dsData,"dsId",e)},expression:"mysql.dsData.dsId"}})],1),t("el-form-item",{attrs:{label:"数据源名称",prop:"dsName"}},[t("el-input",{attrs:{disabled:s.isShow},model:{value:s.mysql.dsData.dsName,callback:function(e){s.$set(s.mysql.dsData,"dsName",e)},expression:"mysql.dsData.dsName"}})],1),t("el-form-item",{attrs:{label:"ip:端口",prop:"dsInstLoc"}},[t("el-input",{model:{value:s.mysql.dsData.dsInstLoc,callback:function(e){s.$set(s.mysql.dsData,"dsInstLoc",e)},expression:"mysql.dsData.dsInstLoc"}})],1),t("el-form-item",{attrs:{label:"账号",prop:"dsUser"}},[t("el-input",{model:{value:s.mysql.dsData.dsUser,callback:function(e){s.$set(s.mysql.dsData,"dsUser",e)},expression:"mysql.dsData.dsUser"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"dsPassword"}},[t("el-input",{attrs:{"show-password":""},model:{value:s.mysql.dsData.dsPassword,callback:function(e){s.$set(s.mysql.dsData,"dsPassword",e)},expression:"mysql.dsData.dsPassword"}})],1),t("el-form-item",{attrs:{label:"schema",prop:"dsSchema"}},[t("el-input",{model:{value:s.mysql.dsData.dsSchema,callback:function(e){s.$set(s.mysql.dsData,"dsSchema",e)},expression:"mysql.dsData.dsSchema"}})],1),t("el-form-item",{attrs:{label:"扩展属性",prop:"extendCfg"}},[t("el-input",{model:{value:s.mysql.dsData.extendCfg,callback:function(e){s.$set(s.mysql.dsData,"extendCfg",e)},expression:"mysql.dsData.extendCfg"}})],1),t("el-form-item",{attrs:{label:"dsUrl"}},[t("el-input",{attrs:{type:"textarea"},model:{value:s.mysql.dsData.dsUrl,callback:function(e){s.$set(s.mysql.dsData,"dsUrl",e)},expression:"mysql.dsData.dsUrl"}})],1),t("el-form-item",[t("el-button",{on:{click:s.encryptorDsPassword}},[s._v("测试")]),t("el-button",{attrs:{type:"primary"},on:{click:s.saveDs}},[s._v("保存\n            ")])],1)],1)],1)},r=[],c=(t("28a5"),t("ac6a"),t("4f7f"),t("5df3"),t("1c4c"),t("9612")),m={props:{dsType:String,dsId:String},name:"dsData",data:function(){return{isShow:!1,oldPassword:"",mysql:{dsData:{dsType:"mysql",dsId:"",dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",dsSchema:"",extendCfg:"",dsUrl:"",isOverTest:!1},dsDataRules:{dsName:[{required:!0,message:"请输入数据源名称",trigger:"blur"}],dsInstLoc:[{required:!0,message:"请输入ip和端口",trigger:"blur"}],dsUser:[{required:!0,message:"请输入账号",trigger:"blur"}],dsPassword:[{required:!0,message:"请输入密码",trigger:"blur"}],dsType:[{required:!0,message:"请选择数据类型",trigger:"blur"}]}}}},created:function(){void 0!==this.dsId?(this.isShow=!0,this.getDsData(this.dsId)):this.mysql.dsData={dsType:"mysql",dsId:c["b"].v1(),dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",dsSchema:"",extendCfg:"",dsUrl:"",isOverTest:!1,teamName:this.$store.state.personInfo.currentTeam.teamName},console.log("初始化info "+new Date)},methods:{getDsData:function(s){var e=this;Object(o["a"])({url:"/ds/getDsByDsId",methods:"get",params:{dsId:s}}).then((function(s){console.log(s),e.mysql.dsData=s.data,e.mysql.dsData.isOverTest=!0,e.oldPassword=e.mysql.dsData.dsPassword})).catch((function(s){console.log("==================="),console.log(s)}))},saveDs:function(){var s=this;this.testDs(),this.mysql.dsData.isOverTest?Object(o["b"])("/ds/saveDs",{dsData:JSON.stringify(this.mysql.dsData)}).then((function(e){console.log(e),100!==e.status?(s.$notify({title:"成功",message:"保存成功",type:"success"}),s.$emit("saveDsSuccess")):s.$message({message:"保存失败\r\n"+e.message,type:"warning"})})).catch((function(e){s.$message({message:"保存失败\r\n"+e,type:"warning"})})):console.log("come in"+this.mysql.dsData.isOverTest)},encryptorDsPassword:function(){var s=this;this.oldPassword!==this.mysql.dsData.dsPassword?Object(o["a"])({url:"/ds/encryptorDsPassword",methods:"get",params:{dsPassword:this.mysql.dsData.dsPassword}}).then((function(e){console.log(e),s.mysql.dsData.dsPassword=e.data,s.oldPassword=e.data,s.testDs()})).catch((function(s){console.log("==================="),console.log(s)})):this.testDs()},generateURL:function(){var s=this,e=Array.from(new Set(this.mysql.dsData.dsSchema.split(",")));this.mysql.dsData.dsUrl="","mysql"===this.mysql.dsData.dsType&&e.forEach((function(e){s.mysql.dsData.dsUrl+="jdbc:mysql://"+s.mysql.dsData.dsInstLoc+"/"+e+"?"+s.mysql.dsData.extendCfg+"\r\n"}))},testDs:function(){var s=this;console.log("edit"===this.openType||"add"===this.openType),this.generateURL(),Object(o["b"])("/ds/testDsConnectivity",{dsData:JSON.stringify(this.mysql.dsData)}).then((function(e){return console.log("进来2"),console.log(e),void 0===e.message?(s.mysql.dsData.isOverTest=!0,console.log("进来222222222222"),void s.$notify({title:"成功",message:"测试通过",type:"success"})):(console.log("进来"),s.$message({message:"测试失败\r\n"+e.message,type:"warning"}),void(s.mysql.dsData.isOverTest=!1))})).catch((function(e){s.$message({message:"测试失败\r\n"+e,type:"warning"})}))}},destroyed:function(){console.log("销毁")}},p=m,D=t("2877"),u=Object(D["a"])(p,i,r,!1,null,null,null),g=u.exports,h=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("el-form",{staticClass:"demo-ruleForm",attrs:{model:s.sftp.dsData,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"数据源id"}},[t("el-input",{attrs:{disabled:!0},model:{value:s.sftp.dsData.dsId,callback:function(e){s.$set(s.sftp.dsData,"dsId",e)},expression:"sftp.dsData.dsId"}})],1),t("el-form-item",{attrs:{label:"数据源名称",prop:"dsName"}},[t("el-input",{attrs:{disabled:s.isShow},model:{value:s.sftp.dsData.dsName,callback:function(e){s.$set(s.sftp.dsData,"dsName",e)},expression:"sftp.dsData.dsName"}})],1),t("el-form-item",{attrs:{label:"ip:端口",prop:"dsInstLoc"}},[t("el-input",{model:{value:s.sftp.dsData.dsInstLoc,callback:function(e){s.$set(s.sftp.dsData,"dsInstLoc",e)},expression:"sftp.dsData.dsInstLoc"}})],1),t("el-form-item",{attrs:{label:"账号",prop:"dsUser"}},[t("el-input",{model:{value:s.sftp.dsData.dsUser,callback:function(e){s.$set(s.sftp.dsData,"dsUser",e)},expression:"sftp.dsData.dsUser"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"dsPassword"}},[t("el-input",{attrs:{"show-password":""},model:{value:s.sftp.dsData.dsPassword,callback:function(e){s.$set(s.sftp.dsData,"dsPassword",e)},expression:"sftp.dsData.dsPassword"}})],1),t("el-form-item",{attrs:{label:"扩展属性",prop:"extendCfg"}},[t("el-input",{model:{value:s.sftp.dsData.extendCfg,callback:function(e){s.$set(s.sftp.dsData,"extendCfg",e)},expression:"sftp.dsData.extendCfg"}})],1),t("el-form-item",[t("el-button",{on:{click:s.encryptorDsPassword}},[s._v("测试")]),t("el-button",{attrs:{type:"primary"},on:{click:s.saveDs}},[s._v("保存\n            ")])],1)],1)],1)},f=[],v={props:{dsType:String,dsId:String},name:"SftpDs",created:function(){void 0!==this.dsId?(this.isShow=!0,this.getDsData(this.dsId)):this.sftp.dsData={dsId:c["b"].v1(),dsType:"sftp",dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",extendCfg:"",isOverTest:!1,teamName:this.$store.state.personInfo.currentTeam.teamName},console.log("初始化info "+new Date)},data:function(){return{isShow:!1,oldPassword:"",sftp:{dsData:{dsType:"sftp",dsId:"",dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",extendCfg:"",isOverTest:!1}}}},methods:{saveDs:function(){var s=this;this.testDs(),this.sftp.dsData.isOverTest?Object(o["b"])("/ds/saveDs",{dsData:JSON.stringify(this.sftp.dsData)}).then((function(e){console.log(e),100!==e.status?(s.$notify({title:"成功",message:"保存成功",type:"success"}),s.$emit("saveDsSuccess")):s.$message({message:"保存失败\r\n"+e.message,type:"warning"})})).catch((function(e){s.$message({message:"保存失败\r\n"+e,type:"warning"})})):console.log("come in"+this.sftp.dsData.isOverTest)},getDsData:function(s){var e=this;Object(o["a"])({url:"/ds/getDsByDsId",methods:"get",params:{dsId:s}}).then((function(s){console.log(s),e.sftp.dsData=s.data,e.sftp.dsData.isOverTest=!0,e.oldPassword=e.sftp.dsData.dsPassword})).catch((function(s){console.log("==================="),console.log(s)}))},encryptorDsPassword:function(){var s=this;this.oldPassword!==this.sftp.dsData.dsPassword?Object(o["a"])({url:"/ds/encryptorDsPassword",methods:"get",params:{dsPassword:this.sftp.dsData.dsPassword}}).then((function(e){console.log(e),s.sftp.dsData.dsPassword=e.data,s.oldPassword=e.data,s.testDs()})).catch((function(s){console.log("==================="),console.log(s)})):this.testDs()},testDs:function(){var s=this;Object(o["b"])("/ds/testDsConnectivity",{dsData:JSON.stringify(this.sftp.dsData)}).then((function(e){return void 0===e.message?(s.sftp.dsData.isOverTest=!0,console.log("进来222222222222"),void s.$notify({title:"成功",message:"测试通过",type:"success"})):(console.log("进来"),s.$message({message:"测试失败\r\n"+e.message,type:"warning"}),void(s.sftp.dsData.isOverTest=!1))})).catch((function(e){s.$message({message:"测试失败\r\n"+e,type:"warning"})}))}}},b=v,y=Object(D["a"])(b,h,f,!1,null,"cd44cee0",null),w=y.exports,I=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("el-form",{staticClass:"demo-ruleForm",attrs:{model:s.oss.dsData,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"数据源id"}},[t("el-input",{attrs:{disabled:!0},model:{value:s.oss.dsData.dsId,callback:function(e){s.$set(s.oss.dsData,"dsId",e)},expression:"oss.dsData.dsId"}})],1),t("el-form-item",{attrs:{label:"数据源名称",prop:"dsName"}},[t("el-input",{attrs:{disabled:s.isShow},model:{value:s.oss.dsData.dsName,callback:function(e){s.$set(s.oss.dsData,"dsName",e)},expression:"oss.dsData.dsName"}})],1),t("el-form-item",{attrs:{label:"ip:端口",prop:"dsInstLoc"}},[t("el-input",{model:{value:s.oss.dsData.dsInstLoc,callback:function(e){s.$set(s.oss.dsData,"dsInstLoc",e)},expression:"oss.dsData.dsInstLoc"}})],1),t("el-form-item",{attrs:{label:"桶名",prop:"dsSchema"}},[t("el-input",{model:{value:s.oss.dsData.dsSchema,callback:function(e){s.$set(s.oss.dsData,"dsSchema",e)},expression:"oss.dsData.dsSchema"}})],1),t("el-form-item",{attrs:{label:"账号",prop:"dsUser"}},[t("el-input",{model:{value:s.oss.dsData.dsUser,callback:function(e){s.$set(s.oss.dsData,"dsUser",e)},expression:"oss.dsData.dsUser"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"dsPassword"}},[t("el-input",{attrs:{"show-password":""},model:{value:s.oss.dsData.dsPassword,callback:function(e){s.$set(s.oss.dsData,"dsPassword",e)},expression:"oss.dsData.dsPassword"}})],1),t("el-form-item",{attrs:{label:"扩展属性",prop:"extendCfg"}},[t("el-input",{model:{value:s.oss.dsData.extendCfg,callback:function(e){s.$set(s.oss.dsData,"extendCfg",e)},expression:"oss.dsData.extendCfg"}})],1),t("el-form-item",[t("el-button",{on:{click:s.encryptorDsPassword}},[s._v("测试")]),t("el-button",{attrs:{type:"primary"},on:{click:s.saveDs}},[s._v("保存\n            ")])],1)],1)],1)},T=[],P={props:{dsType:String,dsId:String},name:"ossDs",created:function(){void 0!==this.dsId?(this.isShow=!0,this.getDsData(this.dsId)):this.oss.dsData={dsId:c["b"].v1(),dsType:"oss",dsName:"",dsSchema:"",dsInstLoc:"",dsUser:"",dsPassword:"",extendCfg:"",isOverTest:!1,teamName:this.$store.state.personInfo.currentTeam.teamName},console.log("初始化info "+new Date)},data:function(){return{isShow:!1,oldPassword:"",oss:{dsData:{dsType:"oss",dsId:"",dsSchema:"",dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",extendCfg:"",isOverTest:!1}}}},methods:{saveDs:function(){var s=this;this.testDs(),this.oss.dsData.isOverTest?Object(o["b"])("/ds/saveDs",{dsData:JSON.stringify(this.oss.dsData)}).then((function(e){console.log(e),100!==e.status?(s.$notify({title:"成功",message:"保存成功",type:"success"}),s.$emit("saveDsSuccess")):s.$message({message:"保存失败\r\n"+e.message,type:"warning"})})).catch((function(e){s.$message({message:"保存失败\r\n"+e,type:"warning"})})):console.log("come in"+this.oss.dsData.isOverTest)},getDsData:function(s){var e=this;Object(o["a"])({url:"/ds/getDsByDsId",methods:"get",params:{dsId:s}}).then((function(s){console.log(s),e.oss.dsData=s.data,e.oss.dsData.isOverTest=!0,e.oldPassword=e.oss.dsData.dsPassword})).catch((function(s){console.log("==================="),console.log(s)}))},encryptorDsPassword:function(){var s=this;this.oldPassword!==this.oss.dsData.dsPassword?Object(o["a"])({url:"/ds/encryptorDsPassword",methods:"get",params:{dsPassword:this.oss.dsData.dsPassword}}).then((function(e){console.log(e),s.oss.dsData.dsPassword=e.data,s.oldPassword=e.data,s.testDs()})).catch((function(s){console.log("==================="),console.log(s)})):this.testDs()},testDs:function(){var s=this;Object(o["b"])("/ds/testDsConnectivity",{dsData:JSON.stringify(this.oss.dsData)}).then((function(e){return void 0===e.message?(s.oss.dsData.isOverTest=!0,console.log("进来222222222222"),void s.$notify({title:"成功",message:"测试通过",type:"success"})):(console.log("进来"),s.$message({message:"测试失败\r\n"+e.message,type:"warning"}),void(s.oss.dsData.isOverTest=!1))})).catch((function(e){s.$message({message:"测试失败\r\n"+e,type:"warning"})}))}}},x=P,$=Object(D["a"])(x,I,T,!1,null,"798f6d87",null),S=$.exports,O=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("el-form",{staticClass:"demo-ruleForm",attrs:{model:s.mongodb.dsData,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"数据源id"}},[t("el-input",{attrs:{disabled:!0},model:{value:s.mongodb.dsData.dsId,callback:function(e){s.$set(s.mongodb.dsData,"dsId",e)},expression:"mongodb.dsData.dsId"}})],1),t("el-form-item",{attrs:{label:"数据源名称",prop:"dsName"}},[t("el-input",{attrs:{disabled:s.isShow},model:{value:s.mongodb.dsData.dsName,callback:function(e){s.$set(s.mongodb.dsData,"dsName",e)},expression:"mongodb.dsData.dsName"}})],1),t("el-form-item",{attrs:{label:"ip:端口",prop:"dsInstLoc"}},[t("el-input",{model:{value:s.mongodb.dsData.dsInstLoc,callback:function(e){s.$set(s.mongodb.dsData,"dsInstLoc",e)},expression:"mongodb.dsData.dsInstLoc"}})],1),t("el-form-item",{attrs:{label:"库名",prop:"dsSchema"}},[t("el-input",{model:{value:s.mongodb.dsData.dsSchema,callback:function(e){s.$set(s.mongodb.dsData,"dsSchema",e)},expression:"mongodb.dsData.dsSchema"}})],1),t("el-form-item",{attrs:{label:"账号",prop:"dsUser"}},[t("el-input",{model:{value:s.mongodb.dsData.dsUser,callback:function(e){s.$set(s.mongodb.dsData,"dsUser",e)},expression:"mongodb.dsData.dsUser"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"dsPassword"}},[t("el-input",{attrs:{"show-password":""},model:{value:s.mongodb.dsData.dsPassword,callback:function(e){s.$set(s.mongodb.dsData,"dsPassword",e)},expression:"mongodb.dsData.dsPassword"}})],1),t("el-form-item",{attrs:{label:"扩展属性",prop:"extendCfg"}},[t("el-input",{model:{value:s.mongodb.dsData.extendCfg,callback:function(e){s.$set(s.mongodb.dsData,"extendCfg",e)},expression:"mongodb.dsData.extendCfg"}})],1),t("el-form-item",[t("el-button",{on:{click:s.encryptorDsPassword}},[s._v("测试")]),t("el-button",{attrs:{type:"primary"},on:{click:s.saveDs}},[s._v("保存\n            ")])],1)],1)],1)},q=[],N={props:{dsType:String,dsId:String},name:"mongodbDs",created:function(){void 0!==this.dsId?(this.isShow=!0,this.getDsData(this.dsId)):this.mongodb.dsData={dsId:c["b"].v1(),dsType:"mongodb",dsName:"",dsSchema:"",dsInstLoc:"",dsUser:"",dsPassword:"",extendCfg:"",isOverTest:!1,teamName:this.$store.state.personInfo.currentTeam.teamName},console.log("初始化info "+new Date)},data:function(){return{isShow:!1,oldPassword:"",mongodb:{dsData:{dsType:"mongodb",dsId:"",dsSchema:"",dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",extendCfg:"",isOverTest:!1}}}},methods:{saveDs:function(){var s=this;this.testDs(),this.mongodb.dsData.isOverTest?Object(o["b"])("/ds/saveDs",{dsData:JSON.stringify(this.mongodb.dsData)}).then((function(e){console.log(e),100!==e.status?(s.$notify({title:"成功",message:"保存成功",type:"success"}),s.$emit("saveDsSuccess")):s.$message({message:"保存失败\r\n"+e.message,type:"warning"})})).catch((function(e){s.$message({message:"保存失败\r\n"+e,type:"warning"})})):console.log("come in"+this.mongodb.dsData.isOverTest)},getDsData:function(s){var e=this;Object(o["a"])({url:"/ds/getDsByDsId",methods:"get",params:{dsId:s}}).then((function(s){console.log(s),e.mongodb.dsData=s.data,e.mongodb.dsData.isOverTest=!0,e.oldPassword=e.mongodb.dsData.dsPassword})).catch((function(s){console.log("==================="),console.log(s)}))},encryptorDsPassword:function(){var s=this;this.oldPassword!==this.mongodb.dsData.dsPassword?Object(o["a"])({url:"/ds/encryptorDsPassword",methods:"get",params:{dsPassword:this.mongodb.dsData.dsPassword}}).then((function(e){console.log(e),s.mongodb.dsData.dsPassword=e.data,s.oldPassword=e.data,s.testDs()})).catch((function(s){console.log("==================="),console.log(s)})):this.testDs()},testDs:function(){var s=this;Object(o["b"])("/ds/testDsConnectivity",{dsData:JSON.stringify(this.mongodb.dsData)}).then((function(e){return void 0===e.message?(s.mongodb.dsData.isOverTest=!0,console.log("进来222222222222"),void s.$notify({title:"成功",message:"测试通过",type:"success"})):(console.log("进来"),s.$message({message:"测试失败\r\n"+e.message,type:"warning"}),void(s.mongodb.dsData.isOverTest=!1))})).catch((function(e){s.$message({message:"测试失败\r\n"+e,type:"warning"})}))}}},k=N,L=Object(D["a"])(k,O,q,!1,null,"749db784",null),U=L.exports,C=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("el-form",{staticClass:"demo-ruleForm",attrs:{model:s.hive.dsData,rules:s.hive.dsDataRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"数据源id"}},[t("el-input",{attrs:{disabled:!0},model:{value:s.hive.dsData.dsId,callback:function(e){s.$set(s.hive.dsData,"dsId",e)},expression:"hive.dsData.dsId"}})],1),t("el-form-item",{attrs:{label:"数据源名称",prop:"dsName"}},[t("el-input",{attrs:{disabled:s.isShow},model:{value:s.hive.dsData.dsName,callback:function(e){s.$set(s.hive.dsData,"dsName",e)},expression:"hive.dsData.dsName"}})],1),t("el-form-item",{attrs:{label:"ip:端口",prop:"dsInstLoc"}},[t("el-input",{model:{value:s.hive.dsData.dsInstLoc,callback:function(e){s.$set(s.hive.dsData,"dsInstLoc",e)},expression:"hive.dsData.dsInstLoc"}})],1),t("el-form-item",{attrs:{label:"账号",prop:"dsUser"}},[t("el-input",{model:{value:s.hive.dsData.dsUser,callback:function(e){s.$set(s.hive.dsData,"dsUser",e)},expression:"hive.dsData.dsUser"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"dsPassword"}},[t("el-input",{attrs:{"show-password":""},model:{value:s.hive.dsData.dsPassword,callback:function(e){s.$set(s.hive.dsData,"dsPassword",e)},expression:"hive.dsData.dsPassword"}})],1),t("el-form-item",{attrs:{label:"schema",prop:"dsSchema"}},[t("el-input",{model:{value:s.hive.dsData.dsSchema,callback:function(e){s.$set(s.hive.dsData,"dsSchema",e)},expression:"hive.dsData.dsSchema"}})],1),t("el-form-item",{attrs:{label:"扩展属性",prop:"extendCfg"}},[t("el-input",{model:{value:s.hive.dsData.extendCfg,callback:function(e){s.$set(s.hive.dsData,"extendCfg",e)},expression:"hive.dsData.extendCfg"}})],1),t("el-form-item",{attrs:{label:"dsUrl"}},[t("el-input",{attrs:{type:"textarea"},model:{value:s.hive.dsData.dsUrl,callback:function(e){s.$set(s.hive.dsData,"dsUrl",e)},expression:"hive.dsData.dsUrl"}})],1),t("el-form-item",[t("el-button",{on:{click:s.encryptorDsPassword}},[s._v("测试")]),t("el-button",{attrs:{type:"primary"},on:{click:s.saveDs}},[s._v("保存\n            ")])],1)],1)],1)},_=[],j={props:{dsType:String,dsId:String},name:"dsData",data:function(){return{isShow:!1,oldPassword:"",hive:{dsData:{dsType:"hive",dsId:"",dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",dsSchema:"",extendCfg:"",dsUrl:"",isOverTest:!1},dsDataRules:{dsName:[{required:!0,message:"请输入数据源名称",trigger:"blur"}],dsInstLoc:[{required:!0,message:"请输入ip和端口",trigger:"blur"}],dsUser:[{required:!0,message:"请输入账号",trigger:"blur"}],dsPassword:[{required:!0,message:"请输入密码",trigger:"blur"}],dsType:[{required:!0,message:"请选择数据类型",trigger:"blur"}]}}}},created:function(){void 0!==this.dsId?(this.isShow=!0,this.getDsData(this.dsId)):this.hive.dsData={dsType:"hive",dsId:c["b"].v1(),dsName:"",dsInstLoc:"",dsUser:"",dsPassword:"",dsSchema:"",extendCfg:"",dsUrl:"",isOverTest:!1,teamName:this.$store.state.personInfo.currentTeam.teamName},console.log("初始化info "+new Date)},methods:{getDsData:function(s){var e=this;Object(o["a"])({url:"/ds/getDsByDsId",methods:"get",params:{dsId:s}}).then((function(s){console.log(s),e.hive.dsData=s.data,e.hive.dsData.isOverTest=!0,e.oldPassword=e.hive.dsData.dsPassword})).catch((function(s){console.log("==================="),console.log(s)}))},saveDs:function(){var s=this;this.testDs(),this.hive.dsData.isOverTest?Object(o["b"])("/ds/saveDs",{dsData:JSON.stringify(this.hive.dsData)}).then((function(e){console.log(e),100!==e.status?(s.$notify({title:"成功",message:"保存成功",type:"success"}),s.$emit("saveDsSuccess")):s.$message({message:"保存失败\r\n"+e.message,type:"warning"})})).catch((function(e){s.$message({message:"保存失败\r\n"+e,type:"warning"})})):console.log("come in"+this.hive.dsData.isOverTest)},encryptorDsPassword:function(){var s=this;this.oldPassword!==this.hive.dsData.dsPassword?Object(o["a"])({url:"/ds/encryptorDsPassword",methods:"get",params:{dsPassword:this.hive.dsData.dsPassword}}).then((function(e){console.log(e),s.hive.dsData.dsPassword=e.data,s.oldPassword=e.data,s.testDs()})).catch((function(s){console.log("==================="),console.log(s)})):this.testDs()},generateURL:function(){var s=this,e=Array.from(new Set(this.hive.dsData.dsSchema.split(",")));this.hive.dsData.dsUrl="","hive"===this.hive.dsData.dsType&&e.forEach((function(e){s.hive.dsData.extendCfg.length>1?s.hive.dsData.dsUrl+="jdbc:hive2://"+s.hive.dsData.dsInstLoc+"/"+e+"?"+s.hive.dsData.extendCfg+"\r\n":s.hive.dsData.dsUrl+="jdbc:hive2://"+s.hive.dsData.dsInstLoc+"/"+e+"\r\n"}))},testDs:function(){var s=this;console.log("edit"===this.openType||"add"===this.openType),this.generateURL(),Object(o["b"])("/ds/testDsConnectivity",{dsData:JSON.stringify(this.hive.dsData)}).then((function(e){return console.log("进来2"),console.log(e),void 0===e.message?(s.hive.dsData.isOverTest=!0,console.log("进来222222222222"),void s.$notify({title:"成功",message:"测试通过",type:"success"})):(console.log("进来"),s.$message({message:"测试失败\r\n"+e.message,type:"warning"}),void(s.hive.dsData.isOverTest=!1))})).catch((function(e){s.$message({message:"测试失败\r\n"+e,type:"warning"})}))}},destroyed:function(){console.log("销毁")}},J=j,V=Object(D["a"])(J,C,_,!1,null,null,null),E=V.exports,R={props:{dsType:String,dsId:String},name:"dsData",components:{mysqlDs:g,sftpDs:w,OssDs:S,MongodbDs:U,HiveDs:E},data:function(){return{dsTypeS:["mysql","mysql8","hive","oracle","pg","sftp","ftp","oss","mongodb"],localDsType:""}},created:function(){this.localDsType=this.dsType},methods:{}},B=R,F=Object(D["a"])(B,n,l,!1,null,null,null),A=F.exports,H={props:{activeDsName:String},components:{dsData:A},name:"DsList",data:function(){return{pageIndex:1,tableDataLength:0,openType:"",dsType:"",dsId:"",dialogVisible:!1,dsDataList:[{dsName:"",dsSchema:"",dsType:"",dsInstLoc:""}]}},created:function(){this.getDsListData(),console.log("初始化list"+this.openType)},methods:{addDs:function(){this.dsType="mysql",this.dsId=void 0,this.dialogVisible=!0},handleCurrentChange:function(s){this.pageIndex=s,this.getDsListData()},handleClose:function(s){this.dialogVisible=!1,s()},cellClick:function(s,e,t,a){this.dsType=s.dsType,this.dsId=s.dsId,this.dialogVisible=!0},updateDsList:function(){this.dialogVisible=!1,this.getDsListData()},getDsListData:function(){var s=this,e=this.$store.state.personInfo.currentTeam.teamName;void 0!==this.activeDsName&&(e=this.activeDsName),Object(o["a"])({url:"/ds/getDsListByTeamName",methods:"get",params:{teamName:e,pageIndex:this.pageIndex}}).then((function(e){s.dsDataList=e.data})).catch((function(s){}))}}},M=H,z=Object(D["a"])(M,a,d,!1,null,"3cd42168",null);e["default"]=z.exports}}]);