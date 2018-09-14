Ext.define('app.model.corp.TbCorpDetectInfo',{
	extend:'jsf.data.VO',
	fields:[
		{name:'STATION_ID' , type:'int', label:'STATION_ID',isShowGrid:false},
		{name:'STATION_NAME' , type:'string', label:'检测站名称',req:true,query: 'lk',isShowGrid:true},
		{name:'STATION_NAME_JC' , type:'string', label:'检测站简称',query: 'lk',isShowGrid:true},
		{name:'LONGITUDE' , type:'string', label:'LONGITUDE',query: 'lk',isShowGrid:true},
		{name:'LATITUDE' , type:'string', label:'LATITUDE',query: 'lk',isShowGrid:true},
		{name:'STATION_TEL' , type:'string', label:'联系方式',isShowGrid:true},
		{name:'STATION_FAL' , type:'string', label:'传真',isShowGrid:true},
		{name:'STATION_ADDRESS' , type:'string', label:'检测站地址',query: 'lk',isShowGrid:true},
		{name:'STATION_AREA' , type:'string', label:'所属辖区',query: 'eq',isShowGrid:true}

		]
});
