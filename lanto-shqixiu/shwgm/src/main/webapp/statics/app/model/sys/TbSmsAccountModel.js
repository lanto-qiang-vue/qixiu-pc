Ext.define('app.model.sys.TbSmsAccountModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'用户ID',isShowGrid:false},
		{name:'USER_NAME' , type:'string', label:'帐户名',req:true},
		{name:'PASSWORD' , type:'string', label:'密码',req:true},
		{name:'SIGN' , type:'string', label:'签名',req:true},
		{name:'URL' , type:'string', label:'访问地址',req:true},
		{name:'SURPLUS_URL' , type:'string', label:'查询剩余短信地址'},
		{name:'SURPLUS_NUMBER' , type:'int', label:'剩余短信条数'}
	]
});