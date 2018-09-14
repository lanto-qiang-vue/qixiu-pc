Ext.define('app.view.repair.TcParameterMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.repair.TcParameterMngPanel',
	itemId: 'repair.TcParameterMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(), me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getSearchPanel : function(){
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '查询',
		split : true,
		collapsible:true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.repair.TcParameterModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'PARAMS_CODE',
					'PARAMS_NAME',
					{fname:'PARAMS_UNIT',blankItem:true},
					{fname:'IS_STOP',blankItem:true}
				]
			},{
				xtype: 'container',
				layout:{
					type: 'hbox',
					pack : 'end'
				},
				items:[{
					xtype: 'button',
					iconCls: 'icon-search bigger-120 blue',
					text : '查询',
					itemId: 'searchBtn',
					margin:5
				},{
					xtype : 'button',
					text : '重置',
					itemId: 'resetBtn',
					iconCls: 'icon-reply bigger-120 blue',
					margin: 5,
					handler:function(btn){
						btn.up('form').getForm().reset();
					}
				}]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.repair.TcParameterModel',
			url : 'client/repair/tcparameter/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'PARAMS_CODE',
				{fname:'PARAMS_NAME',width:350},
				'PARAMS_VALUE',
				'PARAMS_UNIT',
				'IS_STOP'
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn'
			},'-',{
				xtype : 'button',
				iconCls:'reset_button',
				text : '生成ACCEPT_TOKEN',
				itemId : 'createTokenBtn'
			}]
		};
	}
});
