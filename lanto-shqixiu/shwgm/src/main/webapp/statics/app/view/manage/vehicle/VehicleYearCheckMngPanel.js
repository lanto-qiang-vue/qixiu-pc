Ext.define('app.view.manage.vehicle.VehicleYearCheckMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.vehicle.VehicleYearCheckMngPanel',
	itemId: 'manage.vehicle.VehicleYearCheckMngPanel',
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
			model : 'app.model.vehicle.VehicleYearCheck',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'CHECK_YEAR',
					'PLATE_NUM',
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'center'
						},
						items:[{
							xtype: 'button',
							iconCls: 'icon-search bigger-120 white',
							text : '查询',
							itemId: 'searchBtn',
							margin: '0 5 0 5'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
							margin: '0 5 0 5',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						}]
					}
				]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.vehicle.VehicleYearCheck',
			url : 'manage/vehicle/vehicleyearcheck/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'PLATE_NUM',flex:1},
				{fname:'CORP_NAME',flex:1},
				{fname:'CHECK_YEAR',flex:1},
				{fname:'CHECK_TIME',flex:1},
				{fname:'CHECK_RESULT',flex:1},
				{fname:'CHECK_PERSON',flex:1},
				{fname:'CHECK_REMARK',flex:1}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
