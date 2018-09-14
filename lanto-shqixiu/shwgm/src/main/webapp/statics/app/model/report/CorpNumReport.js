Ext.define('app.model.report.CorpNumReport',{
	extend:'jsf.data.VO',
	fields:[
		//{name:'ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'AREA_CODE' , type:'string', label:'辖区编号',isShowGrid:false},
		{name:'AREA_NAME' , type:'string', label:'辖区名称',isShowGrid:true,query:'lk'},
		{name:'REPAIR_CORP_NUM' , type:'int', label:'维修企业数量',isShowGrid:true},
		{name:'TRANS_CORP_NUM' , type:'int', label:'运输企业数量',isShowGrid:true},
		{name:'DETECT_CORP_NUM' , type:'int', label:'检测站数量',isShowGrid:true}
	]
});
