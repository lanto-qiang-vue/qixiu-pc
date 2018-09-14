Ext.define('app.view.transrepair.RepairRecordsView',{
	extend:'Ext.window.Window',
	alias: 'widget.transrepair.RepairRecordsView',
	itemId: 'transrepair.RepairRecordsView',
	title: '车辆技术档案',
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
						model : 'app.model.transrepair.RepairRecordModel',
						layout: {
		            		type: 'table',
		            		columns: 3
		        		},
		        		labelWidth: 70,
						btns:[],
						items: [
							{fname:'RECORD_ID',hidden:true},
							{fname:'TRANS_CORP_ID',hidden:true},
							{xtype:'triggerfield',name:'PLATE_NUM',fieldLabel:'车牌号码',
								triggerCls: 'x-form-search-trigger',
				                editable:false,
				                beforeLabelTextTpl: required,
				                allowBlank:false,
				                onTriggerClick: function(e) {
				                	var me = this;
				                	var form = me.up('form').getForm();
					    			var win = Ext.create("app.view.common.TransVehicleSelWin",{
					    			     modal : true,
					    				 rowSelType : 'SINGLE', //单选
						   				 callback:function( records ){
						   	    			//将取到的值赋给页面
						   				 	var params = records[0].data;
						   				 	delete params.STATUS;
						   				 	params.CAR_VIN = params.CHASSIS_NUM;
						   				 	console.log(params);
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
							{fname:'PLATE_COLOR',hidden:true},
							{xtype:'datetimefield',name:'REPAIR_DATE',fieldLabel:'送修时间',allowBlank:false},
							{fname:'REPAIR_MILE'},
							{fname:'REPAIR_PERSON'},
							{fname:'REPAIR_PERSON_PHONE'},
							{fname:'START_REPAIR_TIME',readOnly:true},
							//{fname:'FAULT_REASON',colspan:2,width:460},
							{
								xtype:'jsf.ComboDict',
								name:'STATUS',
								fieldLabel:'状态',
								readOnly:true,
								meta:{
									val:'dict|dict.1016'
								}
							},
							{fname:'REPAIR_TYPE'},
							{fname:'FAULT_DESCRIPT',colspan:2,width:460}
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
			items : ['->', {
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
			//autoLoad:false,
			layout : {type:'fit',align:'stretch'},
			title : '维修项目',
			model : 'app.model.transrepair.RepairItemsListModel',
			url : 'transrepair/repairitemslist/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'LIST_ID',hidden:true},
				{fname:'ITEM_NAME',flex:1},
				{fname:'REPAIR_HOURS',flex:1},
				{fname:'REPAIR_PERSON',flex:1}
			],
			btns:[]
		}
	},
	//配件信息标签页
	getParts : function(){
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'partsGrid',
			region : 'center',
			//autoLoad:false,
			rowSelType : 'MULTI',
			layout : {type:'fit',align:'stretch'},
			title : '配件信息',
			model : 'app.model.transrepair.PartsListModel',
			url : 'transrepair/partslist/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				//{fname:'PART_NAME',flex:1,editor:true},
				{fname:'PART_NAME',flex:1},
				{fname:'PART_TYPE',flex:1},
				{fname:'PART_NUMBER',flex:1},
				{fname:'PART_PRICE',flex:1},
				{fname:'PART_BRAND',flex:1},
				{fname:'IS_OWNER_PROVIDE',flex:1},
				//{fname:'PART_PHOTO',flex:1},
				{fname:'PART_PHOTO',flex:1,align:'center',
                	renderer:function(v){
                		if(v==""){
                			return '无照片';
                		}else{
                			return '<a href="javascript:void(0);">查看照片</a>';
                		}
                	},
                	listeners:{
                		click:function(a,b,c,d,e,f){
							var params = {LIST_ID : f.data.LIST_ID,RECORD_ID : f.data.RECORD_ID};
							var win = Ext.create('app.view.transrepair.PartPhotoUpload');
							win.loadData(f,params);
                		}
                	}
                }
			],
			btns:[]
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
				        url: 'transrepair/repairphoto/photolist'
				    }
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
