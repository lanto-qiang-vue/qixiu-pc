Ext.define('app.view.sys.TbBdCodeMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.sys.TbBdCodeMngPanel',
	itemId: 'sys.TbBdCodeMngPanel',
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
			model : 'app.model.sys.TbBdCodeModel',
			layout:'column',
			columns:3,
			labelWidth: 75,
			showType : 'search',
			items: [
					'CODE_ID',
					'CODE_DESC',
					{	
						xtype:'combo',
						name:'TYPE',
						fieldLabel : '类型编码',
		                editable:false,
		                store:Ext.getStore("sys_dict_type"),
		                displayField: 'NAME',  
		                valueField: 'CODE'
		            },
					'STATUS',
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
			features: [{ftype:'grouping'}],
            listeners:{
	            afterrender:function(cmp){
	                cmp.getStore().group('TYPE','DESC','TYPE_NAME','ASC');
	            }
	        },
			model : 'app.model.sys.TbBdCodeModel',
			url : 'manage/sys/tbbdcode/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'CODE_ID',
				'CODE_DESC',
				'TYPE',
				'TYPE_NAME',
				'NUM',
				'STATUS',
				'CREATE_BY',
				'CREATE_DATE',
				'UPDATE_BY',
				'UPDATE_DATE'
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
