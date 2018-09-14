Ext.define('app.view.manage.corp.TbCorpVideoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.corp.TbCorpVideoMngPanel',
	itemId: 'manage.corp.TbCorpVideoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','js.HKVideo.ezuikit'],
	autoShow : true,
	closable : true,
	layout : 'border',
	change:0,
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getChannelPanel(),me.getCorpGrid(),me.getVedioPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getChannelPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId : 'chsgpanel',
			title:'通道列表',
			region : 'center',
			layout:'border',
			split : true,
			items:[{
					xtype : 'form',
					itemId : 'spanel',
					region : 'north',
					bodyPadding: 5,
					items :[{
						xtype:'jsf.ModelContainer',
						model : 'app.model.corp.TbCorpVideoModel',
						layout: {
		            		type: 'table',
		            		columns: 3
		        		},
						labelWidth: 30,
						showType : 'search',
						items: [
								{fname:'STATUS',width:110},
					            {
									xtype: 'container',
									width:190,
									layout:{
										type: 'hbox',
										pack : 'start'
									},
									items:[{
										xtype: 'button',
										iconCls: 'icon-search bigger-120 white',
										text : '查询',
										itemId: 'chSearchBtn',
										margin:5
									},{
										xtype : 'button',
										text : '重置',
										itemId: 'resetBtn',
										iconCls: 'reset_button',
										margin:5,
										handler:function(btn){
											btn.up('form').getForm().reset();
										}
									}]
								}
							]
						}]
					},{
						xtype : 'jsf.ModelGrid',
						itemId : 'chgpanel',
						region : 'center',
						rowSelType : 'MULTI',
						model : 'app.model.corp.TbCorpVideoModel',
						url : 'manage/corp/corpvideo/list',
						columns : [
							{fname:'ID',hidden:true},
							{fname:'VIDEO_NUM',flex:1},
							{fname:'VIDEO_NAME',flex:2},
							{fname:'STATUS',flex:2},
							{fname:'CORP_NAME',flex:3}
						],
						btns : [{
							xtype : 'button',
							text : '新增',
							itemId : 'addBtn',
							iconCls:'font-bold icon-edit blue'
						},'-',{
							xtype : 'button',
							text : '修改',
							itemId : 'editBtn',
							iconCls:'font-bold icon-edit blue'
						},'-',{
							xtype : 'button',
							iconCls:'icon-remove-sign red font-bold',
							text : '删除',
							itemId : 'deleteBtn'
						},'-',{
							xtype : 'button',
							iconCls:'icon-search blue font-bold',
							text : '查看视频',
							itemId : 'viewVideoBtn'
						}]
					}]
		};
	},
	getVedioPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId:'videoPanel',
			title:'视频查看',
			region : 'east',
			split : true,
			collapsible:true,
			overflowY :'auto',
			width:560,
			html:'',
			tbar:[{
					xtype: 'container',
					width:190,
					layout:{
						type: 'hbox',
						pack : 'start'
					},
					items:[{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '高清',
						itemId: 'hdBtn',
						margin:5
					},{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '流畅',
						itemId: 'fastBtn',
						margin:5
					}]
				}]
		};
	},
	loadData : function(){
		var player = new EZUIPlayer('myPlayer');
	},
	getCorpGrid : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId : 'corppanel',
			title:'企业列表',
			region : 'west',
			width:260,
			layout:'border',
			collapsible:true,
			split : true,
			items:[{
					xtype : 'form',
					itemId : 'corpspanel',
					region : 'north',
					bodyPadding: 5,
					items :[{
						xtype:'jsf.ModelContainer',
						model : 'app.model.corp.TbCorpInfoModel',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
						labelWidth: 30,
						showType : 'search',
						items: [
								{fname:'CORP_NAME',colspan:2,width:230,fieldLabel : '名称'},
								{	
									xtype:'combo',
									name:'CORP_AREA_eq',
									fieldLabel : '辖区',
									width:160,
					                editable:false,
					                store:Ext.getStore("sys_belong_area"),
					                displayField: 'NAME',  
					                valueField: 'CODE',
					                queryMode: 'local'
					            },
					            {
									xtype: 'container',
									width:190,
									layout:{
										type: 'hbox',
										pack : 'start'
									},
									items:[{
										xtype: 'button',
										iconCls: 'icon-search bigger-120 white',
										text : '查询',
										itemId: 'searchBtn',
										margin:5
									}]
								}
							]
						}]
					},{
						xtype : 'jsf.ModelGrid',
						itemId : 'corpgpanel',
						region : 'center',
						rowSelType : false,
						model : 'app.model.corp.TbCorpInfoModel',
						url : 'manage/corp/corpinfo/list',
						columns : [
							{text:'序号',xtype:'rownumberer'},
							{fname:'CORP_AREA',renderer: app.utils.FunUtils.findAreaByCode,width:75},
							{fname:'CORP_NAME',width:180}
						],
						btns : []
					}]
		};
	}
});
