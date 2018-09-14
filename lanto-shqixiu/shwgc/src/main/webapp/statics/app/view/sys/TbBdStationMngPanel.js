Ext.define('app.view.sys.TbBdStationMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.view.sys.TbBdStationMngPanel',
	itemId: 'sys.TbBdStationMngPanel',
	title: '工位管理',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'border',
	width : 900,
	height:550,
	modal : true,
	
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
			model : 'app.model.sys.TbBdStationModel',
			layout:'column',
			columns:5,
			labelWidth: 80 ,
			showType : 'search',
			items: [
					'STATION_CODE',
					'STATION_NAME',
					'CHANNEL_CODE1',
					'CHANNEL_CODE2',
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
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
							margin:'0 0 0 10',
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
			model : 'app.model.sys.TbBdStationModel',
			url : 'client/sys/tbbdstation/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ID',flex:1,hidden:true},
				{fname:'STATION_CODE',flex:1},
				{fname:'STATION_NAME',flex:1},
				{fname:'CHANNEL_CODE1',flex:1},
				{fname:'CHANNEL_CODE2',flex:1},
				{fname:'REMARK',flex:1}
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
			}]
		};
	}
});
