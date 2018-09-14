Ext.define('app.model.repair.RepairItemsModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ITEM_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'CORP_ID' , type:'int', label:'企业ID',isShowGrid:false,query:'eq'},
		{name:'ITEM_NAME' , type:'string', label:'项目名称',isShowGrid:true,query:'lk',req:true},
		{name:'REPAIR_HOURS' , type:'int', label:'维修工时',isShowGrid:true}
	]
});