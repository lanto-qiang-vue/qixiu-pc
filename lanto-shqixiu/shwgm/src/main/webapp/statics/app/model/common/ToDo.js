Ext.define('app.model.common.ToDo',{
	extend:'jsf.data.VO',
	fields:[
		{name:'processId' , type:'string', label:'流程ID'},
		{name:'orderId' , type:'string', label:'实例ID'},
		{name:'taskId' , type:'string', label:'任务ID'},
		{name:'processName' , type:'string', label:'业务名称',req:true},
		{name:'orderNo' , type:'string', label:'业务编号',req:true},
		{name:'orderCreateTime' , type:'string', label:'申请时间'},
		{name:'taskName' , type:'string', label:'任务环节'},
		{name:'taskCreateTime' , type:'string', label:'任务抵达时间'}
		]
});