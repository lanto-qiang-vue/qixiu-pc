Ext.define('app.view.manage.vehicle.VehicleWarnMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.vehicle.VehicleWarnMngPanel',
	itemId: 'manage.vehicle.VehicleWarnMngPanel',
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
			model : 'app.model.trans.VehicleWarnModel',
			layout:'column',
			columns:4,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PLATE_NUM',
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
		var me=this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.trans.VehicleWarnModel',
			url : 'manage/vehicle/vehiclewarn/list',
			columns : [
				{text:'序号',xtype:'rownumberer',tdCls:'verticalAlign'},
				{fname:'CORP_NAME',flex:3,tdCls:'verticalAlign'},
				{fname:'RECORD_NO',flex:3,tdCls:'verticalAlign'},
				{fname:'PLATE_NUM',flex:3,tdCls:'verticalAlign'},
				{fname:'PLATE_COLOR',flex:3,tdCls:'verticalAlign'},
				{fname:'VEHICLE_TYPE',flex:3,tdCls:'verticalAlign'},
				{fname:'REPAIR_CYCLE',width:80,tdCls:'verticalAlign'},
				{fname:'WARN_TYPE',tdCls:'verticalAlign',width:130,renderer:function(v,d,r){
					var text = funutils.renderer(v);
					if(v == '10171001'){
						return '<div style="text-align:center;background:#ff5722;color:#fff;padding:3px 5px 3px 5px;">' + text + '</div>';
					}else if(v == '10171002'){
						return '<div style="text-align:center;background:#ff9800;color:#fff;padding:3px 5px 3px 5px;">' + text + '</div>';
					}else if(v == '10171003'){
						return '<div style="text-align:center;background:#607d8b;color:#fff;padding:3px 5px 3px 5px;">' + text + '</div>';
					}else{
						return '<div style="text-align:center;background:#795548;color:#fff;padding:3px 5px 3px 5px;">' + text + '</div>';
					}
				}},
				{fname:'LAST_REPAIR_DATE',tdCls:'verticalAlign'},
				{fname:'VENDER_',flex:3,tdCls:'verticalAlign'},
				{fname:'BRAND_',flex:3,tdCls:'verticalAlign'},
				{fname:'XM_',flex:3,tdCls:'verticalAlign'}
				
			],
			btns : []
		};
	},
	loadData : function(plateNum){
		var me=this;
		var grid=me.down('grid');
		var st = grid.getStore();
		if(plateNum){
			me.down('form').getForm().setValues({PLATE_NUM_lk:plateNum});
		}else{
			me.down('form').getForm().setValues({PLATE_NUM_lk:''});
		}
		st.loadPage(1);//预加载
	}
});
