Ext.define('app.model.transrepair.RepairItemsListModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'LIST_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'ITEM_ID' , type:'int', label:'ITEM_ID',isShowGrid:false},
		{name:'RECORD_ID' , type:'int', label:'RECORD_ID',isShowGrid:false,query:'eq'},
		{name:'ITEM_NAME' , type:'string', label:'项目名称',isShowGrid:true,query:'lk',req:true},
		{name:'REPAIR_HOURS' , type:'int', label:'维修工时',isShowGrid:true},
		{name:'REPAIR_PERSON' , type:'string', label:'维修工',isShowGrid:true}
	]
});