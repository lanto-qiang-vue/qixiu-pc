Ext.define('app.model.trans.VehiclePlanModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'PLAN_ID' , type:'int', label:'PLAN_ID',isShowGrid:false},
		{name:'PLAN_CODE' , type:'string', label:'计划编号',isShowGrid:true},
		{name:'PLAN_YEAR' , type:'string', label:'维护年份',query: 'eq',isShowGrid:true},
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:true},
		{name:'REPAIR_CYCLE' , type:'string', label:'维护周期',isShowGrid:true,req:true},
		{name:'REPAIR_MILEAGE' , type:'string', label:'维护里程',isShowGrid:true,req:true},
		{name:'CREATE_DATE' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true},
		{name:'VENDER' , type:'string', label:'厂家',query: 'eq',isShowGrid:true},
		{name:'BRAND' , type:'string', label:'品牌',query: 'eq',isShowGrid:true},
		{name:'XM' , type:'string', label:'车型',query: 'eq',isShowGrid:true},
		{name:'VENDER_' , type:'string', label:'厂家',query: 'eq',isShowGrid:true},
		{name:'BRAND_' , type:'string', label:'品牌',query: 'eq',isShowGrid:true},
		{name:'XM_' , type:'string', label:'车型',query: 'eq',isShowGrid:true},
		{name:'CORP_NAME' , type:'string', label:'所属运输企业',isShowGrid:true},
		{name:'PLATE_NUM' , type:'string', label:'车牌号',query: 'lk',isShowGrid:true},
		{name:'PLATE_COLOR' , type:'string', label:'车牌颜色',query: 'eq',isShowGrid:true,val:'dict|dict.1006'},
		{name:'VEHICLE_TYPE' , type:'string', label:'车辆类型',query: 'eq',isShowGrid:true,val:'dict|dict.1007'},
		{name:'STATUS' , type:'string', label:'营运状态',query: 'eq',isShowGrid:true,val:'dict|dict.1008'},
		{name:'DJ_STATUS' , type:'string', label:'单据状态',isShowGrid:true,val:'dict|dict.1019'}
	]
});