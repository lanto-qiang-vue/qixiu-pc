Ext.define('app.model.VehicleCheckModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CHECK_ID' , type:'int', label:'CHECK_ID',isShowGrid:false},
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:false},
		{name:'PLATE_NUM' , type:'string', label:'车牌号',isShowGrid:true},
		{name:'PLATE_COLOR' , type:'string', label:'车牌颜色',query: 'eq',isShowGrid:true,val:'dict|dict.1006'},
		{name:'CHECK_DATE' , type:'date', label:'检测评定日',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'LC_RECORD' , type:'string', label:'行驶里程记录',query: 'eq',isShowGrid:true},
		{name:'CHECK_TYPE' , type:'string', label:'检测类型',query: 'eq',isShowGrid:true},
		{name:'CHECK_DJ' , type:'string', label:'车辆技术等级',query: 'lk',isShowGrid:true},
		{name:'VEH_DJ' , type:'string', label:'客车类型及等级',query: 'eq',isShowGrid:true},
		{name:'CORP_NAME' , type:'string', label:'检测评定单 位',query: 'eq',isShowGrid:true},
		{name:'DJR' , type:'string', label:'登记人',query: 'eq',isShowGrid:true},
		{name:'CREATE_DATE' , type:'date', label:'区县',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
			
		{name:'IMAGE1' , type:'string', label:'IMAGE1'},
		{name:'IMAGE2' , type:'string', label:'IMAGE2'},
		{name:'IMAGE3' , type:'string', label:'IMAGE3'}
	]
});