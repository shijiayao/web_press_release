(self["webpackChunkfront_end"]=self["webpackChunkfront_end"]||[]).push([[783],{5380:function(e){e.exports={formatTargetDate(e){let t=new Date(e);return{YY:"".concat("0000",t.getFullYear()).slice(-4),MM:"".concat("0000",t.getMonth()+1).slice(-2),DD:"".concat("0000",t.getDate()).slice(-2),HH:"".concat("0000",t.getHours()).slice(-2),mm:"".concat("0000",t.getMinutes()).slice(-2),ss:"".concat("0000",t.getSeconds()).slice(-2),SSS:"".concat("0000",t.getMilliseconds()).slice(-3)}},formatCurrentDate(){let e=new Date;return{YY:"".concat("0000",e.getFullYear()).slice(-4),MM:"".concat("0000",e.getMonth()+1).slice(-2),DD:"".concat("0000",e.getDate()).slice(-2),HH:"".concat("0000",e.getHours()).slice(-2),mm:"".concat("0000",e.getMinutes()).slice(-2),ss:"".concat("0000",e.getSeconds()).slice(-2),SSS:"".concat("0000",e.getMilliseconds()).slice(-3)}}}},6783:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return R}});var a=l(3396),o=l(7139);const i={class:"notice-manage-wrap"},n={class:"head-box"},d=(0,a.Uk)("搜索"),r=(0,a.Uk)("新增公告信息"),c={class:"table-box"},s=["title"],u={class:"single-line-show"},m=(0,a.Uk)("编辑"),w=(0,a.Uk)("删除"),p={class:"dialog-footer"},g=(0,a.Uk)("取消"),b=(0,a.Uk)("新增"),D=(0,a.Uk)("修改"),h={class:"title"},f={class:"detail-wrap"},_=["innerHTML"],k={class:"dialog-footer"},V=(0,a.Uk)("关闭");function y(e,t,l,y,C,W){const z=(0,a.up)("el-input"),U=(0,a.up)("el-button"),M=(0,a.up)("el-table-column"),v=(0,a.up)("el-popconfirm"),R=(0,a.up)("el-table"),x=(0,a.up)("el-option"),B=(0,a.up)("el-select"),H=(0,a.up)("el-form-item"),S=(0,a.up)("el-form"),T=(0,a.up)("el-dialog");return(0,a.wg)(),(0,a.iD)("section",i,[(0,a._)("section",n,[(0,a.Wm)(z,{modelValue:C.headForm.keyword,"onUpdate:modelValue":t[0]||(t[0]=e=>C.headForm.keyword=e),placeholder:"标题或者内容中包含的关键词",clearable:""},null,8,["modelValue"]),(0,a.Wm)(U,{type:"primary",onClick:W.headSearchButton},{default:(0,a.w5)((()=>[d])),_:1},8,["onClick"]),(0,a.Wm)(U,{type:"success",onClick:W.headAddButton},{default:(0,a.w5)((()=>[r])),_:1},8,["onClick"])]),(0,a._)("section",c,[(0,a.Wm)(R,{size:"default",data:C.tableData,border:"",style:{width:"100%"},"empty-text":"没有数据",onCellClick:W.tableCellClick},{default:(0,a.w5)((()=>[(0,a.Wm)(M,{"header-align":"center",align:"center",label:"#",width:"60"},{default:(0,a.w5)((e=>[(0,a.Uk)((0,o.zw)(e.$index+1),1)])),_:1}),(0,a.Wm)(M,{"header-align":"center",align:"center",prop:"level",label:"用户组",width:"90"},{default:(0,a.w5)((e=>[(0,a.Uk)((0,o.zw)(W.userLevel(e.row)),1)])),_:1}),(0,a.Wm)(M,{"header-align":"center",align:"left",prop:"title",label:"标题",width:"300"},{default:(0,a.w5)((e=>[(0,a._)("p",{class:"single-line-show",title:e.row.title},(0,o.zw)(e.row.title),9,s)])),_:1}),(0,a.Wm)(M,{"header-align":"center",align:"left",prop:"content",label:"内容"},{default:(0,a.w5)((e=>[(0,a._)("p",u,(0,o.zw)(e.row.content),1)])),_:1}),(0,a.Wm)(M,{"header-align":"center",align:"center",prop:"edit_time",label:"上次修改时间",width:"170"},{default:(0,a.w5)((e=>[(0,a.Uk)((0,o.zw)(W.formatDate(e.row.edit_time)),1)])),_:1}),(0,a.Wm)(M,{"header-align":"center",align:"center",prop:"create_time",label:"公告创建时间",width:"170"},{default:(0,a.w5)((e=>[(0,a.Uk)((0,o.zw)(W.formatDate(e.row.create_time)),1)])),_:1}),(0,a.Wm)(M,{"header-align":"center",align:"center",label:"操作",width:"200"},{default:(0,a.w5)((e=>[(0,a.Wm)(U,{type:"primary",onClick:t=>W.rowEditButton(e)},{default:(0,a.w5)((()=>[m])),_:2},1032,["onClick"]),(0,a.Wm)(v,{"confirm-button-text":"是","cancel-button-text":"否","icon-color":"red",title:"确定要删除【"+e.row.title+"】吗?",onConfirm:t=>W.rowDeleteButton(e.row)},{reference:(0,a.w5)((()=>[(0,a.Wm)(U,{type:"warning"},{default:(0,a.w5)((()=>[w])),_:1})])),_:2},1032,["title","onConfirm"])])),_:1})])),_:1},8,["data","onCellClick"])]),(0,a.Wm)(T,{modelValue:C.editDialogVisible,"onUpdate:modelValue":t[5]||(t[5]=e=>C.editDialogVisible=e),"close-on-click-modal":!1,"destroy-on-close":!0,"custom-class":"edit-dialog"},{footer:(0,a.w5)((()=>[(0,a._)("span",p,[(0,a.Wm)(U,{onClick:t[4]||(t[4]=e=>C.editDialogVisible=!1)},{default:(0,a.w5)((()=>[g])),_:1}),"add"===C.dialogMode?((0,a.wg)(),(0,a.j4)(U,{key:0,type:"primary",onClick:W.addDialogButton},{default:(0,a.w5)((()=>[b])),_:1},8,["onClick"])):((0,a.wg)(),(0,a.j4)(U,{key:1,type:"primary",onClick:W.editDialogButton},{default:(0,a.w5)((()=>[D])),_:1},8,["onClick"]))])])),default:(0,a.w5)((()=>[(0,a.Wm)(S,{"label-width":"80px",model:C.tableRowData},{default:(0,a.w5)((()=>[(0,a.Wm)(H,{label:"用户组:"},{default:(0,a.w5)((()=>[(0,a.Wm)(B,{modelValue:C.tableRowData.level,"onUpdate:modelValue":t[1]||(t[1]=e=>C.tableRowData.level=e)},{default:(0,a.w5)((()=>[(0,a.Wm)(x,{label:"管理员",value:10}),(0,a.Wm)(x,{label:"所有用户",value:2e3})])),_:1},8,["modelValue"])])),_:1}),(0,a.Wm)(H,{label:"公告标题:"},{default:(0,a.w5)((()=>[(0,a.Wm)(z,{modelValue:C.tableRowData.title,"onUpdate:modelValue":t[2]||(t[2]=e=>C.tableRowData.title=e),placeholder:"请输入公告信息标题"},null,8,["modelValue"])])),_:1}),(0,a.Wm)(H,{label:"公告内容:"},{default:(0,a.w5)((()=>[(0,a.Wm)(z,{modelValue:C.tableRowData.content,"onUpdate:modelValue":t[3]||(t[3]=e=>C.tableRowData.content=e),rows:10,type:"textarea",placeholder:"请输入公告信息内容"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"]),(0,a.Wm)(T,{modelValue:C.detailDialogVisible,"onUpdate:modelValue":t[7]||(t[7]=e=>C.detailDialogVisible=e),"destroy-on-close":!0,"custom-class":"show-dialog"},{footer:(0,a.w5)((()=>[(0,a._)("span",k,[(0,a.Wm)(U,{type:"primary",onClick:t[6]||(t[6]=e=>C.detailDialogVisible=!1)},{default:(0,a.w5)((()=>[V])),_:1})])])),default:(0,a.w5)((()=>[(0,a._)("h3",h,(0,o.zw)(C.tableRowDetailData.title),1),(0,a._)("section",f,[(0,a._)("article",{class:"detail-content",innerHTML:W.showDetailContent},null,8,_)])])),_:1},8,["modelValue"])])}var C=l(5574),W=l(5380),z=l(9713),U={name:"notice-manage",components:{},props:{},data(){return{headForm:{keyword:""},tableData:[],tableRowData:{},dialogMode:"",editDialogVisible:!1,tableRowDetailData:{},detailDialogVisible:!1}},watch:{},computed:{showDetailContent(){return this.tableRowDetailData.content.split("\n").map((e=>`<p>${e}</p>`)).join("")}},beforeCreate(){},created(){this.getTableData()},beforeMount(){},mounted(){},beforeUpdate(){},updated(){},beforeUnmount(){},unmounted(){},methods:{getTableData(){const e=this;(0,z.zI)(e.headForm).then((t=>{const{code:l,data:a,message:o}=t.data;200===l?e.tableData=a:C.z8.error(o)}))},userLevel(e){let t="所有用户";return e.level<1e3&&(t="管理员"),t},formatDate(e){let t=(0,W.formatTargetDate)(e);return`${t.YY}-${t.MM}-${t.DD} ${t.HH}:${t.mm}:${t.ss}`},headSearchButton(){this.getTableData()},headAddButton(){this.tableRowData={level:2e3,title:"",content:""},this.dialogMode="add",this.editDialogVisible=!0},tableCellClick(e,t){"title"!==t.property&&"content"!==t.property||(this.tableRowDetailData={title:e.title,content:e.content},this.detailDialogVisible=!0)},rowEditButton(e){this.tableRowData={index:e.$index,...e.row},this.dialogMode="edit",this.editDialogVisible=!0},rowDeleteButton(e){const t=this;(0,z.aQ)({op_type:0,id:e.id}).then((e=>{const{code:l,message:a}=e.data;200===l?(C.z8.success(a),t.getTableData()):C.z8.error(a)}))},addDialogButton(){const e=this,{level:t,title:l,content:a}=e.tableRowData;t?l?a?(0,z.Fy)(e.tableRowData).then((t=>{const{code:l,message:a}=t.data;200===l?(C.z8.success(a),e.getTableData(),e.editDialogVisible=!1):C.z8.error(a)})):C.z8.error("公告信息内容不能为空"):C.z8.error("公告信息标题不能为空"):C.z8.error("请选择公告所在的用户组，这将决定哪些用户可以看到公告！")},editDialogButton(){const e=this,{index:t,id:l,level:a,title:o,content:i}=e.tableRowData;let n={op_type:1,id:l};a?(a!==e.tableData[t].level&&(n.level=a),o?(o!==e.tableData[t].title&&(n.title=o),i?(i!==e.tableData[t].content&&(n.content=i),Object.keys(n).length>2?(0,z.aQ)(n).then((t=>{const{code:l,message:a}=t.data;200===l?(C.z8.success(a),e.getTableData(),e.editDialogVisible=!1):C.z8.error(a)})):C.z8.warning("什么都没有更改！")):C.z8.error("公告信息内容不能为空")):C.z8.error("公告信息标题不能为空")):C.z8.error("请选择公告所在的用户组，这将决定哪些用户可以看到公告！")}}},M=l(89);const v=(0,M.Z)(U,[["render",y],["__scopeId","data-v-608b6e62"]]);var R=v}}]);
//# sourceMappingURL=783.9e563579.js.map