Ext.define('app.model.check.CheckRecordModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CHECK_ID' , type:'int', label:'CHECK_ID',isShowGrid:false},
		{name:'STATION_ID' , type:'int', label:'企业ID',isShowGrid:false,query:'eq'},
		{name:'VEHICLE_ID' , type:'int', label:'车辆ID',isShowGrid:false},
		{name:'RECORD_ID' , type:'int', label:'维修记录ID',isShowGrid:false},
		{name:'PLATE_NUM' , type:'string', label:'车牌号码',isShowGrid:true,query:'lk'},
		{name:'CHECK_START_TIME' , type:'date', label:'检测开始时间',dateFormat:'Y-m-d H:i:s'},
		{name:'CHECK_END_TIME' , type:'date', label:'检测结束时间',dateFormat:'Y-m-d H:i:s'},
		{name:'TRANS_CORP_NAME' , type:'string', label:'运输企业',isShowGrid:true},
		{name:'CHECK_TYPE' , type:'string', label:'检测类型',val:'dict|dict.1045',isShowGrid:true,query:'eq'},
		{name:'VEHICLE_LEVEL' , type:'string', label:'车辆等级',isShowGrid:true,val:'dict|dict.1046'},
		{name:'CHECK_PRESON' , type:'string', label:'检测人员',isShowGrid:true,query:'lk'},
		{name:'CHECK_RESULT' , type:'string', label:'检测结论',isShowGrid:true,query:'eq',val:'dict|dict.1047',req:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,val:'dict|dict.1019'}
	]
});