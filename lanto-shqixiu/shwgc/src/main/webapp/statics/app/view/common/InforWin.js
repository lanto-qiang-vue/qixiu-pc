Ext.define('app.view.common.InforWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.InforWin',
    itemId : 'common.InforWin',
    title:'显示信息',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 500,
	height:300,
	//autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			  xtype:'panel',
			  width:900,
			  autoScroll:true,
			  itemId:'contentPanel'
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->','-', {
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
	},
	//加载数据
	loadData : function(value){
		var me = this;
		html = "<div style='width:98%;padding-left:15px;'>" + value + "</div>";
		me.down('panel').update(html);
	}

});
