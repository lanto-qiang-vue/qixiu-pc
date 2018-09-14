Ext.define('app.model.sys.TqSysInspectorModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
		{name:'CERT_NUM' , type:'string', label:'证件号码',req:true},
		{name:'NAME' , type:'string', label:'姓名',req:true}
	]
});