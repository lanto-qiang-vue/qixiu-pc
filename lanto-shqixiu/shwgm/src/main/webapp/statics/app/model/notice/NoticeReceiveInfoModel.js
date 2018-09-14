Ext.define('app.model.notice.NoticeReceiveInfoModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
		{name:'CORP_NAME' , type:'string', label:'企业名称'},
		{name:'SEE_DATE' , type:'date', label:'查看时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true}
		//{name:'SEE_DATE' , type:'date', label:'查看时间',dateFormat:'Y-m-d H:i:s'}
	]
});