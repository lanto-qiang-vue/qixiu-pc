Ext.define('app.model.report.RepairReport',{
	extend:'jsf.data.VO',
	fields:[
		{name:'AREA_CODE' , type:'string', label:'辖区编号',isShowGrid:false},
		{name:'AREA_NAME' , type:'string', label:'辖区名称',isShowGrid:true},
		{name:'VEHICLE_COUNT' , type:'int', label:'车辆总数',isShowGrid:true},
		{name:'ALREADY_OUT' , type:'int', label:'已逾期',isShowGrid:true},
		{name:'SOON_OUT' , type:'int', label:'即将逾期',isShowGrid:true},
		{name:'NO_PLAN' , type:'int', label:'未提交计划',isShowGrid:true},
		{name:'NO_RECORD' , type:'int', label:'不存在维修记录',isShowGrid:true},
		{name:'NORMAL' , type:'int', label:'正常维护',isShowGrid:true}
	]
});
