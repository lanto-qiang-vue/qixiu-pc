Ext.define('app.model.corp.TbExamHisModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'HIS_ID' , type:'int', label:'ID'},
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'EXAM_YEAR' , type:'int', label:'考核年度'},
		{name:'EXAM_LEVEL' , type:'string', label:'考核等级'}
	]
});