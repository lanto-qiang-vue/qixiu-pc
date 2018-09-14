Ext.define('app.view.manage.sys.RepairStandardEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.sys.RepairStandardEdit',
	itemId: 'manage.sys.RepairStandardEdit',
	cls:'noIconTree',
	title: '权限编辑',
	requires:[],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 300,
	height:200,
//	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout:{
				type:''
			},
			bodyPadding : 5,
			items:[{
				xtype:'container'
				
			}]
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
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存'
					}, {
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
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		
	}
});
