Ext.define('app.view.manage.corp.CorpJoinMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.corp.CorpJoinMngPanel',
	itemId: 'manage.corp.CorpJoinMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'border',
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getSearchPanel(),me.getBottomPanel()]
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
			model : 'app.model.corp.CorpJoinModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'CORP_NAME',
					'MAGOR_BRANDS',
					{	
						xtype:'combo',
						name:'CORP_AREA_lk',
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
							pack : 'start'
						},
						items:[{
							xtype: 'button',
							iconCls: 'search_button',
							text : '查询',
							margin: '0 10 0 0',
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
	getBottomPanel:function(){
		var me = this;
		return {
			xtype:'container',
			region : 'center',
			layout:'border',
			items:[me.getGridPanel(),me.getMapPanel()]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			rowSelType : 'MULTI',
			header:{
				hidden:true
			},
			title:'入网企业列表',
			width:600,
			split : true,
			collapsible:true,
			region : 'west',
			model : 'app.model.corp.CorpJoinModel',
			url : 'manage/corp/corpjoin/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ID',flex:1,hidden:true},
				{fname:'CORP_NAME',flex:1},
				{fname:'MAGOR_BRANDS',flex:1},
				{fname:'CORP_AREA',flex:1},
				{fname:'LINK_MAN',flex:1},
				{fname:'LINK_TEL',flex:1},
				{fname:'STATUS',flex:1}
			],
			btns : [{
				xtype : 'button',
				text : '入网审核',
				itemId : 'checkBtn',
				iconCls:'icon-check blue'
			},'-',{
				xtype : 'button',
				text : '查看资料',
				itemId : 'viewBtn',
				iconCls:'read_button'
			},'-',{
				xtype : 'button',
				text : '修改资料',
				itemId : 'editBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				iconCls:'icon-ban-circle red',
				text : '退网',
				itemId : 'backBtn'
			}]
		};
	},
	getMapPanel:function(){
		return {
			xtype:'panel',
			region : 'center',
			itemId:'map_position',
			flex:1,
			html:'<iframe height="100%" width="100%" src="manage/corp/corpjoin/position?isview=yes" scrolling="yes" frameborder="0" id="corpjoinbmapFrame" name="bmapFrame"></iframe>'
		};
	}
});
