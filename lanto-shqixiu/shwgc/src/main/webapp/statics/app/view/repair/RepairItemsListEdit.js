Ext.define('app.view.repair.RepairItemsListEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.repair.RepairItemsListEdit',
	itemId: 'repair.RepairItemsListEdit',
	title: '维修项目编辑',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 530,
	border:false,
	height:200,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 15,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.repair.RepairItemsListModel',
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 70,
				btns:[],
				items: [
					{fname:'LIST_ID',hidden:true},
					{fname:'RECORD_ID',hidden:true},
					{fname:'ITEM_ID',hidden:true},
					{fname:'ITEM_NAME'},
					{fname:'REPAIR_HOURS'},
					{fname:'REPAIR_PERSON'}
				]
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
						iconCls : 'icon-save blue',
						text : '保 存'
					},'-', {
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
	}
});
