Ext.define('app.view.sys.TbCorpQuatoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.sys.TbCorpQuatoMngPanel',
	itemId: 'sys.TbCorpQuatoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	title:'维修企业配额管理',
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSearchPanel(),me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		var url = 'sys/corpquato/getquato';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			console.log(ret);
			if( ret.success ){
				console.log(ret.data);
				me.down('form').loadRecord(record);
				var params=me.down('form').getValues();
			}
		});
		var st=me.down('#gpanel').getStore();
		st.proxy.extraParams={CORP_ID_eq:params.CORP_ID};
		st.loadPage(1);
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.corp.TbCorpQuatoModel',
			url : 'sys/corpquato/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ID',hidden:true},
				{fname:'CORP_ID',hidden:true},
				{fname:'TYPE',flex:1},
				{fname:'CREATE_USER',flex:1},
				{fname:'CREATE_TIME',flex:1.2},
				{fname:'CREATE_QUATO',flex:1},
				{fname:'UPLOAD_QUATO',flex:1},
				{fname:'SEARCH_QUATO',flex:1},
				{fname:'REMARK',flex:1}
			],
			btns : []
		};
	},
	getSearchPanel : function(){
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '配额汇总',
		split : true,
		collapsible:true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.corp.TbCorpInfoModel',
			layout:'column',
			columns:3,
			labelWidth: 90,
			showType : 'search',
			items: [
				{fname:'CORP_ID',hidden:true},
	            {fname:'CREATE_QUATO_COUNT',readOnly:true},
	            {fname:'UPLOAD_QUATO_COUNT',readOnly:true},
	            {fname:'SEARCH_QUATO_COUNT',readOnly:true}
	        ]
		}]};
	}
});
