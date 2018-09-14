Ext.define('app.view.manage.privehicle.PrivateVehicleMngPanel', {
    extend:'Ext.panel.Panel',
    alias:'widget.manage.privehicle.PrivateVehicleMngPanel',
    itemId : 'manage.privehicle.PrivateVehicleMngPanel',
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
			model : 'app.model.privehicle.PrivateVehicle',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PLATE_NUM',
					'OWNER_NAME',
					'OWNER_PHONE',
					'USER_NAME',
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
			model : 'app.model.privehicle.PrivateVehicle',
			url : 'manage/privehicle/privatevehicle/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname : 'VEHICLE_ID',hidden:true}, 
				{fname : 'PLATE_NUM',flex:1},
				{fname : 'VEHICLE_BRAND',flex:1},
				{fname : 'VEHICLE_TYPE',flex:1},
				{fname : 'VIN',flex:1},
				{fname : 'OWNER_NAME',flex:1},
				{fname : 'OWNER_PHONE',flex:1},
				{fname : 'USER_NAME',flex:1}
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
			},'-',{
				xtype : 'button',
				text : '健康档案',
				itemId : 'recordBtn',
				iconCls:'font-bold icon-edit blue'
			}]
		};
	}
});
