Ext.define('app.view.manage.vehicle.VehicleBaseMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.vehicle.VehicleBaseMngPanel',
	itemId: 'manage.vehicle.VehicleBaseMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','app.ux.CascadeCombo'],
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
			model : 'app.model.trans.VehicleBaseModel',
			layout:'column',
			columns:4,
			labelWidth: 70,
			showType : 'search',
			items: [
					'RECORD_NO',
					'PLATE_NUM',
					'PLATE_COLOR',
					'VEHICLE_TYPE',
					{
						xtype:'jsf.ComboDict',
						name:'WARN_TYPE_eq',
						itemId:'warnType',
						blankItem : true,
						fieldLabel:'预警状态',
						meta:{
							val:'dict|dict.1017'
						}
					},
					'STATUS',
					'IS_SINGLE',
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
			model : 'app.model.trans.VehicleBaseModel',
			url : 'manage/vehicle/vehiclebase/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'RECORD_NO',flex:2},
				{fname:'PLATE_NUM',flex:2},
				{fname:'PLATE_COLOR',flex:2},
				{fname:'CORP_NAME',flex:2},
				{fname:'VEHICLE_TYPE',flex:2},
				{fname:'UNIT_NAME',flex:2},
				{fname:'WARN_TYPE',tdCls:'verticalAlign',width:130,renderer:function(v,d,r){
					var text = funutils.renderer(v);
					if(v == '10171001'){
						return '<div style="text-align:center;background:#ff5722;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else if(v == '10171002'){
						return '<div style="text-align:center;background:#ff9800;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else if(v == '10171003'){
						return '<div style="text-align:center;background:#607d8b;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else if(v == '10171004'){
						return '<div style="text-align:center;background:#795548;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else{
						return '<div style="text-align:center;background:#4caf50;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}
				}},
				{fname:'CERT_DATE',flex:2},
				{fname:'LAST_REPAIR_DATE'},
				{fname:'LAST_CHECK_DATE',flex:2},
				{fname:'STATUS',flex:2}
			],
			btns : [{
				xtype : 'button',
				text : '添加车辆',
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
				text : '查看档案',
				itemId : 'viewBtn',
				iconCls:'cd_button'
			},'-',{
				xtype : 'button',
				text : '打印档案',
				itemId : 'printBtn',
				iconCls:'print_button'
			},'-',{
				xtype : 'button',
				iconCls:'export_button',
				text : 'Excel导出',
				itemId : 'exportBtn'
			}]
		};
	}
});
