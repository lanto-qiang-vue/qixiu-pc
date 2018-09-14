Ext.define('app.model.service.OnSiteServiceModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'SERVICE_ID' , type:'int', label:'SERVICE_ID',isShowGrid:false},
		{name:'CORP_ID' , type:'int', label:'企业ID',isShowGrid:false,query:'eq'},
		{name:'SERVICE_TIME' , type:'date',dateFormat:'Y-m-d H:i:s',label:'服务时间',isShowGrid:true},
		{name:'SERVICE_CONTENT' , type:'string', label:'服务内容',isShowGrid:true},
		{name:'ADDRESS' , type:'string', label:'服务地址',isShowGrid:true},
		{name:'CONTACT_PERSON' , type:'string', label:'联系人',isShowGrid:true,query:'lk'},
		{name:'CONTACT_PHONE' , type:'string', label:'联系电话',isShowGrid:true,query:'lk'},
		{name:'BACK_INFO' , type:'string', label:'反馈信息',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,val:'dict|dict.1050',query:'lk'}
	]
});