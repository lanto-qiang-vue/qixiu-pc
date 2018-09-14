Ext.define('app.view.sys.TbSysRoleMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.sys.TbSysRoleMngPanel',
	itemId: 'sys.TbSysRoleMngPanel',
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
			model : 'app.model.sys.TbSysRoleModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'ROLE_NAME',
					'ROLE_STATUS',
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'center'
						},
						items:[{
							xtype: 'button',
							iconCls: 'icon-search bigger-120 blue',
							text : '查询',
							itemId: 'searchBtn',
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 blue',
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
			model : 'app.model.sys.TbSysRoleModel',
			url : 'check/sys/tbsysrole/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ROLE_NAME',flex:5},
				{fname:'ROLE_STATUS',flex:2},
				{fname:'ROLE_ID',flex:2,text:'类型',
					renderer:function(v,r,c){
						if(v == 1 || c.data.CORP_ID == 'all_corp'){
							return '系统角色';
						}else{
							return '企业自定义角色';
						}
					}
				}
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
