Ext.define('app.view.sys.TqVehicleCardMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.view.sys.TqVehicleCardMngPanel',
	itemId: 'sys.TqVehicleCardMngPanel',
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
			model : 'app.model.sys.VehicleBaseModel',
			layout:'column',
			columns:4,
			labelWidth: 70,
			showType : 'search',
			items: [
					'RECORD_NO',
					'PLATE_NUM',
					'PLATE_COLOR',
					'VEHICLE_TYPE',
					'STATUS',
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'end'
						},
						items:[{
							xtype: 'button',
							iconCls: 'search_button',
							text : '查询',
							itemId: 'searchBtn',
							margin:'0 5 0 0'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'reset_button',
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
			model : 'app.model.sys.VehicleBaseModel',
			url : 'client/sys/vehiclecard/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'RECORD_NO',flex:2},
				{fname:'PLATE_NUM',flex:2},
				{fname:'PLATE_COLOR',flex:2},
				{fname:'VEHICLE_TYPE',flex:2},
				{fname:'UNIT_NAME',flex:2},
				{fname:'CERT_DATE',flex:2},
				{fname:'LAST_REPAIR_DATE'},
				{fname:'LAST_CHECK_DATE',flex:2},
				{fname:'STATUS',flex:2}
			],
			btns : [{
				xtype : 'button',
				text : '发卡',
				itemId : 'addBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				iconCls:'export_button',
				text : 'Excel导出',
				itemId : 'exportBtn'
			}]
		};
	}
});
