Ext.define('app.model.sys.TpSysUserModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'USER_ID' , type:'int', label:'用户ID'},
		{name:'EXPERT_ID' , type:'int', label:'专家ID'},
		{name:'EXPERT_NAME' , type:'string', label:'专家姓名'},
		{name:'USER_CODE' , type:'string', label:'用户帐号',req:true,isShowGrid:true,query: 'eq'},
		{name:'USER_NAME' , type:'string', label:'用户姓名',req:true,isShowGrid:true,query: 'eq'},
		{name:'USER_SEX' , type:'string', label:'用户性别',req:true,val:'dict|dict.1003',isShowGrid:true},
		{name:'PASSWORD' , type:'string', label:'密码',isShowGrid:true},
		{name:'TELPHONE' , type:'string', label:'联系电话',isShowGrid:true},
		{name:'EMAIL' , type:'string', label:'电子邮件',isShowGrid:true},
		{name:'PHOTO' , type:'string', label:'照片'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1001',req:true,isShowGrid:true,query: 'eq'},
		{name:'CREATE_TIME' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true}
		
	]
});