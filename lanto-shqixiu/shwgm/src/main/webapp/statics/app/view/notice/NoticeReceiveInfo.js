Ext.define('app.view.notice.NoticeReceiveInfo',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.NoticeReceiveInfo',
	itemId: 'notice.NoticeReceiveInfo',
	title: '通知查看情况',
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
			model : 'app.model.notice.NoticeReceiveInfoModel',
			url : 'manage/notice/tbnotice/receiveInfo',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'CORP_NAME',flex:2},
				{fname:'SEE_DATE',flex:1,format:'Y-m-d H:i:s'}
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
