Ext.define('app.model.common.Station',{
	extend:'jsf.data.VO',
	fields:[
		{name:'STATION_ID' , type:'int', label:'检测站ID'},
		{name:'STATION_NAME' , type:'string', label:'检测站名称',req:true},
		{name:'STATION_NAME_JC' , type:'string', label:'检测站简称',req:true},
		{name:'STATION_TEL' , type:'string', label:'电话'},
		{name:'STATION_FAL' , type:'string', label:'传真'},
		{name:'STATION_ADDRESS' , type:'string', label:'检测站地址'},
		{name:'STATION_AREA' , type:'string', label:'所属辖区'}
		]
});