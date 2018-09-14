Ext.define('app.view.trans.vehicle.VehicleBaseEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.trans.vehicle.VehicleBaseEdit',
	itemId: 'trans.vehicle.VehicleBaseEdit',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'border',
	width : 900,
	height:550,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [me.leftMenu(),me.rightPanel()],
		me.dockedItems = [{
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			}];
		me.callParent(arguments);
	},
	leftMenu:function(){
		var me = this;
		return {
			xtype:'panel',
			region : 'west',
			listeners:{
				afterrender:function(){
					var view = me.down('#menudataview');
					view.getSelectionModel().select(0);
				}
			},
			split : true,
			collapsible:true,
			title:'车辆档案菜单列表',
			header:{
				hidden:true
			},
			border:false,
			width:200,
			cls: 'menu-selection-view',
			layout:'fit',
			items:[{
		            xtype: 'dataview',
		            itemId: 'menudataview',
		            itemSelector: 'li',
		            margin:5,
		            listeners:{
		            	select :function(view,record,e){
		            		me.down('#cardPanel').getLayout().setActiveItem(record.get('code'));
		            	},
		            	beforecontainerclick:function(){return false;}
		            },
		            tpl:['<div class="fl user-left">',
							'<ul class="user-menu">',
								'<tpl for=".">',
									'<li><a href="javascript:void(0);" class="user-menu-a" data-qtip="{name}">{name}</a><span class="circle"><span>•</span></span></li>',
								'</tpl>',
							'</ul>',
						'</div>',
						'<div class="fl user-right"></div>'],
		            store:Ext.create('Ext.data.Store',{
		            	fields: ['code', 'name','icon'],
		            	data:[{code:0,name:'车辆基本情况'},
		            		{code:1,name:'车辆技术参数'},
		            		//{code:2,name:'车辆维修登记表'},
		            		//{code:3,name:'车辆主要总成部件更换登记'},
		            		{code:4,name:'车辆变更登记'},
		            		{code:5,name:'车辆使用登记'},
		            		{code:6,name:'车辆交通事故登记'},
		            		{code:7,name:'车辆驾驶员登记'}
		            	]
		           })
		      }]
		};
	},
	rightPanel:function(){
		var me = this;
		return {
			xtype:'container',
			region : 'center',
			itemId:'cardPanel',
			layout:'card',
			fieldDefaults: {
		        msgTarget: 'side',
		        labelAlign:'right',
		        labelWidth: 83
		        //labelStyle: 'font-weight:bold'
		    },
			border:false,
			items:[me.part0(),me.part1(),me.part2(),me.part3(),me.part4(),me.part5(),me.part6(),me.part7()]
		};
	},
	part0:function(){
		var me = this;
		return {
			xtype:'form',
			itemId:'baseInfoPanel',
			title:'车辆基本情况',
			bodyPadding:'10 5 0 0',
			layout:{
				type:'vbox',
				pack: 'start',
        		align: 'stretch'
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
						items:[{xtype:'hidden',name:'VEHICLE_ID'},{
							xtype:'textfield',
							flex:1,
							fieldLabel:'车牌号码',
							vtype:'License',
							allowBlank:false,
							beforeLabelTextTpl: required,
							name:'PLATE_NUM'
						},{
							xtype:'jsf.ComboDict',
							flex:1,
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
							xtype:'cascadeCb',
							_next:'BRAND',
							PID:'0',
							_type:'1',
							editable:true,
							name:'VENDER',
							parComponent:me,
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							forceSelection: true,
							flex:1,
							fieldLabel:'厂家'
							
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'cascadeCb',
							flex:1,
							_type: '2',
							_next:'XM',
							name:'BRAND',
							editable:true,
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							parComponent:me,
							forceSelection: true,
							fieldLabel:'品牌'
						},{
							xtype:'cascadeCb',
							flex:1,
							_type: '3',
							name:'XM',
							editable:true,
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							parComponent:me,
							forceSelection: true,
							fieldLabel:'车型'
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
							fieldLabel:'道路运输证号',
							name:'LOAD_CERT_NUM'
						},{
							xtype:'datefield',
							flex:1,
							format:'Y-m-d',
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
							fieldLabel:'营运状态',
							name:'STATUS'
						},{
							xtype:'textfield',
							flex:1,
							fieldLabel:'驾驶员',
							name:'UNIT_NAME'
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
							xtype:'combo',
							name:'COUNTY',
							flex:1,
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
							fieldLabel:'燃料类型',
							name:'FUEL_TYPE'
						},{
						xtype:'fieldcontainer',
						margin:'0 0 0 5',
						width:200,
						layout:{
							type:'hbox',
							pack: 'start'
						},
						layout:{
							type:'hbox',
							pack: 'end'
						},
						items:[me.getImageBtn()]
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
							name:'CHASSIS_NUM'
						},{
							xtype:'textfield',
							flex:1,
							fieldLabel:'发动机号',
							name:'ENGINE_NUM'
						},{
							xtype:'textfield',
							width:205,
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
						fieldLabel:'车辆吨位',
						name:'TONNAGE'
					},{
						xtype:'textfield',
						flex:1,
						fieldLabel:'座（卧）位',
						name:'SEAT'
					},{
						xtype:'datefield',
						width:205,
						format:'Y-m-d',
						name:'CHECK_DATE',
						fieldLabel:'年检日期'
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
						xtype:'numberfield',
						flex:1,
						fieldLabel:'建档里程',
						name:'FIRST_MILEAGE'
					},{
						xtype:'datefield',
						flex:1,
						fieldLabel:'上次维修时间',
						format:'Y-m-d',
						name:'LAST_REPAIR_DATE'
					},{
						xtype:'datefield',
						width:205,
						format:'Y-m-d',
						name:'LAST_CHECK_DATE',
						fieldLabel:'上次评定时间'
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
                        xtype:'datefield',
						flex:1,
						format:'Y-m-d',
						name:'REG_DATE',
						fieldLabel:'注册日期'
					},{
                        xtype:'displayfield',
						width:440
					}]
				}]
			}],
		 tbar:['->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 iconCls: 'save_button',
	  				 itemId : 'saveBtn'
			 }]
		};
	},
	/*
	part1:function(){
		return {
			xtype:'panel',
			title:'车辆技术参数'
		};
	},
	*/
