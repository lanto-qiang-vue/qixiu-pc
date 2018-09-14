Ext.define('app.model.manage.publicservice.SubQuestions',{
	extend:'jsf.data.VO',
	fields:[
		{name:'SUBJECT_ID' , type:'int', label:'ID',isShowGrid:false,query:'eq'},
		{name:'QUES_ID' , type:'int', label:'ID',isShowGrid:false,query:'eq'},
		{name:'SUB_TITLE' , type:'string', label:'标题',isShowGrid:true,req:true},
		{name:'CREATOR' , type:'string', label:'创建人',isShowGrid:true},
		{name:'CREATE_TIME' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,val:'dict|dict.1031',query:'eq'},
		{name:'SORT_INDEX' , type:'int', label:'排序',isShowGrid:false}
		]
});
