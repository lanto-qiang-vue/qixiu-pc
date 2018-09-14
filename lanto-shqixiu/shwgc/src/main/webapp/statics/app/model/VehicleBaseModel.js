Ext.define('app.model.VehicleBaseModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CARD_ID' , type:'int', label:'CARD_ID',isShowGrid:true},
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:false},
		{name:'TRANS_CORP_ID' , type:'string', label:'TRANS_CORP_ID',isShowGrid:true},
		{name:'RECORD_NO' , type:'string', label:'档案号',query: 'lk',isShowGrid:true},
		{name:'VENDER' , type:'string', label:'厂家',query: 'eq',isShowGrid:true},
		{name:'BRAND' , type:'string', label:'品牌',query: 'eq',isShowGrid:true},
		{name:'XM' , type:'string', label:'车型',query: 'eq',isShowGrid:true},
		{name:'VENDER_' , type:'string', label:'厂家',query: 'eq',isShowGrid:true},
		{name:'BRAND_' , type:'string', label:'品牌',query: 'eq',isShowGrid:true},
		{name:'XM_' , type:'string', label:'车型',query: 'eq',isShowGrid:true},
		{name:'PLATE_NUM' , type:'string', label:'车牌号',query: 'lk',isShowGrid:true},
		{name:'PLATE_COLOR' , type:'string', label:'车牌颜色',query: 'eq',isShowGrid:true,val:'dict|dict.1006'},
		{name:'VEHICLE_TYPE' , type:'string', label:'车辆类型',query: 'eq',isShowGrid:true,val:'dict|dict.1007'},
		{name:'STATUS' , type:'string', label:'营运状态',query: 'eq',isShowGrid:true,val:'dict|dict.1008'},
		{name:'COUNTY' , type:'string', label:'区县',isShowGrid:true},
		{name:'LOAD_CERT_NUM' , type:'string', label:'道路运输证号',isShowGrid:true},
		{name:'UNIT_NAME' , type:'string', label:'驾驶员',isShowGrid:true},
		{name:'CHASSIS_NUM' , type:'string', label:'车架号',isShowGrid:true},
		{name:'ENGINE_NUM' , type:'string', label:'发动机号',isShowGrid:true},
		{name:'FUEL_TYPE' , type:'string', label:'燃料类型',isShowGrid:true,val:'dict|dict.1011'},
		{name:'TONNAGE' , type:'string', label:'车辆吨位',isShowGrid:true},
		{name:'SEAT' , type:'string', label:'座（卧）位',isShowGrid:true},
		{name:'USE_TYPE' , type:'string', label:'使用类别',isShowGrid:true},
		{name:'CERT_DATE' , type:'date', label:'发证日期',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'REG_DATE' , type:'date', label:'注册日期',dateFormat:'Y-m-d H:i:s',isShowGrid:true},		
		{name:'CHECK_DATE' , type:'date', label:'年检日期',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'CHECK_RESULT' , type:'string', label:'审验结果',isShowGrid:true},
		{name:'CORP_NAME' , type:'string', label:'所属企业',isShowGrid:true},
		{name:'FIRST_MILEAGE' , type:'int', label:'建档里程',isShowGrid:false},
		{name:'LAST_REPAIR_DATE' , type:'date', label:'上次维修时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'LAST_CHECK_DATE' , type:'date', label:'上次评定时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'PHOTO' , type:'string', label:'图片',isShowGrid:true},
		{name:'DELEGATE_NAME' , type:'string', label:'托修方',isShowGrid:true},
		{name:'WARN_TYPE' , type:'string', label:'预警状态',isShowGrid:true,query: 'eq'},
		{name:'UPDATE_DATE' , type:'string', label:'车辆更新日期',dateFormat:'Y-m-d',isShowGrid:false},
		{name:'OWNER_NAME' , type:'string', label:'车主姓名',isShowGrid:false},
		{name:'OWNER_PHONE' , type:'string', label:'车主电话',isShowGrid:false},
		{name:'IS_SINGLE' , type:'string', label:'是否个体户',isShowGrid:false}
	]
});