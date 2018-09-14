Ext.define('app.model.manage.publicservice.CommentManage',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CORP_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'CORP_NAME' , type:'string', label:'企业名称',query: 'lk',isShowGrid:true,req:true},
		{name:'MAGOR_BRANDS' , type:'string', label:'主修品牌',query: 'lk',isShowGrid:true,req:true},
		{name:'COMMENT_COUNT' , type:'int', label:'评价次数',isShowGrid:true},
		{name:'AVG_STAR' , type:'float', label:'评价平均分',isShowGrid:true}
		//{name:'STAR' , type:'float', label:'服务星级',isShowGrid:true}
		]
});
