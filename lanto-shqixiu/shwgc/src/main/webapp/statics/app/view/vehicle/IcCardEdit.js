Ext.define('app.view.vehicle.IcCardEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.vehicle.IcCardEdit',
	itemId: 'vehicle.IcCardEdit',
	title: '车辆发卡',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'fit',
	isAdd:'add',
	width : 700,
	height:460,
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			itemId:'baseInfoPanel',
			title:'车辆基本情况',
			bodyPadding:'10 5 0 0',
			layout:{
				type:'vbox',
				pack: 'start',
        		align: 'stretch'
			},
			fieldDefaults: {
		        readOnly:true
		    },
			items:[{
				xtype:'container',
				//height:140,
				layout:{
					type:'hbox',
					pack: 'start',
	        		align: 'stretch'
				},
				items:[{
					xtype:'container',
					layout:{
						type:'vbox',
						pack: 'start',
						align: 'stretch'
					},
					flex:3,
					items:[{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{xtype:'hidden',name:'VEHICLE_ID'},{xtype:'hidden',name:'CARD_ID'},{
							xtype:'triggerfield',name:'PLATE_NUM',fieldLabel:'车牌号码',
							triggerCls: 'x-form-search-trigger',
			                editable:false,
			                flex:1,
			                beforeLabelTextTpl: required,
			                vtype:'License',
			                readOnly:me.isAdd != 'add',
			                allowBlank:false,
			                onTriggerClick: function(e) {
			                	var form = me.down('form');
			                	var plateNum = form.getForm().findField('PLATE_NUM');
			                	if(!me.menu){
			                		me.menu = Ext.create('app.ux.Menu',{ 			
										//padding:5,
										plain: true,
										items:[{
											padding:'5 0 5 0',
											xtype : 'jsf.ModelGrid',
											width:620,
											height:360,
											itemId : 'searchselgrid',
											listeners:{
												afterrender:function(grid){
													var store = grid.getStore();
													store.on('beforeload',function(st){
														st.proxy.extraParams={searchType:'card',searchtext:me.menu.down('#searchtext').getValue()};
													});
													store.loadPage(1);
												},
												itemclick:function(grid, record, item, index, e, eOpts){
													form.loadRecord(record);
													if(!Ext.isEmpty(record.get('PHOTO'))){
														me.down('image').setSrc("/attach/" + record.get('PHOTO'));
													}
													me.menu.hide();
												}
											},
											region : 'center',
											rowSelType : 'SIGN',
											model : 'app.model.VehicleBaseModel',
											url : 'client/repair/gene/vehicleSelList',
											columns : [
												{text:'序号',xtype:'rownumberer'},
												{fname:'RECORD_NO',flex:2},
												{fname:'PLATE_NUM',flex:2},
												{fname:'PLATE_COLOR',width:70},
												{fname:'VEHICLE_TYPE',width:80},
												{fname:'DELEGATE_NAME',flex:2,text:'运输企业'}
											],
											btns : [{
												xtype:'textfield',
												width:250,
												itemId:'searchtext',
												emptyText:'请输入车牌号查询',
												name:'searchtext'
											},{
												xtype:'button',
												tooltip:'按条件查询',
												iconCls:'icon-search blue',
												handler:function(){
													var grid = me.menu.down('#searchselgrid');
													grid.getStore().loadPage(1);
												}
											},{
												xtype:'button',
												tooltip:'清空条件',
												iconCls:'icon-remove blue',
												handler:function(){
													me.menu.down('#searchtext').setValue('');
												}
											},'->',{
												xtype:'button',
												text:'关 闭',
												iconCls:'icon-remove red',
												handler:function(){
													me.menu.hide();
												}
											}]
										}]
			                		});
			                	}
			                	me.menu.showAt([plateNum.getX() + 25,plateNum.getY() + 23]);
			                }
						},{
							xtype:'jsf.ComboDict',
							flex:1,
							readOnly:true,
							beforeLabelTextTpl: required,
							fieldLabel:'车牌颜色',
							allowBlank:false,
							meta:{
								val:'dict|dict.1006'
							},
							name:'PLATE_COLOR'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'jsf.ComboDict',
							blankItem:true,
							readOnly:true,
							allowBlank:false,
							beforeLabelTextTpl: required,
							flex:1,
							vtype:'notEmpty',
							meta:{
								val:'dict|dict.1007'
							},
							fieldLabel:'车辆类型',
							name:'VEHICLE_TYPE'
						},{
							xtype:'textfield',
							flex:1,
							readOnly:true,
							fieldLabel:'档案号',
							name:'RECORD_NO'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'textfield',
							flex:1,
							readOnly:true,
							fieldLabel:'道路运输证号',
							name:'LOAD_CERT_NUM'
						},{
							xtype:'datefield',
							flex:1,
							format:'Y-m-d',
							readOnly:true,
							fieldLabel:'发证日期',
							beforeLabelTextTpl: required,
							allowBlank:false,
							name:'CERT_DATE'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'jsf.ComboDict',
							flex:1,
							meta:{
								val:'dict|dict.1008'
							},
							allowBlank:false,
							readOnly:true,
							fieldLabel:'营运状态',
							name:'STATUS'
						},{
							xtype:'textfield',
							flex:1,
							readOnly:true,
							fieldLabel:'驾驶员',
							name:'UNIT_NAME'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{	
								xtype:'combo',
								name:'COUNTY',
								flex:1,
								readOnly:true,
								fieldLabel : '区县',
				                editable:false,
				                store:Ext.getStore("sys_belong_area"),
				                displayField: 'NAME',  
				                valueField: 'CODE',
				                queryMode: 'local'
				            },{
								xtype:'jsf.ComboDict',
								meta:{
									val:'dict|dict.1011'
								},
								blankItem:true,
								flex:1,
								readOnly:true,
								fieldLabel:'燃料类型',
								name:'FUEL_TYPE'
							}]
					}]
				},{
					xtype:'container',
					//layout:'center',
					width:200,
					style:'border:1px #ddd solid;',
					margin:'0 0 0 5',
					items:[{xtype:'hidden',name:'PHOTO',itemId:'vehphoto'},{
						xtype:'image',
						itemId:'vehImage',
						width:'100%',
						height:133,
						alt:'车辆照片',
						border:true
					}]
				}]
			},{
				xtype:'container',
				border:true,
				margin:'5 0 0 0',
				layout:{
					type:'vbox',
					pack: 'start',
					align: 'stretch'
				},
				items:[{
					xtype:'fieldcontainer',
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
							xtype:'textfield',
							flex:1,
							fieldLabel:'车架号',
							readOnly:true,
							name:'CHASSIS_NUM'
						},{
							xtype:'textfield',
							flex:1,
							readOnly:true,
							fieldLabel:'发动机号',
							name:'ENGINE_NUM'
						},{
							xtype:'textfield',
							width:205,
							readOnly:true,
							name:'USE_TYPE',
							fieldLabel:'使用类别'
						}]
				}]
			},{
				xtype:'container',
				border:true,
				margin:'5 0 0 0',
				layout:{
					type:'vbox',
					pack: 'start',
					align: 'stretch'
				},
				items:[{
					xtype:'fieldcontainer',
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'textfield',
						flex:1,
						readOnly:true,
						fieldLabel:'车辆吨位',
						name:'TONNAGE'
					},{
						xtype:'textfield',
						flex:1,
						readOnly:true,
						fieldLabel:'座（卧）位',
						name:'SEAT'
					},{
						xtype:'datefield',
						width:205,
						format:'Y-m-d',
						readOnly:true,
						name:'CHECK_DATE',
						fieldLabel:'年检日期'
					}]
				}]
			},{
				 xtype:'fieldset',
        		 title: 'IC卡信息',
        		 margin:10,
        		 layout:'fit',
        		 items:[{
					xtype:'container',
					border:true,
					margin:'5 0 5 0',
					layout:{
						type:'vbox',
						pack: 'start',
						align: 'stretch'
					},
					items:[{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
								xtype:'textfield',
								flex:1,
								readOnly:true,
								fieldLabel:'物理ID',
								emptyText:'写卡时自动获取',
								name:'MAC_ID'
							},{
								xtype:'textfield',
								flex:1,
								fieldLabel:'印刷编号',
								emptyText:'请输入IC卡上的印刷号...',
								readOnly:false,
								name:'PRINT_NO'
							},{
								xtype:'component',
								width:100
							}]
					}]
				}]
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
						itemId : 'redBtn',
						iconCls : 'read_button',
						hidden: !(me.isAdd == 'read'),
						text : '读下一张',
						handler:function(){
							me.loadReadData();
						}
					},
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'save_button',
						hidden:me.isAdd == 'read',
						text : '写 卡'
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
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		if(!Ext.isEmpty(record.get('PHOTO'))){
			me.down('image').setSrc("/attach/" + record.get('PHOTO'));
		}
	},
	loadReadData:function(){
		var me = this;
		me.setLoading('正在读取IC卡...');
		var form = me.down('form').getForm();
		var r = iccardutil.readIcCard();
		if(!r){
			me.setLoading(false);
			form.reset();
			me.down('image').setSrc('');
			return false;
		}
		var params = {vehId:r[2]};
		var url = 'client/vehicle/iccard/getCardInfo';
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback(url,params,me,function(ret){
			if( ret.success ){
				form.setValues(ret.data);
				if(!Ext.isEmpty(ret.data.PHOTO)){
					me.down('image').setSrc("/attach/" + ret.data.PHOTO);
				}else{
					me.down('image').setSrc('');
				}
			}
		});
	}
});
