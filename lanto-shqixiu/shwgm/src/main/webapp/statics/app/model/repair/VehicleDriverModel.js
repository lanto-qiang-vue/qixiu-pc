Ext.define('app.model.repair.VehicleDriverModel',{
	extend:'jsf.data.VO',
	fields:[
	    //Tv_Vehicle_Driver
		{name:'DRIVER_ID', type:'int', label:'DRIVER_ID'},	
		{name:'VEHICLE_ID' , type:'int', label:'VEHICLE_ID',isShowGrid:false},
		{name:'DRIVER_NAME' , type:'string', label:'驾驶员姓名'},
		{name:'ID_NUM' , type:'string', label:'身份证号'},
		{name:'LICENCE_TYPE' , type:'string', label:'驾驶证类型'},
		{name:'LICENCE_NUM' , type:'string', label:'驾驶证号'},
		
		{name:'CERTIFICATE_NUM' , type:'string', label:'从业资格证号'},
	    {name:'CERTIFICATE_TYPE' , type:'string', label:'从业证类别'},
	    {name:'ENTRY_TIME' , type:'date', label:'入职时间',dateFormat:'Y-m-d H:i:s'},
	    {name:'DIMISSION_TIME' , type:'date', label:'离职时间',dateFormat:'Y-m-d H:i:s'},
		{name:'SAFE_MILEAGE' , type:'double', label:'安全形式里程'},
		
	    {name:'ILLEGAL_RECORD' , type:'string', label:'违章记录'},
	    {name:'ACCIDENT_RECORD' , type:'string', label:'事故记录'},
	    {name:'OTHER_COMPLAINTS' , type:'string', label:'其他投诉'}
	]
});