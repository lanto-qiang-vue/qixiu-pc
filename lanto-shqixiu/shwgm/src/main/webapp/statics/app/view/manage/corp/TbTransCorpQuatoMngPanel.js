Ext.define('app.view.manage.corp.TbTransCorpQuatoMngPanel',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TbTransCorpQuatoMngPanel',
	itemId: 'manage.corp.TbTransCorpQuatoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	title:'维修企业配额管理',
	width : 850,
	border:false,
	height:450,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSearchPanel(),me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var params=me.down('form').getValues();
		var st=me.down('#gpanel').getStore();
		st.proxy.extraParams={CORP_ID_eq:params.CORP_ID};
		st.loadPage(1);
	},
	loadQuato : function(){
		var me = this;
		var params=me.down('form').getValues();
		var url = 'manage/corp/transcorpquato/getquato';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{CORP_ID:params.CORP_ID},function(ret){
			if( ret.success ){
				me.down('form').getForm().findField('CREATE_QUATO_COUNT').setValue(ret.data.createQuatoNum);
			}
		});
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.corp.TbCorpQuatoModel',
			url : 'manage/corp/transcorpquato/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ID',hidden:true},
				{fname:'CORP_ID',hidden:true},
				{fname:'TYPE',flex:1},
				{fname:'CREATE_USER',flex:1},
				{fname:'CREATE_TIME',flex:1.2},
				{fname:'CREATE_QUATO',flex:1},
				{fname:'REMARK',flex:1}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'add_button blue'
			}]
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
	            {fname:'CREATE_QUATO_COUNT',readOnly:true}
	        ]
		}]};
	}
});
