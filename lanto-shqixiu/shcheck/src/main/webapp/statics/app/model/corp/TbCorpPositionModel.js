Ext.define('app.model.corp.TbCorpPositionModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CORP_ID' , type:'string', label:'企业ID'},
		{name:'LONGITUDE' , type:'string', label:'经度'},
		{name:'LATITUDE' , type:'string', label:'纬度'},
		{name:'CORP_ADDR' , type:'string', label:'地址'},
		{name:'CORP_TEL' , type:'string', label:'电话'},
		{name:'SELF_INTRODUCTION' , type:'string', label:'业务介绍'},
		{name:'CORP_STAR_LEVEL' , type:'float', label:'企业星级评定'},
		{name:'CORP_NAME' , type:'string', label:'企业名称',req:true},
		{name:'CORP_TYPE' , type:'string', label:'类型',val:'dict|dict.'+app.utils.SysCodes.DB_JYFW},
		{name:'CORP_AREA' , type:'string', label:'所属辖区'}
	]
});