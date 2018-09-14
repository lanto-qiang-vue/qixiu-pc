Ext.define('app.model.credit.TbExamFileFgsModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
		{name:'FILE_ID' , type:'string', label:'质量考核档案号'},
		{name:'CORP_NAME' , type:'string', label:'企业名称'},
		{name:'CORP_ADD' , type:'string', label:'企业地址'}
	]
});