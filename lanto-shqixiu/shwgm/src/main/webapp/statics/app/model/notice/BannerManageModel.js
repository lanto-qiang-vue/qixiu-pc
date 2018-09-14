Ext.define('app.model.notice.BannerManageModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'BANNER_ID' , type:'int', label:'ID',isShowGrid:false},	
		{name:'TITLE' , type:'string', label:'标题',query: 'lk',isShowGrid:true,req:true},
		{name:'LINK_URL' , type:'string', label:'跳转的链接',query: 'lk',isShowGrid:true},
		{name:'LINK_IMAGE' , type:'string', label:'图片',query: 'lk',isShowGrid:true,req:true},
		{name:'LINK_TYPE' , type:'string', label:'跳转类型',query: 'lk',isShowGrid:true,req:true},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1001'},
		{name:'SORT_NUMBER' , type:'int', label:'排序'},
		{name:'CREATE_TIME' , type:'date', label:'添加时间',dateFormat:'Y-m-d H:i:s',query: 'rg',isShowGrid:true}
		]
});
