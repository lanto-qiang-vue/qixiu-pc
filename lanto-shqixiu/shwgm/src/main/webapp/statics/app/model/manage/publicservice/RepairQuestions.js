Ext.define('app.model.manage.publicservice.RepairQuestions',{
	extend:'jsf.data.VO',
	fields:[
		{name:'QUES_ID' , type:'int', label:'QUES_ID',isShowGrid:false},
		{name:'USER_ID' , type:'int', label:'USER_ID',isShowGrid:false},
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:false},
		{name:'EXPERT_ID' , type:'int', label:'EXPERT_ID',isShowGrid:false},
		{name:'ANSWER_ID' , type:'int', label:'ANSWER_ID',isShowGrid:false},
		{name:'TYPE' , type:'string', label:'类型',query: 'eq',isShowGrid:true,val:'dict|dict.1040'},
		{name:'CONTENT' , type:'string', label:'提问内容',isShowGrid:true,req:true},
		{name:'VIEW_NUMBER' , type:'string', label:'浏览次数',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,val:'dict|dict.1039',query:'eq'},
		{name:'CREATE_TIME' , type:'date', label:'提问时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'}
		]
});
