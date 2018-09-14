Ext.define('app.model.repair.VehicleRegModel',{
	extend:'jsf.data.VO',
	fields:[
	    //Tv_Vehicle_Reg
		{name:'REG_ID', type:'int', label:'REG_ID'},	
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:false},
		{name:'WX_RQ' , type:'date', label:'维修日期',dateFormat:'Y-m-d H:i:s'},
		{name:'WX_LB' , type:'string', label:'维修类别'},
		{name:'WX_NR' , type:'string', label:'维修内容'},
		{name:'WX_DW' , type:'string', label:'维修单位'},
		{name:'WX_DJR' , type:'string', label:'登记人'},	
		//Tv_Vehicle_Change
		{name:'CHANGE_ID', type:'int', label:'CHANGE_ID'},		
		{name:'CHANGE_DATE' , type:'date', label:'变更日期',dateFormat:'Y-m-d H:i:s'},
		{name:'CHANGE_REASON' , type:'string', label:'变更原因'},
	    {name:'CHANGE_ITEM' , type:'string', label:'变更事项'},
		{name:'CHANGE_REGISTRANT' , type:'string', label:'登记人'},
		
		//tv_vehicle_uses
		{name:'USES_ID', type:'int', label:'USES_ID'},		
		{name:'USES_TIME' , type:'date', label:'时间',dateFormat:'Y-m-d H:i:s'},
		{name:'MILEAGE' , type:'float', label:'行驶里程(KM)'},
	    {name:'INTERVAL_MILEAGE' , type:'float', label:'间隔里程(KM)'},
		{name:'FUEL_CONSUMPTION' , type:'float', label:'燃油消耗(升)'},		
		{name:'QUOTA' , type:'float', label:'定额'},
		{name:'SURPLUS' , type:'float', label:'余'},
		{name:'DEFICIT' , type:'float', label:'亏'},	
		{name:'USE_UNIT' , type:'string', label:'使用单位'},	
		{name:'DRIVER_NAME' , type:'string', label:'司机姓名'}			
	]
});
