Ext.define('app.model.corp.TbCorpDailyCheckModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'DAILY_ID' , type:'int', label:'日常检查ID'},
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'ORDER_ID' , type:'string', label:'ORDER_ID'},
		{name:'CORP_NUM' , type:'string', label:'企业编号',req:true},
		{name:'CORP_NAME' , type:'string', label:'企业名称',req:true},
		{name:'CORP_AREA' , type:'string', label:'所属辖区'},
		{name:'OPE_AREA' , type:'string', label:'操作员辖区'},
		{name:'CORP_TYPE' , type:'string', label:'企业类型',req:true,val:'dict|dict.'+app.utils.SysCodes.DB_JYFW},
		{name:'CHECK_COENT' , type:'string', label:'检查内容',req:true},
		{name:'CHECK_RESULT' , type:'string', label:'检查结果',req:true},
		{name:'CHECK_TIME' , type:'date', label:'检查时间',dateFormat:'Y-m-d H:i:s',query:'rg',req:true},
		{name:'ADD_TIME' , type:'string', label:'录入时间'},
		{name:'CHECK_PERSON' , type:'string', label:'检查员',req:true},
		{name:'OPERATOR' , type:'string', label:'操作员'},
		{name:'OPERATOR_NAME' , type:'string', label:'操作员'},
		{name:'REMARK' , type:'string', label:'备注'},
		{name:'RECT_ITEM' , type:'string', label:'整改项目'},
		{name:'IS_RECT' , type:'string', label:'是否需整改',val:'dict|dict.'+app.utils.SysCodes.YESNO},
		{name:'RECT_RESULT' , type:'string', label:'整改备注'},
		{name:'STATUS' , type:'string', label:'检查状态',val:'dict|dict.'+app.utils.SysCodes.DAILY_STATUS},
		{name:'ORDER_NO' , type:'string', label:'业务编号'}
	]
});