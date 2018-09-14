Ext.define('app.model.sys.TqSysOperateLogModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'LOG_ID' , type:'int', label:'LOG_ID'},
		{name:'OPERATOR_ID' , type:'string', label:'操作人'},
		{name:'MACHINE_ID' , type:'string', label:'IP地址'},
		{name:'MODULE_NAME' , type:'string', label:'菜单名称'},
		{name:'OPERATE_TIMERG' , type:'date', label:'操作时间',dateFormat:'Y-m-d H:i:s',query:'rg'},
		{name:'OPERATE_TIME' , type:'string', label:'操作时间'},
		{name:'OPERATE_CONTENT' , type:'string', label:'操作内容'}
	]
});