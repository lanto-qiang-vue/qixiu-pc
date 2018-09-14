Ext.define('app.model.vehicle.VehicleYearCheck',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CHECK_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'VEHICLE_ID' , type:'int', label:'车辆ID',isShowGrid:false},
		{name:'PLATE_NUM' , type:'string', label:'车牌号码',isShowGrid:true,req:true,query:'lk'},
		{name:'CORP_NAME' , type:'string', label:'企业名称',isShowGrid:true},
		{name:'CHECK_YEAR' , type:'int', label:'年审年度',isShowGrid:false,query:'eq',req:true},
		{name:'CHECK_TIME' , type:'date', label:'审核时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'},
		{name:'CHECK_RESULT' , type:'string', label:'审核结论',isShowGrid:true,val:'dict|dict.1048',req:true},
		{name:'CHECK_PERSON' , type:'string', label:'审核人员',isShowGrid:true},
		{name:'CHECK_REMARK' , type:'string', label:'审核意见',isShowGrid:true}
	]
});
