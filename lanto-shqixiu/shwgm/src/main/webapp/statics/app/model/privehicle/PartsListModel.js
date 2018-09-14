Ext.define('app.model.privehicle.PartsListModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'LIST_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'RECORD_ID' , type:'int', label:'维修记录ID',isShowGrid:false,query:'eq'},
		{name:'PART_TYPE' , type:'string', label:'配件类型',val:'dict|dict.1041',isShowGrid:true,query:'eq'},
		{name:'PART_NAME' , type:'string', label:'配件名称',isShowGrid:true,query:'lk',req:true},
		{name:'PART_CODE' , type:'string', label:'配件代码',isShowGrid:true,query:'lk'},
		{name:'PART_BRAND' , type:'string', label:'配件品牌',isShowGrid:true},
		{name:'PART_PRICE' , type:'float', label:'配件价格',isShowGrid:true},
		{name:'IS_OWNER_PROVIDE' , type:'string', label:'自备配件',isShowGrid:true,val:'dict|dict.1004'},
		{name:'PART_PHOTO' , type:'string', label:'配件照片',isShowGrid:true},
		{name:'PART_NUMBER' , type:'int', label:'配件数量',isShowGrid:true}
	]
});