part1:function(){
		var me = this;
		return {
			xtype:'form',
			itemId:'paramPanel',
			title:'车辆技术参数',
			bodyPadding:'10 5 0 0',
			layout:{
				type:'vbox',
				pack: 'start',
        		align: 'stretch'
			},
			items:[
              {
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
					defaults:{labelWidth: 100},
					items:[{
							xtype:'hiddenfield',
							//flex:1,
							//fieldLabel:'出厂日期',
							//format:'Y-m-d',
							name:'PARAM_ID'
						},
						{
							xtype:'datefield',
							flex:1,
							fieldLabel:'出厂日期',
							beforeLabelTextTpl: required,
							format:'Y-m-d',
							name:'PRODUCTION_DATE'
						},{
							xtype:'textfield',
							flex:1,
							fieldLabel:'出厂产地',
							name:'PRODUCTION_PLACE'
						},{
							xtype:'textfield',
							flex:1,
							name:'BRAND_MODEL',
							fieldLabel:'底盘厂牌型号'
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
					defaults:{labelWidth: 100},
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'客车类型等级',
						name:'BUS_LEVEL'
					},{
						xtype:'textfield',
						flex:1,
						fieldLabel:'车辆外廓尺寸',
						name:'VEHICLE_DIMENSIONS'
					},{
						xtype:'numberfield',
						flex:1,
						name:'TOTAL_MASS',
						fieldLabel:'总质量'
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
					defaults:{labelWidth: 100},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'座/铺位排列',
						name:'SEAT_ARRANGEMENT'
					},{
						xtype:'numberfield',
						flex:1,
						fieldLabel:'核定乘员数',
						name:'OCCUPANT_NUMBER'
					},{
						xtype:'numberfield',
						emptyText:'(kg)',
						flex:1,
						name:'TRACTION_MASS',
						fieldLabel:'核定牵引总质量'
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
					defaults:{labelWidth: 100},
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'车轴数/驱动轴数',
						name:'AXLE_NUMBER'
					},{
						xtype:'textfield',
						flex:1,
						fieldLabel:'发动机厂牌型号',
						name:'ENGINE_BRAND'
					},{
						xtype:'numberfield',
						emptyText:'(kW)',
						flex:1,
						name:'ENGINE_POWER',
						fieldLabel:'发动机功率'
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
					defaults:{labelWidth: 100},
					items:[{
						xtype:'numberfield',
						emptyText:'(L)',
						flex:1,
						fieldLabel:'发动机排量',
						name:'ENGINE_DISPLACEMENT'
					},{
						xtype:'textfield',
						flex:1,
						emptyText:'(国Ⅱ/国Ⅲ)',
						fieldLabel:'排放标准',
						name:'EMISSION_STANDARD'
					},{
						xtype:'textfield',
						flex:1,
						name:'DRIVE_TYPE',
						fieldLabel:'驱动形式'
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
					defaults:{labelWidth: 100},
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'numberfield',
						flex:1,
						fieldLabel:'轮胎数/规格',
						name:'TYRE_NUMBER'
					},{
						xtype:'textfield',
						flex:1,
						fieldLabel:'前照灯制式',
						name:'HEADLIGHT_TYPE'
					},{
						xtype:'textfield',
						flex:1,
						name:'TRANSMISSION_TYPE',
						fieldLabel:'变速器形式'
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
					defaults:{labelWidth: 100},
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'缓速器',
						name:'RETARDER'
					},{
						xtype:'textfield',
						flex:1,
						fieldLabel:'转向器',
						name:'STEERING_GEAR'
					},{
						xtype:'textfield',
						flex:1,
						name:'BRAKE_TYPE',
						fieldLabel:'行车制动形式'
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
					defaults:{labelWidth: 100},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'悬挂形式',
						name:'SUSPENSION_TYPE'
					}]
				},{
					xtype:'fieldcontainer',
					layout:{
						type:'hbox',
						pack: 'start'
					},
					defaults:{labelWidth: 100},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'其他配置',
						name:'QTPZ'
					}]
				}]
			}],
		 tbar:['->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 iconCls: 'save_button',
	  				 itemId : 'save_paramBtn'
			 }]
		};
	},	
   part2: function(){
   		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleRegModel', 
 		   itemId:'regPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆维修登记表',
		   url: 'trans/vehicle/vehiclebase/regList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'REG_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'WX_RQ', editor:true,width:100}, 
					{fname:'WX_LB', editor:true,width:100}, 
					{fname:'WX_NR', editor:true,width:200},
					{fname:'WX_DW', editor:true,width:200}					
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.VehicleRegModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=regPanel]').getStore();
		                var editing = win.down('grid[itemId=regPanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=regPanel]');
		                me.doDelete(btn,grid,'REG_ID','reg');
		               /* var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'PART_CODE',
		                    direction: 'ASC'
		                });*/
	                 }
			 },'->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 itemName:'reg',
	  				 iconCls: 'save_button',
	  				 itemId : 'save_item'
			 }]
 	   };
    },	
     part3: function(){
   		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehiclePartChangeModel', 
 		   itemId:'partChangePanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆主要总成部件更换登记表',
		   url: 'trans/vehicle/vehiclebase/partChangeList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'PART_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'CHANGE_DATE', editor:true,width:100}, 
	  			    {fname:'PART_NAME', editor:true,width:250}, 
					{fname:'REPAIR_UNIT', editor:true,width:100}, 
					{fname:'PART_REGISTRANT', editor:true,width:100}
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.VehiclePartChangeModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=partChangePanel]').getStore();
		                var editing = win.down('grid[itemId=partChangePanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=partChangePanel]');
		                me.doDelete(btn,grid,'PART_ID','part_change');
		               /* var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'PART_CODE',
		                    direction: 'ASC'
		                });*/
	                 }
			 },'->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 itemName:'partChange',
	  				 iconCls: 'save_button',
	  				 itemId : 'save_item'
			 }]
 	   };
    },	
   part4: function(){
   		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleRegModel', 
 		   itemId:'changePanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆变更登记表 ',
		   url: 'trans/vehicle/vehiclebase/changeList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'CHANGE_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'CHANGE_DATE', editor:true,width:100}, 
					{fname:'CHANGE_REASON', editor:true,width:250}, 
					{fname:'CHANGE_ITEM', editor:true,width:150}
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.VehicleRegModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=changePanel]').getStore();
		                var editing = win.down('grid[itemId=changePanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=changePanel]');
		                me.doDelete(btn,grid,'CHANGE_ID','change');
		               /* var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'PART_CODE',
		                    direction: 'ASC'
		                });*/
	                 }
			 },'->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 iconCls: 'save_button',
	  				 itemName:'change',
	  				 itemId : 'save_item'
			 }]
 	   };
    },
    /*
	part4:function(){
		return {
			xtype:'panel',
			title:'车辆使用登记'
		};
	},*/
 part5: function(){
 	   var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleRegModel', 
 		   itemId:'usesPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆使用登记 ',
		   url: 'trans/vehicle/vehiclebase/usesList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'USES_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'USES_TIME', editor:true,width:100}, 
					{fname:'MILEAGE', editor:true,width:80}, 
					{fname:'INTERVAL_MILEAGE', editor:true,width:80},
					{fname:'FUEL_CONSUMPTION', editor:true,width:80},	
					{fname:'QUOTA', editor:true,width:50},
					{fname:'SURPLUS', editor:true,width:50},
					{fname:'DEFICIT', editor:true,width:50},
					{fname:'USE_UNIT', editor:true,width:100},					
					{fname:'DRIVER_NAME', editor:true,width:100}	
		
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.VehicleRegModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=usesPanel]').getStore();
		                var editing = win.down('grid[itemId=usesPanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=usesPanel]');
		                me.doDelete(btn,grid,'USES_ID','uses');
		                /*var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'PART_CODE',
		                    direction: 'ASC'
		                });*/
	                 }
			 },'->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 itemName:'uses',
	  				 iconCls: 'save_button',
	  				 itemId : 'save_item'
			 }]
 	   };
    },
	part6: function(){
		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleAccidentModel', 
 		   itemId:'accidentPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆交通事故登记 ',
		   url: 'trans/vehicle/vehiclebase/accidentList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'ACCIDENT_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'ACCIDENT_DATE', editor:true,width:100}, 
					{fname:'ACCIDENT_ADDR', editor:true,width:200}, 
					{fname:'ACCIDENT_NATURE', editor:true,width:100},
					{fname:'ACCIDENT_RESPONSIBILITY', editor:true,width:100},	
					{fname:'ACCIDENT_DESCRIPTION', editor:true,width:200},
					{fname:'ECONOMIC_LOSSES', editor:true,width:50},
					{fname:'ACCIDENT_REGISTRANT', editor:true,width:50}
		
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.VehicleAccidentModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=accidentPanel]').getStore();
		                var editing = win.down('grid[itemId=accidentPanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=accidentPanel]');
		                me.doDelete(btn,grid,'ACCIDENT_ID','accident');
		               /* var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'ACCIDENT_ID',
		                    direction: 'ASC'
		                });*/
	                 }
			 },'->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 itemName:'accident',
	  				 iconCls: 'save_button',
	  				 itemId : 'save_item'
			 }]
 	   };
    },
	part7: function(){
		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleDriverModel', 
 		   itemId:'driverPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆驾驶员登记',
		   url: 'trans/vehicle/vehiclebase/driverList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'DRIVER_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'DRIVER_NAME', editor:true,width:100}, 
					{fname:'ID_NUM', editor:true,width:200}, 
					{fname:'LICENCE_TYPE', editor:true,width:70},
					{fname:'LICENCE_NUM', editor:true,width:200},					
					{fname:'CERTIFICATE_NUM', editor:true,width:200},					
					{fname:'CERTIFICATE_TYPE', editor:true,width:50},					
					{fname:'ENTRY_TIME', editor:true,width:100},					
					{fname:'DIMISSION_TIME', editor:true,width:100},					
					{fname:'SAFE_MILEAGE', editor:true,width:50},					
					{fname:'ILLEGAL_RECORD', editor:true,width:200},					
					{fname:'ACCIDENT_RECORD', editor:true,width:200},					
					{fname:'OTHER_COMPLAINTS', editor:true,width:200}					
				],
		 btns:[
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.VehicleDriverModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=driverPanel]').getStore();
		                var editing = win.down('grid[itemId=driverPanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'deleteBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=driverPanel]');
		                me.doDelete(btn,grid,'DRIVER_ID','driver');
		                /*store.sort({
		                    property: 'DRIVER_ID',
		                    direction: 'ASC'
		                });*/
	                 }
			 },'->',
			      {
	  				 xtype : 'button',
	  				 text : '保存',
	  				 itemName:'driver',
	  				 iconCls: 'save_button',
	  				 itemId : 'save_item'
			 }]
 	   };
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
		//加载技术参数数据
		var url = 'trans/vehicle/vehiclebase/vehicleParam';
		var  data = {vehicle_id:record.get('VEHICLE_ID')};
		var form = me.down('#paramPanel');
		app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,data,form,'加载中...',function(ret){
			if( ret.success ){
				var da = Ext.Date.parse(ret.data.PRODUCTION_DATE, "Y-m-d H:i:s");
				ret.data.PRODUCTION_DATE = da;
	    		form.getForm().setValues(ret.data);
			}
		});
		
		var partstore = me.down('grid[itemId=partChangePanel]').getStore();
		partstore.proxy.extraParams = {vehicle_id:record.get('VEHICLE_ID')};
		console.log(partstore.proxy.extraParams);
		partstore.loadPage(1);
		
		var regstore = me.down('grid[itemId=regPanel]').getStore();
		regstore.proxy.extraParams = {vehicle_id:record.get('VEHICLE_ID')};
		console.log(regstore.proxy.extraParams);
		regstore.loadPage(1);	
		
		var changestore = me.down('grid[itemId=changePanel]').getStore();
		changestore.proxy.extraParams = {vehicle_id:record.get('VEHICLE_ID')};
		changestore.loadPage(1);
		
		var usesstore = me.down('grid[itemId=usesPanel]').getStore();
		usesstore.proxy.extraParams = {vehicle_id:record.get('VEHICLE_ID')};
		usesstore.loadPage(1);
		
		var accidentstore = me.down('grid[itemId=accidentPanel]').getStore();
		accidentstore.proxy.extraParams = {vehicle_id:record.get('VEHICLE_ID')};
		accidentstore.loadPage(1);
		
		var driverstore = me.down('grid[itemId=driverPanel]').getStore();
		driverstore.proxy.extraParams = {vehicle_id:record.get('VEHICLE_ID')};
		driverstore.loadPage(1);
	},
	getImageBtn:function(){
		var me = this;
		return {
			xtype:'pluploadbutton',
	        text: '添加照片...',
	        margin:'0 10 0 10',
	        flex:1,
	        iconCls: 'icon-picture bigger-120 blue',
	        pluploadConfig:{       	
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : 'newpartid',
				url :  '../trans/vehicle/vehiclebase/uploadImage',
				flash_swf_url :  'js/upload/Moxie.swf',
				silverlight_xap_url : 'js/upload/Moxie.xap',
//								container: document.getElementById('newpart_area'), // ... or DOM Element itself
				multiple_queues : false,
				multi_selection:false,
				file_data_name:'upload',
				filters : {
					mime_types : [ // 只允许上传图片文件和rar压缩文件
					{
						title : "图片文件",
						extensions : "jpg,gif,png"
					} ],
					max_file_size : '5mb', //最大只能上传100kb的文件
					prevent_duplicates : false
				// 不允许队列中存在重复文件
				},
				resize: {
				  width: 600,//压缩图片
				  quality: 80,//质量80
				  preserve_headers: false
				},
				init: {
					PostInit: function(up) {
						//console.log(up);
					},
					// 绑定文件添加进队列事件
					FilesAdded : function(up, files) {
						//console.log(files);
						var form = me.down('form');
						var file = files[0];
						me.previewImage(file, function(imgsrc) {
							form.down('image').setSrc(imgsrc);
							up.start();
						});
					},
					// 某个文件上传过程中不断触发
					UploadProgress : function(up, file) {
						//console.log(file);		
						if(file.percent < 100){
						//	me.down('progressbar[itemId=oldprogress]').updateProgress(file.percent,"上传中..." + file.percent + '％ ');
							me.down('pluploadbutton').setText('上传中...' + file.percent + '％ ');
						}else{
							me.down('pluploadbutton').setText('上传完毕');
							//me.down('progressbar[itemId=oldprogress]').updateProgress(file.percent,"上传完毕" + file.percent + '％ ');
						}
						
						//$("#file-list").find('a[data-id=' + file.id + ']').find('.atttext').html(file.percent + ' ％');
					},
					// 当某个文件上传完成后触发
					FileUploaded : function(up, file, responseObject) {
						var form = me.down('form');
						var data = eval('(' + responseObject.response + ')');
						if(data.success){
							form.getForm().findField('PHOTO').setValue(data.data);
						}else{
							Ext.Msg.alert('系统提示',"图片上传失败!");
						}
						me.down('pluploadbutton').setText('添加照片... ');
					},
					// 当上传队列的状态发生改变时触发
					StateChanged : function(up) {
						//console.log(up.state);
					},
					Error: function(up, err) {
						//console.log(err);
						if(err.code == -600){
							Ext.Msg.alert('系统提示',"文件大小不能超过5MB");
						}else{
							Ext.Msg.alert('系统提示',err.message);
						}
					}
				}
	        }
		};
	},
	previewImage:function(file, callback) {// file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
		var me = this;
		if (!file || !/image\//.test(file.type))
			return; // 确保文件是图片
		if (file.type == 'image/gif') {// gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function() {
				callback(fr.result);
				fr.destroy();
				fr = null;
			}
			fr.readAsDataURL(file.getSource());
		} else {
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				preloader.downsize(600);// 先压缩一下要预览的图片,宽300，高300
				var imgsrc = preloader.type == 'image/jpeg' ? preloader
						.getAsDataURL('image/jpeg', 60) : preloader.getAsDataURL(); // 得到图片src,实质为一个base64编码的数据
				callback && callback(imgsrc); // callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load(file.getSource());
		}
	},
	doDelete : function(btn,grid,pid,tableName){
		var me = this;
		var vid = me.down('form').getForm().findField('VEHICLE_ID').getValue();
		//var store = win.down('grid[itemId=baseInfoPanel]').getStore;
		//var vid = store
		//var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = [];
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			ids.push(record.get(pid));
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'trans/vehicle/vehiclebase/deleteVehicleItems';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{vehicleId:vid,pid:pid,tableName:tableName,ids:ids.join(',')},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	}
});
