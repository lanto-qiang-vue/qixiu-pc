Ext.define('app.model.notice.InfoPublic',{
	extend:'jsf.data.VO',
	fields:[
		{name:'INFO_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'INFO_TYPE' , type:'string', label:'信息类型',query: 'eq',isShowGrid:false,req:true,val:'dict|dict.1038'},
		{name:'TITLE' , type:'string', label:'标题',query: 'lk',isShowGrid:true,req:true},
		{name:'CONTENT' , type:'string', label:'内容',query: 'lk',isShowGrid:true},
		{name:'CREATOR' , type:'string', label:'发布人',query: 'lk',isShowGrid:true,req:true},
		{name:'DATA_FROM' , type:'string', label:'来源',query: 'lk',isShowGrid:true,req:true},
		{name:'CREATE_TIME' , type:'date', label:'添加时间',dateFormat:'Y-m-d H:i:s',query: 'rg',isShowGrid:true},
		{name:'UPDATE_TIME' , type:'date', label:'修改时间',dateFormat:'Y-m-d H:i:s',query: 'rg',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',query: 'eq',isShowGrid:true,val:'dict|dict.1001'}

		]
});
