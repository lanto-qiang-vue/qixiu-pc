Ext.define('app.model.repair.RepairRecordModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'RECORD_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'CORP_ID' , type:'int', label:'企业ID',isShowGrid:false,query:'eq'},
		{name:'CORP_NAME' , type:'string', label:'维修企业',isShowGrid:true},
		{name:'VEHICLE_ID' , type:'int', label:'车辆ID',isShowGrid:false,query:'eq'},
		{name:'PLATE_NUM' , type:'string', label:'车牌号码',isShowGrid:true,query:'lk',req:true},
		{name:'ENGINE_NUMBER' , type:'string', label:'发动机号码',isShowGrid:true},
		{name:'CAR_VIN' , type:'string', label:'车架号',isShowGrid:true},
		{name:'REPAIR_DATE' , type:'date',dateFormat:'Y-m-d H:i:s',label:'送修时间',isShowGrid:true},
		{name:'REPAIR_MILE' , type:'int', label:'送修里程',isShowGrid:true},
		{name:'REPAIR_PERSON' , type:'String', label:'送修人',isShowGrid:true},
		{name:'REPAIR_PERSON_PHONE' , type:'String', label:'联系电话',isShowGrid:true},
		{name:'FAULT_DESCRIPT' , type:'string', label:'故障描述',isShowGrid:true},
		{name:'FAULT_REASON' , type:'string', label:'故障原因',isShowGrid:true},
		{name:'SETTLE_DATE' , type:'date', label:'结算日期',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'STATEMENT_NO' , type:'string', label:'结算清单编号',isShowGrid:true},
		{name:'START_REPAIR_TIME' , type:'date', label:'开工时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'},
		{name:'END_REPAIR_TIME' , type:'date', label:'完工时间',isShowGrid:true,dateFormat:'Y-m-d H:i:s'},
		{name:'REPAIR_STATION' , type:'string', label:'维修工位',isShowGrid:true},
		{name:'STATION_NAME' , type:'string', label:'维修工位',isShowGrid:true},
		{name:'REPAIR_HAVE_TIME' , type:'string', label:'维修已用时',isShowGrid:false},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,query:'eq'},
		{name:'STATUS_' , type:'string', label:'状态',convert:function(v,r){
			return funutils.renderer(r.get('STATUS'));
		}},
		{name:'OWNER_PHONE' , type:'string', label:'车主联系电话',isShowGrid:false}
	]
});