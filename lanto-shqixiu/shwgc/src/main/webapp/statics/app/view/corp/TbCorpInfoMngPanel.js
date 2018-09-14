Ext.define('app.view.corp.TbCorpInfoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.corp.TbCorpInfoMngPanel',
	itemId: 'corp.TbCorpInfoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			border:0,
			itemId:'npanel',
			items:[{
				xtype : 'tabpanel',
				border:0,
				defaults: {xtype:'panel',border:0,autoScroll:true},
				items: [me.getCorpInfo(),me.getEmployeeInfo(),me.getFunds(),me.getBusiness(),me.getQuality()/*,
				me.getZZ()*/],
				bbar:[{xtype:'button',text:'保 存',iconCls:'save_button',margin:'0 0 0 20',itemId:'saveBtn'}]
			}]
		}],
		me.callParent(arguments);
		var form = me.down('form').getForm();
		var type = form.findField('CORP_TYPE');
		type.on('change',function(cob,val,oval,e){
			if(!Ext.isEmpty(val)){
				if(val == '10141004' || val == '10141005'){
					form.findField('REPAIR_TYPES_').show();
					form.findField('REPAIR_TYPES').hide();
				}else{
					form.findField('REPAIR_TYPES').show();
					form.findField('REPAIR_TYPES_').hide();
				}
				if(!Ext.isEmpty(oval)){
					form.findField('REPAIR_TYPES').setValue('');
				}
			}
		});
		
		var url = 'client/corp/tbcorpinfo/getModel';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				var mod = Ext.create('app.model.corp.TbCorpInfoModel');
				mod.set(ret.data);
				form.setValues(mod.data);
				me.down('grid').getStore().loadPage(1);
			}
		});
	},
	getCorpInfo : function(){
		var me = this;
		return {
				title:'企业基本信息',
				xtype : 'panel',
				border:0,
				items: [
					{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TbCorpInfoModel',
					margin:5,
					border:0,
					layout: {
	            		type: 'table',
	            		columns: 3
	        		},
	        		labelWidth: 90,
	        		defaults: {width:250,border:0,margin:2,msgTarget:'side'},
	        		items:[
	        			{fname:'CORP_ID',hidden:true},
						{fname:'CORP_NAME',readOnly:true},
						{fname:'CORP_NUM',readOnly:true,emptyText:'系统自动生成'},
						{	
							xtype:'combo',
							name:'CORP_AREA',
							readOnly:true,
							fieldLabel : '<font color="red"><sub><b>*</b></sub></font>所属辖区',
			                editable:false,
			                store:Ext.getStore("sys_belong_area"),
			                displayField: 'NAME',  
			                valueField: 'CODE',
			                queryMode: 'local',
			                allowBlank:false
			            },
			            {fname:'CORP_TYPE',blankItem:true,readOnly:true},
						{fname:'CORP_ADD',colspan:2,readOnly:true,width:606},
						{fname:'REPAIR_TYPES_',hidden:true,colspan:2,readOnly:true,width:606},
						{xtype:'triggerfield',name:'REPAIR_TYPES',readOnly:true,fieldLabel:'维修项目种类',
							triggerCls: 'x-form-search-trigger',
			                editable:false,colspan:2,width:606,
			                onTriggerClick: function(e) {
			                	var me = this;
			                	var form = me.up('form').getForm();
				    			var win = Ext.create("app.view.common.RepairSelWin",{
				    			     modal : true,
				    			     x:me.getX() + 72,
				    			     y:me.getY() + 25,
					   				 callback:function( records ){
					   				 	var values = [];
					   	    			for(var i=0;i<records.length;i++){
					   	    				var record = records[i];
					   	    				values.push(record.inputValue);
					   	    			}
					   	    			me.setValue(values.join(','));
					   				}
			    				});
			    				win.show();
			    				win.loadData(form.findField('CORP_TYPE').getValue(),me.getValue());
				    		}
						},
						{fname:'EMAILS',vtype:'email'},
						//{fname:'BUSINESS_NUM',colspan:2,width:400},
						{fname:'BOUND'},
						{fname:'SERVICE_HOTLINE'},
						{fname:'ADMIN_DEPT'},								
						{fname:'WEB_SITE',colspan:2,width:606}
	        		]
				}
				
			]
		};
	},
	getEmployeeInfo : function(){
		var me = this;
		return {
				title:'人员基本信息',
				xtype : 'panel',
				items: [
					{
						xtype:'jsf.ModelContainer',
						model : 'app.model.corp.TbCorpInfoModel',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
		        		labelWidth: 76,
		        		defaults: {width:300,border:0,margin:2,readOnly:true},
		        		items:[
		        			'CHARGE_PERSON',
		        			{fname:'LINK_TEL',readOnly:false},
		        			{fname:'LEGAL_PERSON'},
		        			'TECHNOLOGY_PERSON',
		        			'FINAL_PERSON',
		        			'FAX_NUM',
		        			'QUALITY_PERSON'
		        			/*
		        			{xtype:'button',text:'从业人员资料查看',iconCls:'cd_button',tooltip:'点击查看从业人员资料',margin:'0 10 0 20',width:130,
								handler:function(btn){
									var win = Ext.create('app.view.corp.TbTransEmployeeWin');
									win.loadData();
								}
							}*/
		        		]
					}]
			};
	},
	getFunds : function(){
		var me = this;
		return {						
				title:'资金与面积',
				xtype : 'panel',
				items: [
					{
						xtype:'jsf.ModelContainer',
						model : 'app.model.corp.TbCorpInfoModel',
						margin:'0 0 10 0',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
		        		labelWidth: 100,
		        		defaults: {width:300,border:0,margin:2,readOnly:true},
		        		items:[
		        			'REGIST_FUNDS',
		        			'FIX_FUNDS',
		        			'FLOW_FUNDS',
		        			'PLANT_AREA',
		        			'PARK_AREA',
		        			'ANTEROOM_AREA',
		        			'TRAIN_AREA'
		        		]
					}]
			};
	},
	getBusiness : function(){
		var me = this;
		return {
				title:'商事信息',
				xtype : 'panel',
				items: [
					{
						xtype:'jsf.ModelContainer',
						model : 'app.model.corp.TbCorpInfoModel',
						defaults: {width:300,border:0,margin:2,msgTarget:'side',readOnly:true},
						margin:'0 0 10 0',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
		        		labelWidth: 115,
		        		items:[
		        			{fname:'INDUSTRY_ORGAN',colspan:2,width:600},
		        			{fname:'INDUSTRY_CODE',colspan:2,width:600},
		        			{	
								xtype:'combo',
								name:'CERT_ORGAN',
								fieldLabel : '发证机关',
				                editable:true,
				                store:Ext.getStore('dict.1032'),
				                displayField: 'name', 
				                colspan:2,
				                width:600,
				                valueField: 'name',
				                queryMode: 'local'
				            },
		        			{name:'OPEN_DATE',xtype:'datetimefield',fieldLabel:'首次发证日期'},
		        			'CERT_DATE',
		        			'VALID_START_DATE',
		        			'VALID_END_DATE',
		        			{fname:'BUSINESS_NUM',colspan:2,width:600,readOnly:true}
	
		        		]
					}]
			};
	},
	getQuality : function(){
		var me = this;
		return {						
			title:'质量信誉考核',
			xtype : 'jsf.ModelGrid',
			paging:false,
			rowSelType : 'MULTI',
			height:400,
			model : 'app.model.corp.TbExamHisModel',
			url : 'client/corp/tbcorpinfo/checklist',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'EXAM_YEAR',flex:1},
				{fname:'EXAM_LEVEL',flex:2}
			],
			btns : []
		};
	},
	getZZ : function(){
		var me = this;
		return {
			title:'企业资质',
			xtype : 'panel',
			items: [
				{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TbCorpInfoModel',
					margin:'0 0 10 0',
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 82,
	        		defaults: {border:0,margin:2,readOnly:true},
	        		items:[
	        			{fname:'BIG_STATION'},
	        			{fname:'SMALL_STATION'},
	        			{
					        xtype: 'checkboxgroup',
					        itemId:'box_group',
					        name:'box_group',
					        defaults: {readOnly:true},
					        colspan:2,
					        width:650,
					        columns: 3,
					        vertical: true,
					        items: [
					            { boxLabel: '大中型客车', name: 'IS_DZXKC', inputValue: '10041001'},
					            { boxLabel: '是否二级维护定点厂', name: 'IS_SEC_MAINTAIN', inputValue: '10041001'},
					            { boxLabel: '是否LPG定点维修厂', name: 'IS_LPG', inputValue: '10041001'},
					            { boxLabel: '是否出租车定点维护厂', name: 'IS_TAX', inputValue: '10041001'},
					            
					            { boxLabel: '大中型车', name: 'IS_DZXHC', inputValue: '10041001'},
					            { boxLabel: '危运车辆维修', name: 'IS_WYCL', inputValue: '10041001'},
					            { boxLabel: '尾气资质', name: 'IS_WQC', inputValue: '10041001'},
					            { boxLabel: '是否连锁经营', name: 'IS_CHAIN', inputValue: '10041001'},
					            
					            { boxLabel: '小型车', name: 'IS_XXC', inputValue: '10041001'},
					            { boxLabel: '教练车维护', name: 'IS_JLC', inputValue: '10041001'},
					            { boxLabel: '是否4S店', name: 'IS_S4', inputValue: '10041001'},
					            { boxLabel: '是否诚信优质', name: 'IS_HONEST', inputValue: '10041001'}
					        ]
					    }

	        		]
				}]
		};
	}
});
