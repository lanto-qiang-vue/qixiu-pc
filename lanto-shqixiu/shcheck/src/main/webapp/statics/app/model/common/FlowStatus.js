Ext.define('app.model.common.FlowStatus',{
	extend:'jsf.data.VO',
	fields:[
		{name:'id' , type:'string', label:'任务ID'},
		{name:'orderId' , type:'string', label:'实例ID'},
		{name:'processId' , type:'string', label:'流程ID'},
		{name:'processDisplayName' , type:'string', label:'业务名称'},
		{name:'orderNo' , type:'string', label:'业务编码'},
		{name:'instanceUrl' , type:'string', label:'流程启动URL'},
		{name:'displayName' , type:'string', label:'任务名称'},
		{name:'createTime' , type:'string', label:'任务抵达时间'},
		{name:'finishTime' , type:'string', label:'任务完成时间'},
		{name:'operator' , type:'string', label:'任务处理人'},
		{name:'variable' , type:'String' , label:'处理结果'}
		]
});