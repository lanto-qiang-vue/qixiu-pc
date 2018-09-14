Ext.define('app.model.employee.TbEmployeeModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'EMPLOYEE_ID' , type:'int', label:'人员ID'},
		{name:'NAME' , type:'string', label:'姓名',req:true},
		{name:'ID_NUM' , type:'string', label:'身份证号',req:true},
		{name:'SEX' , type:'string', label:'性别',val:'dict|dict.'+app.utils.SysCodes.SEX,req:true},
		{name:'BIRTH_DATE' , type:'date', label:'出生日期',dateFormat:'Y-m-d H:i:s'},
		{name:'POST' , type:'string', label:'工作岗位',val:'dict|dict.1037'},
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'CORP_NUM' , type:'string', label:'企业编号'},
		{name:'CORP_NAME' , type:'string', label:'企业名称'},
		{name:'TELPHONE' , type:'string', label:'联系方式',req:true},
		{name:'ADDRESS' , type:'string', label:'住址'},
		{name:'STATUS' , type:'string', label:'状态'},
		{name:'REMARK' , type:'string', label:'人员简介'},
		{name:'PHOTO' , type:'string', label:'照片(仅作演示用)'},
		{name:'DEGREE' , type:'string', label:'学历',val:'dict|dict.1036'},
		{name:'CORP_TYPE' , type:'string', label:'企业类型',req:true,val:'dict|dict.'+app.utils.SysCodes.DB_JYFW}
	]
});