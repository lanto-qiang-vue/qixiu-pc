Ext.define('app.model.sys.TbBdStationModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'STATION_ID' , type:'int', label:'工位ID'},
		{name:'STATION_CODE' , type:'string', label:'工位代码',query:'lk',req:true},
		{name:'STATION_NAME' , type:'string', label:'工位名称',query:'lk',req:true},
		{name:'CHANNEL_CODE1' , type:'string', label:'通道1',query:'eq'},
		{name:'CHANNEL_CODE2' , type:'string', label:'通道2',query:'eq'},
		{name:'REMARK' , type:'string', label:'备注'}
	]
});