Ext.define('app.view.repair.TcParameterEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.repair.TcParameterEdit',
	itemId: 'repair.TcParameterEdit',
	title: '参数编辑',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 800,
	height:500,
	autoScroll:true,
	modal : true,
	isEdit:'edit',

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.repair.TcParameterModel',
				layout:'column',
				labelWidth: 80,
				columns:3,
				btns:[],
				items: [
					{fname:'ID',hidden:true},
					{fname:'PARAMS_ID',hidden:true},
					'PARAMS_CODE',
					'PARAMS_NAME',
					'PARAMS_VALUE',
					'PARAMS_UNIT',
					'IS_STOP'
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
						iconCls : 'save_button',
						text : '保 存'
					},'-', {
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
		var me = this;
		var form = me.down('form');
		form.loadRecord(record);
		form.getForm().findField('PARAMS_CODE').setReadOnly(true);
		form.getForm().findField('PARAMS_NAME').setReadOnly(true);
		form.getForm().findField('PARAMS_UNIT').setReadOnly(true);
		form.getForm().findField('IS_STOP').setReadOnly(true);
	}
});
