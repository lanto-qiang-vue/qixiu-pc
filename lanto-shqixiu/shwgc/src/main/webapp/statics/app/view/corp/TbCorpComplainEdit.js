Ext.define('app.view.corp.TbCorpComplainEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.corp.TbCorpComplainEdit',
	itemId: 'corp.TbCorpComplainEdit',
	title: '新增投诉单',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 800,
	height:600,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
				xtype:'form',
				region : 'center',
				layout:'fit',
				items:[{
					xtype:'tabpanel',
					items:[me.getFormPanel()]
				}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '提 交'
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	getFormPanel:function(){
		var me = this;
		return {
			xtype:'panel',
			title:'投诉单信息',
			itemId:'npanel',
			autoScroll:true,
			width : 770,
			items:[{
					xtype: 'fieldset',
		            title: '投诉信息',
		            margin:3,
		            items:[{
							xtype : 'jsf.ModelContainer',
							model : 'app.model.corp.TbCorpComplainModel',
							margin : '0 0 10 0',
							defaults: {msgTarget:'side',width:238},
							layout: {
			            		type: 'table',
			            		columns: 3
			        		},
			        		labelWidth: 76,
							btns:[],
							items: [
								{fname:'COMPLAIN_ID',hidden:true},
								{fname:'CORP_ID',hidden:true},
								{fname:'ORDER_ID',hidden:true},
								'COMPLAIN_OPER',
								'ID_CARD',
								{	
									xtype:'combo',
									name:'CONTACT_TYPE',
									fieldLabel : '<font color="red"><sub><b>*</b></sub></font>投诉方式',
					                editable:true,
					                store : new Ext.data.SimpleStore({
				                        fields : ['value', 'text'],
				                        data : [['来信','来信'],
				                        		['来人','来人'],
				                        		['96900','96900'],
				                        		['12315','12315'],
				                        		['网络','网络'],
				                        		['其他','其他']]
						            }),
					                displayField: 'text',  
					                valueField: 'value',
					                allowBlank:false,
					                queryMode: 'local'
					            },
								{xtype:'triggerfield',name:'CORP_NAME',fieldLabel:'<font color="red"><sub><b> *</b></sub></font>被投诉企业',
									triggerCls: 'x-form-search-trigger',
									emptyText:'如果是本系统中存在的企业请点击选择',
					                readOnly:false,
					                width:485,
					                colspan:2,
					                allowBlank:false,
					                onTriggerClick: function(e) {
					                	var me = this;
					                	var form = me.up('form').getForm();
						    			var win = Ext.create("app.view.common.CorpSelWin",{
						    			     modal : true,
						    				 rowSelType : 'SINGLE', //单选
							   				 callback:function( records ){
							   	    			//将取到的值赋给页面
							   				 	var params = records[0].data;
							   	    			form.setValues(params);
							   				}
					    				});
					    				win.show();
					    				win.down('grid').getStore().loadPage(1);
						    		}
								},
								{name:'HAPPEN_DATE',xtype:'datetimefield',fieldLabel:'事发时间'},
								{	
									xtype:'combo',
									name:'AREA_CODE',
									fieldLabel : '<font color="red"><sub><b> *</b></sub></font>所属辖区',
					                editable:false,
					                store:Ext.getStore("sys_belong_area"),
					                displayField: 'NAME',  
					                valueField: 'CODE',
					                queryMode: 'local',
					                allowBlank:false,
					                vtype:'notEmpty'
					            },
					            'CONTACT_TEL',
					            {fname:'COMPLAIN_DATE',value:new Date()},
					            {xtype:'textarea',anchor: '100%',height:70,fieldLabel:'<font color="red"><sub><b> *</b></sub></font>投诉内容',name:'COMPLAIN_CONTENT',colspan:3,width:700}
							]
						}]
				},{
					xtype: 'fieldset',
		            title: '管理部门受理信息',
		            itemId:'accept_set',
		            margin:3,
		            items:[{
							xtype : 'jsf.ModelContainer',
							model : 'app.model.corp.TbCorpComplainModel',
							margin : '0 0 10 0',
							defaults: {msgTarget:'side',width:238},
							layout: {
			            		type: 'table',
			            		columns: 3
			        		},
			        		labelWidth: 70,
							btns:[],
							items: [
								'ACCEPT_OPER',
					            'ACCEPT_DATE',
					            {
									xtype: 'container',
									layout:{
										type: 'hbox',
										pack : 'start'
									},
									items:[]
								},
					            {xtype:'textarea',anchor: '100%',height:70,fieldLabel:'<font color="red"><sub><b> *</b></sub></font>受理意见',name:'ACCEPT_REMARK',colspan:3,width:700,allowBlank:false}
							]
						}]
				},{
					xtype: 'fieldset',
		            title: '企业处理信息',
		            itemId:'process_set',
		            margin:3,
		            items:[{
							xtype : 'jsf.ModelContainer',
							model : 'app.model.corp.TbCorpComplainModel',
							margin : '0 0 10 0',
							defaults: {msgTarget:'side',width:238},
							layout: {
			            		type: 'table',
			            		columns: 3
			        		},
			        		labelWidth: 70,
							btns:[],
							items: [
								'CORP_DEAL_OPER',
					            'CORP_DEAL_DATE',
					            {xtype:'displayfield'},
					            {xtype:'textarea',anchor: '100%',height:70,fieldLabel:'<font color="red"><sub><b> *</b></sub></font>企业处理意见',name:'CORP_DEAL_REMARK',colspan:3,width:700}
							]
						}]
				},{
					xtype: 'fieldset',
		            title: '办结信息',
		            itemId:'complete_set',
		            margin:3,
		            items:[{
							xtype : 'jsf.ModelContainer',
							model : 'app.model.corp.TbCorpComplainModel',
							margin : '0 0 10 0',
							defaults: {msgTarget:'side',width:238},
							layout: {
			            		type: 'table',
			            		columns: 3
			        		},
			        		labelWidth: 70,
							btns:[],
							items: [
								'COMPLETE_OPER',
					            'COMPLETE_DATE',
					            {xtype:'displayfield'},
					            {xtype:'textarea',anchor: '100%',height:70,fieldLabel:'<font color="red"><sub><b> *</b></sub></font>办结意见',name:'COMPLETE_REMARK',colspan:3,width:700}
							]
						}]
				}]
		};
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadProcessData : function(record){
		var me = this;
		me.down('fieldset[itemId=complete_set]').setDisabled(true).hide();
		var form = me.down('form').getForm();
		var mod = Ext.create('app.model.corp.TbCorpComplainModel');
		mod.set(record);
		form.setValues(mod.data);
		var params = {
			CORP_DEAL_OPER : window.GL.name,
			CORP_DEAL_DATE : new Date()
		};
		form.setValues(params);
		var fields = form.getFields().items;
		for(var i=0;i<fields.length;i++){
			fields[i].setReadOnly(true);
		}
		form.findField('CORP_DEAL_REMARK').setReadOnly(false);
	},
	loadViewData : function(record){
		var me = this;
		var form = me.down('form').getForm();
		var mod = Ext.create('app.model.corp.TbCorpComplainModel');
		mod.set(record);
		form.setValues(mod.data);
		var fields = form.getFields().items;
		for(var i=0;i<fields.length;i++){
			fields[i].setReadOnly(true);
		}
		me.down('button[itemId=saveBtn]').hide();
		me.down('button[itemId=saveBtn]').next('tbseparator').hide();
	}
});
