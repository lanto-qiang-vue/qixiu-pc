Ext.define('app.model.repair.VehiclePartChangeModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'PART_ID', type:'int', label:'ACCIDENT_ID'},	
		{name:'ADD_TIME' , type:'date', label:'更换日期',dateFormat:'Y-m-d H:i:s'},
		{name:'PART_NAME' , type:'string', label:'更换主要部件名称、型号（规格）及厂名'},
		{name:'CORP_NAME' , type:'string', label:'维修单位'},
		{name:'CREATED' , type:'string', label:'登记人'}
	

	]
});