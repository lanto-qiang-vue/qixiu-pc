Ext.define('app.view.manage.sys.TgSysUserMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.sys.TgSysUserMngPanel',
	itemId: 'manage.sys.TgSysUserMngPanel',
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
			model : 'app.model.sys.TgSysUserModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'USER_NAME',
					'STATUS',
					'TELPHONE',
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
			model : 'app.model.sys.TgSysUserModel',
			url : 'manage/sys/tgsysuser/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				//{fname:'USER_CODE',flex:1},
				{fname:'USER_NAME',flex:1},
				{fname:'USER_SEX',flex:1},
				{fname:'TELPHONE',flex:1},
				{fname:'EMAIL',flex:1},
				{fname:'CREATE_TIME',flex:1},
				{fname:'STATUS',flex:1}
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
				iconCls:'icon-reply bigger-120 blue',
				text : '重置密码',
				itemId : 'resetPassBtn'
			},'-',{
				xtype : 'button',
				iconCls:'edit_button',
				text : '设置状态',
				itemId : 'setStatusBtn'
			},'-',{
				xtype : 'button',
				iconCls:'edit_button',
				text : '已绑定车辆',
				itemId : 'vehicleListBtn'
			}]
		};
	}
});
