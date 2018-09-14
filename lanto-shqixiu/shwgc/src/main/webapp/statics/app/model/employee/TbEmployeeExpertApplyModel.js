Ext.define('app.model.employee.TbEmployeeExpertApplyModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'APPLY_ID' , type:'int', label:'ID'},
		{name:'NAME' , type:'string', label:'姓名',req:true,query:'lk'},
		{name:'ID_NUM' , type:'string', label:'身份证号',req:true},
		{name:'SEX' , type:'string', label:'性别',val:'dict|dict.'+app.utils.SysCodes.SEX,req:true,query:'eq'},
		{name:'BIRTH_DATE' , type:'date', label:'出生日期',dateFormat:'Y-m-d H:i:s'},
		{name:'EMP_UNIT' , type:'string', label:'就职单位',query:'lk',req:true},
		{name:'TELPHONE' , type:'string', label:'联系方式',req:true},
		{name:'ADDRESS' , type:'string', label:'住址'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1032'},
		
		{name:'PHOTO' , type:'string', label:'照片(仅作演示用)'},
		{name:'DEGREE' , type:'string', label:'学历',val:'dict|dict.1036',query:'eq'},
		
		{name:'NATIVE_PLACE' , type:'string', label:'籍贯'},
		{name:'PROFESSOR' , type:'string', label:'职称'},
		{name:'HONOR' , type:'string', label:'主要荣誉',req:true},
		{name:'GOOD_AT' , type:'string', label:'专业擅长',query:'lk',req:true},
		
		{name:'FWDJ' , type:'string', label:'服务等级'}
	]
});