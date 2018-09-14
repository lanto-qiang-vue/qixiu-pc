Ext.define('app.view.exharepair.RepairRecordsMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.exharepair.RepairRecordsMngPanel',
	itemId: 'exharepair.RepairRecordsMngPanel',
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
			model : 'app.model.exharepair.RepairRecordModel',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PLATE_NUM',
					{
						xtype:'jsf.ComboDict',
						name:'STATUS_eq',
						blankItem : true,
						fieldLabel:'状态',
						meta:{
							val:'dict|dict.1016'
						}
					},
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
			model : 'app.model.exharepair.RepairRecordModel',
			url : 'exharepair/repairrecords/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'STATUS',tdCls:'verticalAlign',width:130,renderer:function(v,d,r){
					var text = funutils.renderer(v);
					if(v == '10161001'){
						return '<div style="text-align:center;background:#F4F5F6;color:#000000;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else if(v == '10161002'){
						return '<div style="text-align:center;background:#0CA512;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else if(v == '10161003'){
						return '<div style="text-align:center;background:#377CE7;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else if(v == '10161004'){
						return '<div style="text-align:center;background:#E79A37;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}else{
						return '<div style="text-align:center;background:#4caf50;color:#fff;padding:3px 0px 3px 0px;">' + text + '</div>';
					}
				}},
				{fname:'PLATE_NUM',flex:1},
				{fname:'REPAIR_DATE',flex:2,format:'Y-m-d H:i:s'},
				{fname:'REPAIR_MILE',flex:1},
				{fname:'START_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'END_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'STATION_NAME',flex:1},
				{fname:'FAULT_DESCRIPT',flex:3},
				{fname:'OWNER_PHONE',hidden:true}
				//{fname:'FAULT_REASON',flex:3}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				text : '修改/查看',
				itemId : 'editBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn'
			},'-',{
				xtype : 'button',
				iconCls:'font-bold icon-edit blue',
				text : '施工管理',
				itemId : 'workBtn'
			},'-',{
				xtype : 'button',
				iconCls:'font-bold icon-edit blue',
				text : '提交',
				itemId : 'submitBtn'
			},'-',{
                xtype : 'button',
                itemId : 'printBtn',
                iconCls: 'print_button',
                //disabled:true,
                text : '打印合格证'
		 	}]
		};
	}
});
