Ext.define('app.model.corp.TbCorpQualificationLogModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'LOG_ID' , type:'int', label:'历史ID'},
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'QUALI_ID' , type:'int', label:'资质ID'},
		{name:'CORP_NUM' , type:'string', label:'企业编号',req:true},
		{name:'CORP_NAME' , type:'string', label:'企业名称',req:true},
		{name:'CORP_AREA' , type:'string', label:'所属辖区'},
		{name:'CORP_TYPE' , type:'string', label:'企业类型',req:true,val:'dict|dict.'+app.utils.SysCodes.DB_JYFW},
		{name:'OPE_TYPE' , type:'string', label:'操作类型',val:'dict|dict.'+app.utils.SysCodes.OPE_TYPE},
		{name:'OPE_OBJECT' , type:'string', label:'操作对象',val:'dict|dict.'+app.utils.SysCodes.OPE_OBJECT},
		{name:'OPE_CAUSE' , type:'string', label:'开通/取消原因'},
		{name:'OPE_TIME' , type:'string', label:'操作时间'},
		{name:'OPE_PERSON' , type:'int', label:'操作人'}
	]
});