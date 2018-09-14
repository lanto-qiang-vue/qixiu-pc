Ext.define('app.view.manage.corp.TransCorpInfoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.corp.TransCorpInfoMngPanel',
	itemId: 'manage.corp.TransCorpInfoMngPanel',
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
	//	me.down('form').getForm().findField('STATUS').setValue('10221001');
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
			model : 'app.model.corp.TcCorpInfoModel',
			layout:'column',
			columns:3,
			labelWidth: 100,
			showType : 'search',
			items: [
					'CORP_NUM',
					'CORP_NAME',
					{	
						xtype:'combo',
						name:'CORP_AREA',
						fieldLabel : '所属辖区',
		                editable:false,
		                store:Ext.getStore("sys_belong_area"),
		                displayField: 'NAME',  
		                valueField: 'CODE',
		                queryMode: 'local'
		            },
		            {name:'BUSINESS_NUM',xtype:'textfield',fieldLabel:'道路经营证号'},
		            {fname:'CORP_ADD'},
					//{fname:'CORP_TYPE',blankItem:true},
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
			model : 'app.model.corp.TcCorpInfoModel',
			url : 'manage/transcorp/tccorpinfo/list',
/*		    viewConfig:{forceFit:true,stripeRows:true,getRowClass:
		    					function(record, rowIndex, rowParams, store){
		    					  var v1= Ext.Date.format(record.get("VALID_END_DATE"), 'Y-m-d');
		    					  var date = Ext.Date.add(new Date(), Ext.Date.DAY, 30);
		    					  var v2 = Ext.Date.format(date, 'Y-m-d');
		    					  var v3 = Ext.Date.format(new Date(), 'Y-m-d');
		    					  if (v3>v1){
		    					   return 'x-grid-record-red';
		    					  }
		    					  else if (v2 >= v1) { 
					                return 'x-grid-record-yellow';
		    					  }
					            }
					   },*/
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'CORP_NUM',
				{fname:'CORP_NAME',width:200},
				//'STATUS',
				{fname:'BUSINESS_NUM',width:130},
				'FIRST_CERT_TIME',
				'VALID_START_DATE',
				'VALID_END_DATE',
				/*
				{fname:'VALID_END_DATE',width:160,
					renderer:function(value,d,r){
					  var v1 = Ext.Date.format(r.data.VALID_END_DATE, 'Y-m-d');
					  var v2 =v1;
					  if(v1<='2016-01-01'){
						v2 = '<span style="color:red;">' + v1 + '</span>';
						 }
						return v2;
					  }
				},		*/		
				{fname:'CORP_AREA',renderer: app.utils.FunUtils.findAreaByCode},
				{fname:'CHARGE_PERSON'},
				//{fname:'COPR_TEL',text:'负责人电话'},
				{fname:'CORP_ADD',width:200}
				/*
				 ,
				 {dataIndex:'REPAIR_TYPES',text:'维修项目种类',width:200},
				'CORP_TYPE',
				'CORP_STYPE',
				{fname:'IS_SEC_MAINTAIN',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_LPG',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_WYCL',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_TAX',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_DZXHC',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_DZXKC',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_XXC',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_WQC',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_JLC',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_S4',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_CHAIN',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_HONEST',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				},
				{fname:'IS_DETECT',
					renderer: function (v) {
                        if(v == 'true'){
                        	return '<img border="0" src="images/check.gif" />';
                        }else{
                        	return '<img border="0" src="images/uncheck.gif" />';
                        }
	                }
				}	*/			
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
				iconCls:'cd_button'
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
			/*
			,'-',{
				xtype : 'button',
				text : '企业地图',
				itemId : 'viewPanelBtn',
				icon : 'images/menus/1002.png'
			},'-',{
				xtype: 'button',
				iconCls: 'print_button',
				text : '证件打印',
				itemId: 'printBtn',
				 menu: [{
                        text:'道路运输证正证打印',
                        type:'zb',
                        iconCls:'print_button'
                    },{
                        text:'道路运输证副证打印',
                        type:'fb',
                        iconCls:'print_button'
                    }]
			}
			,'-',{
				xtype : 'button',
				text : '历史资料',
				itemId : 'historyBtn',
				iconCls:'history_button'
			}*/
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
