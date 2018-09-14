Ext.define('app.model.repair.VehicleUsesModel',{
	extend:'jsf.data.VO',
	fields:[		
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
