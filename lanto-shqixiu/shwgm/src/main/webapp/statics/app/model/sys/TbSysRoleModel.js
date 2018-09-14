Ext.define('app.model.sys.TbSysRoleModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ROLE_ID' , type:'int', label:'角色ID'},
		{name:'ROLE_CODE' , type:'string', label:'角色代码',req:true},
		{name:'ROLE_NAME' , type:'string', label:'角色名称',req:true},
		{name:'ROLE_TYPE' , type:'string', label:'角色类型',val:'dict|dict.'+app.utils.SysCodes.ROLETYPE},
		{name:'ROLE_STATUS' , type:'string', label:'状态',val:'dict|dict.'+app.utils.SysCodes.STATUS},
		{name:'CORP_ID' , type:'Long', label:'CORP_ID'}
	]
});