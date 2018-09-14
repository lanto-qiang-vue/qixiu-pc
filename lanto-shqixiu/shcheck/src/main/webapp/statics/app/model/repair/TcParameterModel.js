Ext.define('app.model.repair.TcParameterModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
		{name:'PARAMS_ID' , type:'int', label:'PARAMS_ID'},
		{name:'CORP_ID' , type:'string', label:'CORP_ID'},
		{name:'PARAMS_CODE' , type:'string', label:'参数编码'},
		{name:'PARAMS_NAME' , type:'string', label:'参数名称'},
		{name:'PARAMS_VALUE' , type:'int', label:'参数值'},
		{name:'PARAMS_UNIT' , type:'string', label:'参数单位',val:'dict|dict.'+app.utils.SysCodes.PARAMS_UNIT},
		{name:'IS_STOP' , type:'string', label:'是否有效',val:'dict|dict.'+app.utils.SysCodes.STATUS},
		{name:'PERATOR_ID' , type:'string', label:'PERATOR_ID'}
	]
});