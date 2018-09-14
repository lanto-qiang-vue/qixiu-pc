Ext.define('app.model.manage.publicservice.Comment',{
	extend:'jsf.data.VO',
	fields:[
		{name:'COMMENT_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'USER_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'USER_NAME' , type:'string', label:'用户名称',isShowGrid:true},
		{name:'CORP_ID' , type:'int', label:'ID',isShowGrid:false,query: 'eq'},
		{name:'CORP_NAME' , type:'string', label:'企业名称',isShowGrid:true},
		{name:'REPAIR_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'PLATE_NUM' , type:'string', label:'车牌号码',isShowGrid:true},
		{name:'STAR' , type:'int', label:'评分',isShowGrid:true},
		{name:'CONTENT' , type:'string', label:'服务评价',isShowGrid:true},
		{name:'INSERT_DATE' , type:'string', label:'评价时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'}
		]
});
