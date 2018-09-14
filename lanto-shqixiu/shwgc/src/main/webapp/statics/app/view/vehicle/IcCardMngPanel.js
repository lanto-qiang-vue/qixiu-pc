Ext.define('app.view.vehicle.IcCardMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.vehicle.IcCardMngPanelMngPanel',
	itemId: 'vehicle.IcCardMngPanel',
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
			model : 'app.model.vehicle.IcCard',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'PLATE_NUM',
					'RECORD_NO',
					'PRINT_NO',
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'start'
						},
						items:[{
							xtype: 'button',
							iconCls: 'search_button',
							text : '查询',
							itemId: 'searchBtn'
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
			model : 'app.model.vehicle.IcCard',
			url : 'client/vehicle/iccard/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'RECORD_NO',flex:1},
				{fname:'PLATE_NUM',flex:1},
				{fname:'PLATE_COLOR',flex:1},
				{fname:'VEHICLE_TYPE',flex:1},
				{fname:'CHASSIS_NUM',flex:1},
				{fname:'MAC_ID',flex:1},
				{fname:'PRINT_NO',flex:1},
				{fname:'CREATE_DATE',flex:1},
				{fname:'UPDATE_DATE_',flex:1},
				{fname:'CARD_STATUS',flex:1}

			],
			btns : [{
				xtype : 'button',
				text : '车辆发卡',
				itemId : 'addBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '车辆补卡',
				itemId : 'editBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				iconCls:'read_button',
				text : '读取IC卡',
				itemId : 'readBtn'
			}]
		};
	},
	listeners:{
		afterrender:function(me){
			if(iccardutil.isInitCom){
	    		return true;
	    	}
			me.setLoading('正在初始化IC卡读卡器...');
			try{
				setTimeout(function(){
					me.setLoading(false);
					try{
						InitCardOcx();
						var r = iccardutil.initComByCookie(1);
						if(r != 1){
							Ext.Msg.alert('系统提示','IC卡读卡器串口打开失败,请检查USB接口是否插入!');
						}
					}catch(er){
						Ext.Msg.alert('系统提示','IC卡读卡器初始化失败,请检查是否安装插件或浏览器版本是否支持!');
					}
				},50);
			}catch(err){
				me.setLoading(false);
				Ext.Msg.alert('系统提示','IC卡读卡器初始化失败!');
			}
		},
		destroy:function(){
			//console.log('destroy');
		}
	}
	
	
});
