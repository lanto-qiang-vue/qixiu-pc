Ext.define('app.model.notice.InfoPublic',{
	extend:'jsf.data.VO',
	fields:[
		{name:'INFO_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'INFO_TYPE' , type:'string', label:'信息类型',query: 'eq',isShowGrid:false,req:true,val:'dict|dict.1028'},
		{name:'IMPORTANT_FLAG' , type:'string', label:'重要标识',query: 'eq',isShowGrid:false,val:'dict|dict.1004'},
		{name:'TITLE' , type:'string', label:'标题',query: 'lk',isShowGrid:true,req:true},
		{name:'CONTENT' , type:'string', label:'内容',query: 'lk',isShowGrid:true},
		{name:'CREATOR' , type:'string', label:'发布人',query: 'lk',isShowGrid:true,req:true},
		{name:'DATA_FROM' , type:'string', label:'来源',query: 'lk',isShowGrid:true,req:true},
		{name:'PHOTO' , type:'string', label:'照片',isShowGrid:false},
		{name:'CREATE_TIME' , type:'date', label:'添加时间',dateFormat:'Y-m-d H:i:s',query: 'rg',isShowGrid:true},
		{name:'UPDATE_TIME' , type:'date', label:'修改时间',dateFormat:'Y-m-d H:i:s',query: 'rg',isShowGrid:true},
		{name:'PUBLISH_STATUS' , type:'string', label:'发布状态',query: 'eq',isShowGrid:true,val:'dict|dict.1031'},
		{name:'PUBLISH_TIME' , type:'date', label:'发布时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true}
		]
});
