Ext.define('app.model.privehicle.PrivateVehicle',{
	extend:'jsf.data.VO',
	fields:[
		{name:'VEHICLE_ID' , type:'int', label:'车辆ID',isShowGrid:false},
		{name:'USER_ID' , type:'int', label:'用户ID',isShowGrid:false,query:'eq'},
		{name:'PLATE_NUM' , type:'string', label:'车牌号码',isShowGrid:true,req:true,query:'lk'},
		{name:'VEHICLE_BRAND' , type:'string', label:'车辆品牌',isShowGrid:true},
		{name:'VEHICLE_TYPE' , type:'string', label:'车系',isShowGrid:false},
		{name:'VEHICLE_CAPACITY' , type:'string', label:'排量',isShowGrid:true},
		{name:'PRODUCTION_YEAR' , type:'string', label:'生产年份',isShowGrid:true},
		{name:'BUY_TIME' , type:'date', label:'购买日期',isShowGrid:true,dateFormat:'Y-m-d'},
		{name:'CREATE_TIME' , type:'date', label:'创建日期',isShowGrid:true,dateFormat:'Y-m-d'},
		{name:'VIN' , type:'string', label:'车架号',isShowGrid:true,req:true},
		{name:'ENGINE_NO' , type:'string', label:'发动机号',isShowGrid:true},
		{name:'OWNER_NAME' , type:'string', label:'车主姓名',isShowGrid:true,query:'lk',req:true},
		{name:'OWNER_PHONE' , type:'string', label:'联系电话',isShowGrid:true,query:'lk',req:true},
		{name:'USER_NAME' , type:'string', label:'绑定用户',isShowGrid:true,query:'lk'},
		{name:'VHEICLE_PHOTO' , type:'string', label:'车辆照片',isShowGrid:false}
		]
});
