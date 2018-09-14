Ext.define('app.view.manage.corp.TransCorpInfoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TransCorpInfoEdit',
	itemId: 'manage.corp.TransCorpInfoEdit',
	title: '运输企业详细资料',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 740,
	height:500,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			border:0,
			layout:'border',
			itemId:'npanel',
			items:[{
				xtype : 'tabpanel',
				border:0,
				defaults: {xtype:'panel',border:0,autoScroll:true},
				region : 'center',
				items: [me.getCorpInfo()
				//,me.getEmployeeInfo(),me.getFunds(),me.getBusiness(),me.getQuality(),me.getZZ()
				]
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : [
//					{
//						xtype : 'button',
//						itemId : 'wxnlBtn',
//						iconCls : 'stop_button',
//						text : '维修能力'
//					},'-',{
//						xtype : 'button',
//						itemId : 'sbckBtn',
//						iconCls : 'stop_button',
//						text : '设备查看'
//					},'-',
//					{
//					xtype : 'button',
//					text : '附件上传',
//					itemId: 'attBtn',
//					iconCls: 'icon-reply bigger-120 blue',
//					handler:function(btn){
//						var wd = btn.up('window');
//						var form = wd.down('form').getForm();
//						var billId = form.findField("CORP_ID").getValue();
//						var win =	Ext.create('app.view.corp.uploadWin',{fileBillId:billId,fileBillType: app.utils.AttachCodes.CORP_INFO});
//						win.show();
//						win.down('#fileUploadGrid').reload();
//					}
//				},'-','->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存'
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
//		var form = me.down('form').getForm();
//		var type = form.findField('CORP_TYPE');
//		type.on('change',function(cob,val,oval,e){
//			if(!Ext.isEmpty(val)){
//				if(val == '10141004' || val == '10141005'){
//					form.findField('REPAIR_TYPES_').show();
//					form.findField('REPAIR_TYPES').hide();
//				}else{
//					form.findField('REPAIR_TYPES').show();
//					form.findField('REPAIR_TYPES_').hide();
//				}
//				if(!Ext.isEmpty(oval)){
//					form.findField('REPAIR_TYPES').setValue('');
//				}
//			}
//		});
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
					model : 'app.model.corp.TcCorpInfoModel',
					margin:'30 0 0 5',
					border:0,
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 115,
	        		defaults: {width:300,border:0,margin:2,msgTarget:'side'},
	        		items:[
	        			{fname:'CORP_ID',hidden:true},
						{fname:'CORP_NAME',width:606,colspan:3},
						{fname:'CORP_NUM',readOnly:true,emptyText:'系统自动生成'},
						{fname:'CHARGE_PERSON'},
						{fname:'LEGAL_TEL',vtype:'TELphone'},
						{	
							xtype:'combo',
							name:'CORP_AREA',
							fieldLabel : '<font color="red"><sub><b>*</b></sub></font>所属辖区',
			                editable:false,
			                store:Ext.getStore("sys_belong_area"),
			                displayField: 'NAME',  
			                valueField: 'CODE',
			                queryMode: 'local',
			                allowBlank:false
			            },
			            {fname:'SERVICE_HOTLINE'},
			            {fname:'BUSINESS_NUM'},
			            { fname:'CERT_DATE'},
			            { fname:'VALID_START_DATE'},
			            { fname:'VALID_END_DATE'},
						{fname:'EMAIL',vtype:'email'},
						{fname:'CONTACTS'},
						{fname:'CONTACTS_TEL',vtype:'TELphone'},
						{fname:'CORP_ADD',colspan:2,width:606},
						{fname:'WEB_SITE',colspan:2,width:606},
						{xtype:'textarea',anchor: '100%',height:60,fieldLabel:'备注',name:'REMARK',colspan:2,width:606}
	        		]
				}
				
			]
		};
	},
	/*getEmployeeInfo : function(){
		var me = this;
		return {
				title:'人员基本信息',
				xtype : 'panel',
				items: [
					{
						xtype:'jsf.ModelContainer',
						margin:'30 0 0 20',
						model : 'app.model.corp.TcCorpInfoModel',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
		        		labelWidth: 76,
		        		defaults: {width:300,border:0,margin:2},
		        		items:[
		        			'CHARGE_PERSON',
		        			'COPR_TEL',
		        			{fname:'LEGAL_PERSON',readOnly:true},
		        			'TECHNOLOGY_PERSON',
		        			'FINAL_PERSON',
		        			'FAX_NUM',
		        			'QUALITY_PERSON'
		        		]
					}],
					bbar: {items:[{ xtype: 'tbitem' },{xtype:'button',text:'从业人员资料查看',iconCls:'cd_button',tooltip:'点击查看从业人员资料',margin:'0 0 5 8',
						handler:function(btn){
							var win = Ext.create('app.view.corp.TbTransEmployeeWin');
							var pwin = btn.up('window');
							var form = pwin.down('form').getForm();
							win.loadData({CORP_NUM:form.findField('CORP_NUM').getValue()});
						}
					}]}
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
						margin:'30 0 0 20',
						model : 'app.model.corp.TcCorpInfoModel',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
		        		labelWidth: 100,
		        		defaults: {width:300,border:0,margin:2},
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
						margin:'30 0 0 20',
						model : 'app.model.corp.TcCorpInfoModel',
						defaults: {width:300,border:0,margin:2,msgTarget:'side'},
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
								fieldLabel : '<font color="red"><sub><b>*</b></sub></font>发证机关',
				                editable:true,
				                store:Ext.getStore('dict.1032'),
				                displayField: 'name', 
				                colspan:2,
				                width:600,
				                valueField: 'name',
				                queryMode: 'local',
				                allowBlank:false
				            },
		        			{name:'FIRST_CERT_TIME',xtype:'datetimefield',fieldLabel:'<font color="red"><sub><b>*</b></sub></font>首次发证日期',allowBlank:false},
		        			'CERT_DATE',
		        			'VALID_START_DATE',
		        			'VALID_END_DATE',
		        			{fname:'BUSINESS_NUM',colspan:2,width:600,readOnly:true},
		        			{xtype:'textarea',anchor: '100%',height:60,fieldLabel:'备注',name:'REMARK',colspan:2,width:600}
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
			model : 'app.model.corp.TbExamHisModel',
			url : 'manage/corp/tccorpinfo/checklist',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'EXAM_YEAR',flex:1,editor:true},
				{fname:'EXAM_LEVEL',flex:2,editor:true}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'add_button',
				handler : function(btn) {
	                var record = Ext.create('app.model.corp.TbExamHisModel');
	                var win = btn.up('window');
	                var store = win.down('grid').getStore();
	                var editing = win.down('grid').plugins[0];
	                store.insert(store.getCount(),record);
	                editing.startEditByPosition({
			            row: store.getCount()-1,
			            column: 2
			        });
                 }
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn',
				handler : function(btn) {
	                var win = btn.up('window');
	                var grid = win.down('grid');
	                var mds = grid.getSelectionModel().getSelection();
	                var store = grid.getStore();
	                if(!Ext.isEmpty(mds)){
	                	store.remove(mds);
	                }
                 }
			}]
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
					model : 'app.model.corp.TcCorpInfoModel',
					margin:'30 0 10 40',
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 82,
	        		defaults: {border:0,margin:2,readOnly:true},
	        		items:[
	        			{fname:'BIG_STATION',readOnly:false},
	        			{fname:'SMALL_STATION',readOnly:false},
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
					            { boxLabel: '是否诚信优质', name: 'IS_HONEST', inputValue: '10041001'},
					            
					            { boxLabel: '是否竣工检验资质', name: 'IS_DETECT', inputValue: '10041001'}					            
					        ]
					    }
	        		]
				}]
		};
	},	*/
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		record.data.REPAIR_TYPES_ = record.data.REPAIR_TYPES;
		//me.down('form').getForm().findField('CORP_NUM').show();
		//me.down('form').getForm().findField('CORP_TYPE').setReadOnly(true);
		me.down('form').loadRecord(record);
//		var store  = me.down('grid').getStore();
//		store.proxy.extraParams={CORP_ID : record.get('CORP_ID')};
//		store.loadPage(1);
	}
});
