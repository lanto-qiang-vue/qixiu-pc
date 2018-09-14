Ext.define('app.view.manage.corp.TbCorpDetectInfoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.corp.TbCorpDetectInfoMngPanel',
	itemId: 'manage.corp.TbCorpDetectInfoMngPanel',
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
			model : 'app.model.corp.TbCorpDetectInfo',
			layout:'column',
			columns:3,
			labelWidth: 80,
			showType : 'search',
			items: [
					'STATION_NAME',
					'STATION_NAME_JC',
					'STATION_ADDRESS',
					{	
						xtype:'combo',
						name:'STATION_AREA',
						fieldLabel : '所属辖区',
		                editable:false,
		                store:Ext.getStore("sys_belong_area"),
		                displayField: 'NAME',  
		                valueField: 'CODE',
		                queryMode: 'local'
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
							margin:5
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'reset_button',
							margin: 5,
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
			model : 'app.model.corp.TbCorpDetectInfo',
			url : 'manage/corp/tbcorpdetectinfo/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'STATION_NAME',flex:2},
				{fname:'STATION_NAME_JC',flex:1},
				{fname:'STATION_TEL',flex:1},
				{fname:'STATION_FAL',flex:1},
				{fname:'STATION_ADDRESS',flex:2},
				{fname:'STATION_AREA',renderer: app.utils.FunUtils.findAreaByCode}

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
				iconCls:'export_button',
				text : 'Excel导出',
				itemId : 'exportBtn'
			}]
		};
	}
});
