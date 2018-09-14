Ext.define('app.model.sys.TbBdCodeModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CODE_ID' , type:'string', label:'参数编码'},
		{name:'CODE_DESC' , type:'string', label:'参数名称'},
		{name:'TYPE' , type:'string', label:'类型编码'},
		{name:'TYPE_CODE', type:'string', label:'类型'},
		{name:'TYPE_NAME' , type:'string', label:'类型名称'},
		{name:'NUM' , type:'int', label:'排序'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.'+app.utils.SysCodes.STATUS},
		{name:'CREATE_BY' , type:'string', label:'创建人'},
		{name:'CREATE_DATE' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s'},
		{name:'UPDATE_BY' , type:'string', label:'修改人'},
		{name:'UPDATE_DATE' , type:'date', label:'修改时间',dateFormat:'Y-m-d H:i:s'}
	]
});