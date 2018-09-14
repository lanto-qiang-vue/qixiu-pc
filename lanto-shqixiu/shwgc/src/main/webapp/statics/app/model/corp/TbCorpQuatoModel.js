Ext.define('app.model.corp.TbCorpQuatoModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
		{name:'CORP_ID' , type:'int', label:'企业编号',query:'eq'},
		{name:'CREATE_USER' , type:'string', label:'创建用户'},
		{name:'REMARK' , type:'string', label:'备注'},
		{name:'TYPE' , type:'string', label:'类型',val:'dict|dict.1042'},
		{name:'CREATE_TIME' , type:'datetime', label:'创建时间',dateFormat:'Y-m-d H:i:s'},
		{name:'CREATE_QUATO_COUNT' , type:'int', label:'建档配额'},
		{name:'UPLOAD_QUATO_COUNT' , type:'int', label:'维修记录配额'},
		{name:'SEARCH_QUATO_COUNT' , type:'int', label:'查询配额'},
		{name:'CREATE_QUATO' , type:'int', label:'建档配额'},
		{name:'UPLOAD_QUATO' , type:'int', label:'维修记录配额'},
		{name:'SEARCH_QUATO' , type:'int', label:'查询配额'}
	]
});