Ext.define('app.model.sys.TgSysUserModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'USER_ID' , type:'int', label:'用户ID'},
		{name:'USER_NAME' , type:'string', label:'用户姓名',req:true,isShowGrid:true,query: 'lk'},
		{name:'USER_SEX' , type:'string', label:'用户性别',req:true,val:'dict|dict.1003',isShowGrid:true},
		{name:'PASSWORD' , type:'string', label:'密码',isShowGrid:true},
		{name:'TELPHONE' , type:'string', label:'手机号码',req:true,isShowGrid:true,query: 'lk'},
		{name:'EMAIL' , type:'string', label:'电子邮件',isShowGrid:true},
		{name:'PHOTO' , type:'string', label:'照片'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1001',req:true,isShowGrid:true,query: 'eq'},
		{name:'CREATE_TIME' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true}
		
	]
});