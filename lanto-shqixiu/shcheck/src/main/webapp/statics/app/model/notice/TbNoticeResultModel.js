Ext.define('app.model.notice.TbNoticeResultModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'RESULT_ID' , type:'int', label:'回执ID'},
		{name:'NOTICE_ID' , type:'int', label:'通告ID'},
		{name:'RESULT_BY' , type:'string', label:'回执人'},
		{name:'RESULT_DATE' , type:'date', label:'回执时间',dateFormat:'Y-m-d H:i:s'},
		{name:'RESULT_CONTENT' , type:'string', label:'回执内容'},
		{name:'IS_ALREAD_RESULT' , type:'string', label:'是否回执'},
		{name:'RESULT_BY_CODE' , type:'string', label:'回执人ID'},
		{name:'RESULT_TYPE' , type:'string', label:'回执类型'}
	]
});