Ext.define('app.view.manage.corp.TbCorpInfoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.corp.TbCorpInfoMngPanel',
	itemId: 'manage.corp.TbCorpInfoMngPanel',
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
		//me.down('form').getForm().findField('STATUS').setValue('10221001');
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
			model : 'app.model.corp.TbCorpInfoModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'CORP_NUM',
					'CORP_NAME',
					{	
						xtype:'combo',
						name:'CORP_AREA_eq',
						fieldLabel : '所属辖区',
		                editable:false,
		                store:Ext.getStore("sys_belong_area"),
		                displayField: 'NAME',  
		                valueField: 'CODE',
		                queryMode: 'local'
		            },
		            {fname:'BUSINESS_NUM'},
		            {fname:'CORP_ADD'},
					{fname:'CORP_TYPE',blankItem:true},
					//{fname:'STATUS',blankItem:true},
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
			model : 'app.model.corp.TbCorpInfoModel',
			url : 'manage/corp/corpinfo/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'CORP_NUM',
				{fname:'CORP_NAME',width:200},
				{fname:'BUSINESS_NUM',width:130},
				{fname:'CORP_AREA',renderer: app.utils.FunUtils.findAreaByCode},
				'MAGOR_BRANDS',
				'CORP_TYPE',
				'BUSINESS_TYPE',
				'STATUS',
				'IS_JOIN',
				'IS4S',
				'ZBLC',
				'ZBRQ',	
				{fname:'LINK_MAN'},
				{fname:'LINK_TEL'},
				{fname:'LEGAL_NAME'},
				{fname:'LEGAL_TEL'},
				{fname:'CREATE_QUATO_COUNT'},
				{fname:'UPLOAD_QUATO_COUNT'},
				{fname:'SEARCH_QUATO_COUNT'}
			],
			btns :
			[{
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
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'read_button'
			},'-',{
				xtype : 'button',
				text : '资质设定',
				itemId : 'zzsdBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				text : '配额管理',
				itemId : 'quatoBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				text : 'Excel导出',
				itemId : 'exportBtn',
				iconCls:'icon-download-alt bigger-120 blue'
			}
			
//			,'-',{
//				xtype : 'button',
//				text : '企业分布',
//				itemId : 'corpMapBtn',
//				icon : 'images/menus/1002.png'
//			}
			]
		};
	},	
				
	changeRowClass : function(record, rowIndex, rowParams, store){
		var v1 = Ext.Date.format(record.get("VALID_END_DATE"), 'Y-m-d');
       if (v1 <= "2016-01-01") {        
        return 'x-grid-record-red';
      }
    }	
});
