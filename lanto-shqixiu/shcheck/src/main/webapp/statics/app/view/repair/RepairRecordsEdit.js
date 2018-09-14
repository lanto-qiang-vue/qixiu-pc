Ext.define('app.view.repair.RepairRecordsEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.repair.RepairRecordsEdit',
	itemId: 'repair.RepairRecordsEdit',
	title: '维修开单',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 820,
	border:false,
	height:550,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		var items = [me.getItems(),me.getParts(),me.getPics()];
		me.items = [ {
			xtype:'form',
			layout : {
				type:'vbox',
				pack:'start',
				align:'stretch'
			},
			itemId:'npanel',
			bodyPadding : 10,
			items:[{xtype: 'fieldset',
		            title: '工单基本资料',
		            padding:5,
		            items:{
						xtype : 'jsf.ModelContainer',
						model : 'app.model.repair.RepairRecordModel',
						layout: {
		            		type: 'table',
		            		columns: 3
		        		},
		        		labelWidth: 70,
						btns:[],
						items: [
							{fname:'RECORD_ID',hidden:true},
							{xtype:'triggerfield',name:'PLATE_NUM',fieldLabel:'车牌号码',
								triggerCls: 'x-form-search-trigger',
				                editable:false,
				                beforeLabelTextTpl: required,
				                allowBlank:false,
				                onTriggerClick: function(e) {
				                	var me = this;
				                	var form = me.up('form').getForm();
					    			var win = Ext.create("app.view.common.PrivateVehicleSelWin",{
					    			     modal : true,
					    				 rowSelType : 'SINGLE', //单选
						   				 callback:function( records ){
						   	    			//将取到的值赋给页面
						   				 	var params = records[0].data;
						   				 	//console.log(params);
						   				 	params.CAR_VIN = params.VIN;
						   				 	params.REPAIR_PERSON = params.OWNER_NAME;
						   				 	params.REPAIR_PERSON_PHONE = params.OWNER_PHONE;
						   	    			form.setValues(params);
						   				}
				    				});
				    				win.show();
				    				win.down('grid').getStore().loadPage(1);
					    		}
							},
							{fname:'VEHICLE_ID',hidden:true},
							{fname:'OWNER_PHONE',hidden:true},
							{fname:'CAR_VIN',readOnly:true},
							{xtype:'datetimefield',name:'REPAIR_DATE',fieldLabel:'送修时间',allowBlank:false},
							{fname:'REPAIR_MILE'},
							{fname:'REPAIR_PERSON'},
							{fname:'REPAIR_PERSON_PHONE'},
							{fname:'FAULT_DESCRIPT',colspan:2,width:460},
							{fname:'START_REPAIR_TIME',readOnly:true},
							{fname:'FAULT_REASON',colspan:2,width:460},
							{
								xtype:'jsf.ComboDict',
								name:'STATUS',
								fieldLabel:'状态',
								readOnly:true,
								meta:{
									val:'dict|dict.1016'
								}
							}
						]}
					},
				{
					xtype : 'tabpanel',
					flex:1,
					bodyStyle:'border-color: #add2ed;',
					defaults: {xtype:'panel',border:0,autoScroll:true},
					items: items
				}
			]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			itemId : 'tbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'historyBtn',
						iconCls : 'icon-save blue',
						text : '维修历史',
						disabled:true
					},'-',{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'icon-save blue',
						text : '保 存'
					},'-' ,{
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
		var form = me.down('form').getForm();
		form.findField('REPAIR_DATE').setValue(new Date(),'Y-m-d H:i:s');
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var data=me.down('form').getValues();
		if(data.RECORD_ID!=""){
			me.down('form').down('#addItemsBtn').setDisabled(false);
			me.down('form').down('#deleteItemsBtn').setDisabled(false);
			me.down('form').down('#addPartsBtn').setDisabled(false);
			me.down('form').down('#deletePartsBtn').setDisabled(false);
			me.down('form').down('#uploadPhotoBtn').setDisabled(false);
			me.down('form').down('#deletePhotoBtn').setDisabled(false);
		}
		if(data.STATUS =='10161004'){
			me.down('form').down('#addItemsBtn').setDisabled(true);
			me.down('form').down('#deleteItemsBtn').setDisabled(true);
			me.down('form').down('#addPartsBtn').setDisabled(true);
			me.down('form').down('#deletePartsBtn').setDisabled(true);
			me.down('form').down('#uploadPhotoBtn').setDisabled(true);
			me.down('form').down('#deletePhotoBtn').setDisabled(true);
			me.down('#tbar').down('#saveBtn').hide();
		}
		me.down('#tbar').down('#historyBtn').setDisabled(false);
		//加载维修项目表格
		var ist=me.down('#itemsGrid').getStore();
		ist.proxy.extraParams.RECORD_ID_eq=data.RECORD_ID;
		ist.loadPage(1);
		//加载配件表格
		var pst=me.down('#partsGrid').getStore();
		pst.proxy.extraParams.RECORD_ID_eq=data.RECORD_ID;
		pst.loadPage(1);
		//加载维修图片
		var store = me.down('dataview[itemId=repairphoto]').getStore();
		store.proxy.extraParams.RECORD_ID=data.RECORD_ID;
		store.load();
	},
	//维修项目标签页
	getItems : function(){
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'itemsGrid',
			region : 'center',
			rowSelType : 'MULTI',
			layout : {type:'fit',align:'stretch'},
			title : '维修项目',
			model : 'app.model.repair.RepairItemsListModel',
			url : 'repair/repairitemslist/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'LIST_ID',hidden:true},
				{fname:'ITEM_NAME',flex:1,editor:{
					xtype:'combo',
					name:'ITEM_NAME',
	                editable:true,
	                store:Ext.getStore("repair_items"),
	                displayField: 'ITEM_NAME',  
	                valueField: 'ITEM_NAME',
	                forceSelection:true,
	                anyMatch:true,
	                queryMode: 'local',
	                allowBlank:false,
	                listeners:{
	                	select:function(cb,records){
	                		var record = records[0];
	                		var sels = me.down('#itemsGrid').getSelectionModel().getSelection();
	                		if(sels && sels.length > 0){
	                			sels[0].set('REPAIR_HOURS',record.get('REPAIR_HOURS'));
	                		}
	                	}
	                }
				}},
				{fname:'REPAIR_HOURS',flex:1,editor:true},
				{fname:'REPAIR_PERSON',flex:1,editor:true}
			],
			btns:[{
				xtype : 'button',
				text : '新增',
				itemId : 'addItemsBtn',
				iconCls:'font-bold icon-edit blue',
				disabled:true
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteItemsBtn',
				disabled:true
			}]
		}
	},
	//配件信息标签页
	getParts : function(){
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'partsGrid',
			region : 'center',
			rowSelType : 'MULTI',
			layout : {type:'fit',align:'stretch'},
			title : '配件信息',
			model : 'app.model.repair.PartsListModel',
			url : 'repair/partslist/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				//{fname:'PART_NAME',flex:1,editor:true},
				{fname:'PART_NAME',flex:1,editor:{
					xtype:'combo',
					name:'PART_NAME',
	                editable:true,
	                store:Ext.getStore("repair_parts"),
	                displayField: 'PART_NAME',  
	                valueField: 'PART_NAME',
	                forceSelection:true,
	                anyMatch:true,
	                queryMode: 'local',
	                allowBlank:false,
	                listeners:{
	                	select:function(cb,records){
	                		var record = records[0];
	                		var sels = me.down('#partsGrid').getSelectionModel().getSelection();
	                		if(sels && sels.length > 0){
	                			sels[0].set('PART_TYPE',record.get('PART_TYPE'));
	                			sels[0].set('PART_PRICE',record.get('PART_PRICE'));
	                			sels[0].set('PART_BRAND',record.get('PART_BRAND'));
	                			sels[0].set('IS_OWNER_PROVIDE',record.get('IS_OWNER_PROVIDE'));
	                			sels[0].set('PART_NUMBER','1');
	                		}
	                	}
	                }
				}},
				{fname:'PART_TYPE',flex:1},
				{fname:'PART_NUMBER',flex:1,editor:true},
				{fname:'PART_PRICE',flex:1,editor:true},
				{fname:'PART_BRAND',flex:1},
				{fname:'IS_OWNER_PROVIDE',flex:1},
				//{fname:'PART_PHOTO',flex:1},
				{fname:'PART_PHOTO',flex:1,align:'center',
                	renderer:function(v){
                		if(v==""){
                			return '<a href="javascript:void(0);">上传照片</a>';
                		}else{
                			return '<a href="javascript:void(0);">查看照片</a>';
                		}
                	},
                	listeners:{
                		click:function(a,b,c,d,e,f){
							var url = 'manage/vehicle/vehiclebase/partList';
							//var params = {geneId : f.data.GENE_ID,billCode:f.data.BILL_CODE};
							var params = {LIST_ID : f.data.LIST_ID,RECORD_ID : f.data.RECORD_ID};
							var win = Ext.create('app.view.repair.PartPhotoUpload');
							win.loadData(f,params);
                		}
                	}
                }
			],
			btns:[{
				xtype : 'button',
				text : '新增',
				itemId : 'addPartsBtn',
				iconCls:'font-bold icon-edit blue',
				disabled:true
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deletePartsBtn',
				disabled:true
			}]
		}
	},
	//维修图片标签页
	getPics : function(){
		return {
			xtype:'panel',
    		id: 'images-view',
    		title:'维修图片',
    		itemId:'picsPanel',
    		layout: {
                type: 'vbox',
                align:'stretch'
            },
            tbar:[{
				xtype : 'button',
				text : '上传图片',
				itemId : 'uploadPhotoBtn',
				iconCls:'font-bold icon-edit blue',
				disabled:true
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除图片',
				itemId : 'deletePhotoBtn',
				disabled:true
			}],
            defaults: {},
            items:[{
				xtype : 'dataview',
				autoScroll : true,
				//padding : '0 0 0 5',
				itemId : 'repairphoto',
				store : Ext.create('Ext.data.Store', {
					fields : ['IMAGE_ID','RECORD_ID','IMAGE_PATH','TAKE_TIME','IMAGE_INFO'],
					proxy: {
				    	actionMethods:{read:'POST'},
				        type: 'ajax',
				        reader: {
				            type: 'json',
				            root: 'data'
				        },
				        url: 'repair/repairphoto/photolist'
				    },
				    autoLoad:false
				}),
				tpl: [
		                '<tpl for=".">',
		                    '<div class="thumb-wrap">',
		                        '<div class="thumb" data-qtip="双击查看图片"><img src="{IMAGE_PATH:this.formatSrc}" height="90"></div>',
		                        '<span class="x-percent">',
		                        	'<div class="x-progress x-progress-default" style="height:30px;" id="progressbar-1037">{IMAGE_INFO}</br>{TAKE_TIME}</div>',
		                        '</span>',
		                    '</div>',
		                '</tpl>',
		                {
		                	formatChange: function(v){
						    	return v ;
				            },
				            formatSrc:function(v){
				            	return '/attach/' + v;
				            }
		                }
		            ],
				multiSelect : true,
				trackOver : true,
				overItemCls : 'x-item-over',
				itemSelector : 'div.thumb-wrap',
				emptyText : '无照片',
				listeners : {
					itemdblclick : function(a, b, c) {
						var win = Ext.create('app.view.common.ImageAutoWin', {
									title : '查看图片'
								});
						win.show();
						win.down('image').setSrc('/attach/' + b.data.IMAGE_PATH);
					}
				}
            }]
		}   
	}
});
