Ext.define('app.model.notice.TbNoticeModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'NOTICE_ID' , type:'Long', label:'ID'},
		{name:'NOTICE_TITLE' , type:'string', label:'通知标题'},
		{name:'SEND_DATE' , type:'date', label:'发送时间',dateFormat:'Y-m-d H:i:s',query:'rg'},
		{name:'SEND_BY' , type:'string', label:'发送人'},
		{name:'DATA_FROM' , type:'string', label:'来源'},
		{name:'CREATE_DATE' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s'},
		{name:'CREATOR' , type:'string', label:'创建人'},
		{name:'IS_RESULT' , type:'string', label:'是否需要回执',val:'dict|dict.'+app.utils.SysCodes.YESNO},
		{name:'CONTENT' , type:'string', label:'通知内容'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1029'},
		{name:'IS_SEE' , type:'string', label:'是否查看',val:'dict|dict.'+app.utils.SysCodes.YESNO},
		{name:'IS_ALREAD_RESULT' , type:'string', label:'是否回执',val:'dict|dict.'+app.utils.SysCodes.YESNO},
		{name:'CLIENT_ACTOR' , type:'string', label:'选择企业'},
		{name:'CLIENT_ACTOR_DISPLAY' , type:'string', label:'选择企业'},
		{name:'MANAGE_ACTOR' , type:'string', label:'管理端用户'},
		{name:'ACTOR_ID' , type:'string', label:'用户ID'},
		{name:'SEE_DATE' , type:'date', label:'查看时间',dateFormat:'Y-m-d H:i:s'},
		{name:'SEE_NUM' , type:'int',label:'已查看数量'},
		{name:'SUM_NOTICE' , type:'int',label:'发送数量'},
		{name:'NOT_SEE_NUM' , type:'int',label:'未查看数量'}
	]
});