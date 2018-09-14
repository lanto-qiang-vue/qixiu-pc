Ext.define('app.model.repair.PartsModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'PART_ID' , type:'int', label:'ID',isShowGrid:false},
		{name:'CORP_ID' , type:'int', label:'企业ID',isShowGrid:false,query:'eq'},
		{name:'PART_TYPE' , type:'string', label:'配件类型',val:'dict|dict.1041',isShowGrid:true,query:'eq'},
		{name:'PART_NAME' , type:'string', label:'配件名称',isShowGrid:true,query:'lk',req:true},
		{name:'PART_CODE' , type:'string', label:'配件代码',isShowGrid:true,query:'lk'},
		{name:'PART_BRAND' , type:'string', label:'配件品牌',isShowGrid:true},
		{name:'PART_PRICE' , type:'float', label:'配件价格',isShowGrid:true},
		{name:'IS_OWNER_PROVIDE' , type:'string', label:'自备配件',isShowGrid:true,val:'dict|dict.1004'}
	]
});