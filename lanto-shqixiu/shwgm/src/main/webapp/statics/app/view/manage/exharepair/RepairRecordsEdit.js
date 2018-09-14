Ext.define('app.view.manage.exharepair.RepairRecordsEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.exharepair.RepairRecordsEdit',
	itemId: 'manage.exharepair.RepairRecordsEdit',
	title: '工单详情',
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
		var items = [me.getCheck(),me.getItems(),me.getParts(),me.getPics()];
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
						model : 'app.model.exharepair.RepairRecordModel',
						layout: {
		            		type: 'table',
		            		columns: 3
		        		},
		        		labelWidth: 70,
						btns:[],
						items: [
							{fname:'RECORD_ID',hidden:true},
							{fname:'VEHICLE_ID',hidden:true},
							{fname:'OWNER_PHONE',hidden:true},
							{fname:'PLATE_NUM'},
							{fname:'CAR_VIN',readOnly:true},
							{xtype:'datetimefield',name:'REPAIR_DATE',fieldLabel:'送修时间',allowBlank:false},
							{fname:'REPAIR_MILE'},
							{fname:'REPAIR_PERSON'},
							{fname:'REPAIR_PERSON_PHONE'},
							{fname:'FAULT_DESCRIPT'},
							{fname:'FUEL_TYPE'},
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
		form.findField('FUEL_TYPE').on('change',function(comb,newValue,oldValue){
			var checkform=me.down('#checkform').getForm();
			checkform.reset();
			if(newValue=='10111001'){
				checkform.findField('BTGXS_CHECK').setReadOnly(true);
				checkform.findField('BTGXS_BEFORE_REPAIR').setReadOnly(true);
				checkform.findField('BTGXS_AFTER_REPAIR').setReadOnly(true);
				checkform.findField('ZDLBGL_CHECK').setReadOnly(true);
				checkform.findField('ZDLBGL_BEFORE_REPAIR').setReadOnly(true);
				checkform.findField('ZDLBGL_AFTER_REPAIR').setReadOnly(true);
				
				checkform.findField('CO_CHECK').setReadOnly(false);
				checkform.findField('CO_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('CO_AFTER_REPAIR').setReadOnly(false);
				checkform.findField('HC_CHECK').setReadOnly(false);
				checkform.findField('HC_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('HC_AFTER_REPAIR').setReadOnly(false);
				checkform.findField('NO_CHECK').setReadOnly(false);
				checkform.findField('NO_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('NO_AFTER_REPAIR').setReadOnly(false);
			}else if(newValue=='10111002'){
				checkform.findField('CO_CHECK').setReadOnly(true);
				checkform.findField('CO_BEFORE_REPAIR').setReadOnly(true);
				checkform.findField('CO_AFTER_REPAIR').setReadOnly(true);
				checkform.findField('HC_CHECK').setReadOnly(true);
				checkform.findField('HC_BEFORE_REPAIR').setReadOnly(true);
				checkform.findField('HC_AFTER_REPAIR').setReadOnly(true);
				checkform.findField('NO_CHECK').setReadOnly(true);
				checkform.findField('NO_BEFORE_REPAIR').setReadOnly(true);
				checkform.findField('NO_AFTER_REPAIR').setReadOnly(true);
				
				checkform.findField('BTGXS_CHECK').setReadOnly(false);
				checkform.findField('BTGXS_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('BTGXS_AFTER_REPAIR').setReadOnly(false);
				checkform.findField('ZDLBGL_CHECK').setReadOnly(false);
				checkform.findField('ZDLBGL_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('ZDLBGL_AFTER_REPAIR').setReadOnly(false);
			}else{
				checkform.findField('BTGXS_CHECK').setReadOnly(false);
				checkform.findField('BTGXS_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('BTGXS_AFTER_REPAIR').setReadOnly(false);
				checkform.findField('ZDLBGL_CHECK').setReadOnly(false);
				checkform.findField('ZDLBGL_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('ZDLBGL_AFTER_REPAIR').setReadOnly(false);
				
				checkform.findField('CO_CHECK').setReadOnly(false);
				checkform.findField('CO_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('CO_AFTER_REPAIR').setReadOnly(false);
				checkform.findField('HC_CHECK').setReadOnly(false);
				checkform.findField('HC_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('HC_AFTER_REPAIR').setReadOnly(false);
				checkform.findField('NO_CHECK').setReadOnly(false);
				checkform.findField('NO_BEFORE_REPAIR').setReadOnly(false);
				checkform.findField('NO_AFTER_REPAIR').setReadOnly(false);
			}
		});
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
	//自检结果标签页
	getCheck : function(){
		var me = this;
		return {
			xtype:'form',
			layout : 'fit',
			itemId:'checkform',
			title:'自检结果',
			bodyPadding : 15,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.exharepair.RepairRecordModel',
				layout: {
            		type: 'table',
            		columns: 3
        		},
        		labelWidth: 100,
				btns:[],
				items: [
					{
						xtype: 'container',
						margin:'10 0 0 20',
						html:'<div align="center"><font color="red">检测站</font></div>'
					},
					{
						xtype: 'container',
						margin:'10 0 0 20',
						html:'<div align="center"><font color="red">维修前</font></div>'
					},
					{
						xtype: 'container',
						margin:'10 0 0 20',
						html:'<div align="center"><font color="red">维修后</font></div>'
					},
					{
			        	xtype:'component',
			        	padding:'5 10 5 20',
			        	margin:'10 20 10 20',
			        	style:'background:#eee;',
			        	html:'汽油车',
			        	colspan:3
			        },
					{fname:'CO_CHECK'},
					{fname:'CO_BEFORE_REPAIR'},
					{fname:'CO_AFTER_REPAIR'},
					{fname:'HC_CHECK'},
					{fname:'HC_BEFORE_REPAIR'},
					{fname:'HC_AFTER_REPAIR'},
					{fname:'NO_CHECK'},
					{fname:'NO_BEFORE_REPAIR'},
					{fname:'NO_AFTER_REPAIR'},
					{
			        	xtype:'component',
			        	padding:'5 10 5 20',
			        	margin:'10 20 10 20',
			        	style:'background:#eee;',
			        	html:'柴油车',
			        	colspan:3
			        },
					{fname:'BTGXS_CHECK',readOnly:true},
					{fname:'BTGXS_BEFORE_REPAIR',readOnly:true},
					{fname:'BTGXS_AFTER_REPAIR',readOnly:true},
					{fname:'ZDLBGL_CHECK',readOnly:true},
					{fname:'ZDLBGL_BEFORE_REPAIR',readOnly:true},
					{fname:'ZDLBGL_AFTER_REPAIR',readOnly:true}
				]
			}]
		}
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
			model : 'app.model.exharepair.RepairItemsListModel',
			url : 'manage/exharepair/repairitemslist/list',
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
			rowSelType : 'MULTI',
			layout : {type:'fit',align:'stretch'},
			title : '配件信息',
			model : 'app.model.exharepair.PartsListModel',
			url : 'manage/exharepair/partslist/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				//{fname:'PART_NAME',flex:1,editor:true},
				{fname:'PART_NAME'},
				{fname:'PART_TYPE'},
				{fname:'PART_NUMBER'},
				{fname:'PART_PRICE'},
				{fname:'PART_BRAND'},
				{fname:'IS_OWNER_PROVIDE'},
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
							var win = Ext.create('app.view.manage.exharepair.PartPhotoUpload');
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
            tbar:[],
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
				        url: 'manage/exharepair/repairphoto/photolist'
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
