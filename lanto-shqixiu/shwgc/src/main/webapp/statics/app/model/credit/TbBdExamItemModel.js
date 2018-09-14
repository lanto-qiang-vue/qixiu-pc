Ext.define('app.model.credit.TbBdExamItemModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'ID' , type:'int', label:'ID'},
		{name:'ITEM_ID' , type:'int', label:'ID'},
		{name:'FILE_ID' , type:'string', label:'FILE_ID'},
		{name:'TYPE_ID' , type:'int', label:'考核类型ID'},
		{name:'ITEM_SCORE' , type:'int', label:'分值'},
		{name:'ITEM_DETAIL' , type:'string', label:'项目明细'},
		{name:'TYPE_NAME' , type:'string', label:'大项名称'},
		{name:'ITEM_NAME' , type:'string', label:'小项名称'},
		{name:'TYPE_SCORE' , type:'int', label:'分值'},
		{name:'EXAM_TYPE' , type:'string', label:'考核类别 ',val:'dict|dict.1038'},
		{name:'VERSION_NO' , type:'int', label:'版本'},
		{name:'ORDER_ID' , type:'int', label:'排序'},
		{name:'SELF_SCORE' , type:'float', label:'自评分'}
	]
});