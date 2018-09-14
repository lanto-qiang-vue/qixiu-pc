Ext.define('app.model.manage.publicservice.Complaint',{
	extend:'jsf.data.VO',
	fields:[
		{name:'COMPLAINT_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'TITLE' , type:'string', label:'标题',query: 'lk',isShowGrid:true,req:true},
		{name:'NAME' , type:'string', label:'姓名',query: 'eq',isShowGrid:true,req:true},
		{name:'ID_NUM' , type:'string', label:'身份证',query: 'lk',isShowGrid:true},
		{name:'UNIT_NAME' , type:'string', label:'投诉单位',isShowGrid:true},
		{name:'INVOLVE_CAR' , type:'string', label:'涉及车辆',isShowGrid:true},
		{name:'LINK_TEL' , type:'string', label:'联系电话',isShowGrid:true},
		{name:'LINK_ADDR' , type:'string', label:'联系地址',isShowGrid:true},
		{name:'EMAIL' , type:'string', label:'电子邮箱',isShowGrid:true},
		{name:'TYPE' , type:'string', label:'投诉类型',isShowGrid:true,val:'dict|dict.1033',query:'eq'},
		{name:'QUEST_TYPE' , type:'string', label:'问题类别',isShowGrid:true},
		{name:'CONTENT' , type:'string', label:'投诉内容',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,val:'dict|dict.1034',query:'eq'},
		{name:'ADD_TIME' , type:'date', label:'投诉时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'ACCEPT_PERSON' , type:'string', label:'受理人',isShowGrid:true},
		{name:'ACCEPT_TIME' , type:'date', label:'受理时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'},
		{name:'END_PERSON' , type:'string', label:'办结人',isShowGrid:true},
		{name:'END_TIME' , type:'string', label:'办结时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'},
		{name:'END_CONTENT' , type:'string', label:'办结内容',isShowGrid:true},
		{name:'ADD_DATE' , type:'date', label:'投诉日期',dateFormat:'Y-m-d',query:'rg'}
		]
});
