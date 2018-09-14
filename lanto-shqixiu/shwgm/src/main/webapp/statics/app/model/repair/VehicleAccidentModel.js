Ext.define('app.model.repair.VehicleAccidentModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ACCIDENT_ID', type:'int', label:'ACCIDENT_ID'},	
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:false},
		{name:'ACCIDENT_DATE' , type:'date', label:'事故日期',dateFormat:'Y-m-d H:i:s'},
		{name:'ACCIDENT_ADDR' , type:'string', label:'事故地址'},
		{name:'ACCIDENT_NATURE' , type:'string', label:'事故性质'},
		{name:'ACCIDENT_RESPONSIBILITY' , type:'string', label:'事故责任'},
		{name:'ACCIDENT_DESCRIPTION' , type:'string', label:'事故种类及车辆损坏情况'},	
		{name:'ECONOMIC_LOSSES', type:'int', label:'企业直接经济损失(元)'},		
		{name:'ACCIDENT_REGISTRANT' , type:'string', label:'登记人'}
	]
});