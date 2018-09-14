Ext.define('app.view.notice.TbNoticeResultList',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.TbNoticeResultList',
	itemId: 'notice.TbNoticeResultList',
	title: '通知回执列表',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 650,
	height:400,
	maximizable : true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.notice.TbNoticeResultModel',
			url : 'manage/notice/tbnotice/resultList',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'RESULT_BY',
				'RESULT_DATE',
				{fname:'RESULT_CONTENT',width:250},
				'RESULT_TYPE'
			],
			btns : []
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
		me.on('restore',function(win){
	    	win.setWidth(650);
	    	win.setHeight(400);
	    	win.getEl().center();
	    });
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		var store = me.down('grid').getStore();
		store.proxy.extraParams = record.data;
		store.loadPage(1);
	}
});
