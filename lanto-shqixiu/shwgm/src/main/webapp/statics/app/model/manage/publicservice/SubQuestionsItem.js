Ext.define('app.model.manage.publicservice.SubQuestionsItem',{
	extend:'jsf.data.VO',
	fields:[
		{name:'SUBJECT_ID' , type:'int', label:'ID',isShowGrid:false,query:'eq'},
		{name:'ITEM_ID' , type:'int', label:'ID',isShowGrid:false,query:'eq'},
		{name:'ITEM_TAG' , type:'string', label:'选项标识',isShowGrid:true},
		{name:'ITEM_NAME' , type:'string', label:'选项名称',isShowGrid:true,req:true},
		{name:'ITEM_SCORE' , type:'int', label:'选项得分',isShowGrid:false},
		{name:'CREATOR' , type:'string', label:'创建人',isShowGrid:true},
		{name:'CREATE_TIME' , type:'date', label:'创建时间',dateFormat:'Y-m-d H:i:s',isShowGrid:true},
		{name:'STATUS' , type:'string', label:'状态',isShowGrid:true,val:'dict|dict.1031',query:'eq'},
		{name:'SORT_INDEX' , type:'int', label:'排序',isShowGrid:false}
		]
});
