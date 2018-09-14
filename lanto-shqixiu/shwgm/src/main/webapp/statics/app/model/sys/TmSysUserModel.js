Ext.define('app.model.sys.TmSysUserModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'USER_ID' , type:'int', label:'用户ID'},
		{name:'USER_CODE' , type:'string', label:'用户帐号',req:true},
		{name:'USER_NAME' , type:'string', label:'用户姓名',req:true},
		{name:'USER_SEX' , type:'string', label:'用户性别',req:true,val:'dict|dict.'+app.utils.SysCodes.SEX},
		{name:'USER_TYPE' , type:'string', label:'用户类别'},
		{name:'PASSWORD' , type:'string', label:'密码'},
		{name:'TELPHONE' , type:'string', label:'联系电话'},
		{name:'BLONG_AREA' , type:'string', label:'所属辖区'},
		{name:'AREA_NAME' , type:'string', label:'所属辖区'},
		{name:'POSITION' , type:'string', label:'所属职务'},
		{name:'LAW_NUM' , type:'string', label:'执法证号'},
		{name:'IS_VALID' , type:'string', label:'是否有效',val:'dict|dict.'+app.utils.SysCodes.STATUS,req:true},
		{name:'ROLE_ID' , type:'string', label:'角色ID'},
		{name:'CORP_ID' , type:'int', label:'企业ID'},
		{name:'DEPT_ID' , type:'int', label:'部门ID'},
		{name:'ROLE_NAME' , type:'string', label:'所属角色'},
		{name:'OTHER_PARAMS',TYPE:'string' , label:'OTHER_PARAMS'}
		
	]
});