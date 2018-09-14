Ext.define('app.model.common.Corp',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'CORP_NUM' , type:'string', label:'企业编号',req:true},
		{name:'CORP_NAME' , type:'string', label:'企业名称',req:true},
		{name:'CORP_AREA' , type:'string', label:'所属辖区'},
		{name:'CORP_ADD' , type:'string', label:'企业地址'},
		{name:'LEGAL_PERSON' , type:'string', label:'法人代表'},
		{name:'REPAIR_TYPES' , type:'string', label:'维修项目种类',req:true,val:'dict|dict.'+app.utils.SysCodes.DB_REPAIR_TYPES},
		{name:'CORP_TYPE' , type:'string', label:'经营范围',req:true,val:'dict|dict.'+app.utils.SysCodes.DB_JYFW},
		{name:'CORP_STYPE' , type:'string', label:'兼营范围',val:'dict|dict.'+app.utils.SysCodes.DB_JIYFW},
		{name:'ECONOMIC_NATURE' , type:'string', label:'经济性质',val:'dict|dict.'+app.utils.SysCodes.ECONOMIC_NATURE},
		{name:'ACCOUNT_TYPE' , type:'string', label:'核算形式',val:'dict|dict.'+app.utils.SysCodes.ACCOUNT_TYPE},
		{name:'BUSINESS_NUM' , type:'string', label:'道路经营许可证号'},
		{name:'VALID_START_DATE' , type:'date', label:'许可证有效开始日期',dateFormat:'Y-m-d H:i:s'},
		{name:'VALID_END_DATE' , type:'date', label:'许可证有效结束日期',dateFormat:'Y-m-d H:i:s'},
		{name:'STATUS' , type:'string', label:'营业状态',val:'dict|dict.'+app.utils.SysCodes.CORP_STATUS}
		]
});