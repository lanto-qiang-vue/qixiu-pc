Ext.define('app.model.common.ToDoCC',{
	extend:'jsf.data.VO',
	fields:[
		{name:'processId' , type:'string', label:'流程ID'},
		{name:'id' , type:'string', label:'实例ID'},
		{name:'taskId' , type:'string', label:'任务ID'},
		{name:'processName' , type:'string', label:'业务名称',req:true},
		{name:'orderNo' , type:'string', label:'业务编号',req:true},
		{name:'createTime' , type:'string', label:'创建时间'},
		{name:'endTime' , type:'string', label:'结束时间'},
		{name:'expireTime' , type:'string', label:'期望完成时间'},
		{name:'creator' , type:'string', label:'创建人'},
		{name:'orderState' , type:'string', label:'状态'}
		]
});