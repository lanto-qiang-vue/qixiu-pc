Ext.define('app.view.sys.TbDailyCheckUnitMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.sys.TbDailyCheckUnitMngPanel',
	itemId: 'sys.TbDailyCheckUnitMngPanel',
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
			model : 'app.model.sys.TbDailyCheckUnit',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'CHECK_UNIT',
					{	
						xtype:'combo',
						name:'AREA_CODE',
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
							iconCls: 'icon-search bigger-120 white',
							text : '查询',
							itemId: 'searchBtn',
							margin:5
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
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
			model : 'app.model.sys.TbDailyCheckUnit',
			url : 'manage/sys/tbdailycheckunit/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'CHECK_UNIT',width:250},
				{fname:'AREA_CODE',renderer: app.utils.FunUtils.findAreaByCode,width:150},
				{fname:'ADD_TIME',format:'Y-m-d H:i:s',width:150}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'icon-plus-sign-alt blue'
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'icon-edit blue'
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
