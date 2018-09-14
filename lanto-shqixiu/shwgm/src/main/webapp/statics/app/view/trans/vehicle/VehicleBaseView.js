Ext.define('app.view.trans.vehicle.VehicleBaseView',{
	extend:'Ext.window.Window',
	alias: 'widget.trans.vehicle.VehicleBaseView',
	itemId: 'trans.vehicle.VehicleBaseView',
	title: '查看车辆档案',
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
			items : ['->',
					{
						xtype : 'button',
						itemId : 'printBtn',
						iconCls : 'print_button',
						text : '打 印'
					},'-', {
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
		            		{code:2,name:'车辆维修记录'},
		            		{code:3,name:'车辆等级评定记录'},
		            		//{code:4,name:'车辆维修登记记录'},
		            		{code:5,name:'车辆主要总成部件更换记录'},
		            		{code:6,name:'车辆变更记录'},
		            		{code:7,name:'车辆使用记录'},
		            		{code:8,name:'车辆交通事故记录'},
		            		{code:9,name:'车辆驾驶员记录'}
		            	]
		           })
		      }]
		};
	},
	rightPanel:function(){
		var me = this;
		return {
			xtype:'form',
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
			items:[me.part0(),me.part1(),me.part2(),me.part3(),me.part4(),me.part5(),me.part6(),me.part7(),me.part8(),me.part9()]
		};
	},
	part0:function(){
		var me = this;
		return {
			xtype:'panel',
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
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							parComponent:me,
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
							parComponent:me,
							selectOnFocus : true,
							typeAhead: true,
							forceSelection: true,
							fieldLabel:'品牌'
						},{
							xtype:'cascadeCb',
							flex:1,
							_type: '3',
							name:'XM',
							editable:true,
							parComponent:me,
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
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
						width:205,
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'textfield',
							flex:1,
							fieldLabel:'档案号',
							name:'RECORD_NO'
						}]
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
			}]
		};
	},
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
			}]
		};
	},	
	part2:function(){
		var me = this;
		return {
			title:'车辆维修记录',
            xtype: 'jsf.ModelGrid',
            itemId: 'repairlist',
            region: 'center',
            rowSelType : false,
            paging:false,
            model: 'app.model.transrepair.RepairRecordModel',
            url: 'transrepair/repairrecords/list',
            columns: [
				{text:'序号',xtype:'rownumberer'},
				{fname:'REPAIR_CORP_NAME',flex:2.5},
				{fname:'REPAIR_TYPE',flex:1},
				{fname:'REPAIR_DATE',flex:2,format:'Y-m-d H:i:s'},
				//{fname:'START_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				//{fname:'END_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'REPAIR_MILE',flex:1},
				{fname:'STATION_NAME',flex:1}
			],
	            btns:[{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'font-bold icon-edit blue',
				handler:function(btn){
					var grid = btn.up('window').down('#repairlist');
					var ret = app.utils.FunUtils.singleChecks(grid);
					if(!ret.success){
						return false;
					}
					var mds = ret.result;
					var win =	Ext.create('app.view.transrepair.RepairRecordsView',{title:'<i class="' + btn.iconCls + '"></i> 维修记录查看'});
					win.show();
					win.loadData(mds);
				}
			}]	
		};
	},
	part3:function(){
		var me = this;
		return {
			title:'等级评定记录',
            xtype: 'jsf.ModelGrid',
            itemId: 'checklist',
            region: 'center',
            rowSelType : false,
            paging:false,
            model: 'app.model.VehicleCheckModel',
            url: 'trans/vehicle/vehiclebase/checkList',
            columns: [
                {text:'序号',xtype:'rownumberer'},
                {fname:'CHECK_DATE',width:100},
                {fname:'LC_RECORD',flex:2},
                {fname:'CHECK_TYPE',flex:3},
                {fname:'CHECK_DJ',flex:2},
                {fname:'VEH_DJ',flex:2},
                {fname:'CORP_NAME',flex:3},
                {fname:'DJR',flex:2},
                {fname:'DJR',width:80,text:'图片',
                	renderer:function(){
                		return '<a href="javascript:void(0);">查看图片</a>';
                	},
                	listeners:{
                		click:function(a,b,c,d,e,f,g,h){
							var items = [];
							if(!Ext.isEmpty(f.get('IMAGE1'))){
								items.push({
									xtype:'image',
									width:352,
									height:288,
									margin:5,
									src:'/attach/' + f.get('IMAGE1')
								});
							}
							if(!Ext.isEmpty(f.get('IMAGE2'))){
								items.push({
									xtype:'image',
									width:352,
									height:288,
									margin:5,
									src:'/attach/' + f.get('IMAGE2')
								});
							}
							if(!Ext.isEmpty(f.get('IMAGE3'))){
								items.push({
									xtype:'image',
									width:352,
									height:288,
									margin:5,
									src:'/attach/' + f.get('IMAGE3')
								});
							}
							var menu = Ext.create('app.ux.Menu',{
								plain: true,
								items:[{
									xtype:'panel',
									width:600,
									autoScroll:true,
									height:520,
									layout:{
										type:'vbox',
										pack: 'start'
									},
									items:items
								}]
							});
							menu.showAt([me.getX() + 100,me.getY()+ 20]);
                		}
                	}
                }
            ],
	            btns:[]	
		
		};
	},
	 part4: function(){
   		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleRegModel', 
 		   itemId:'regPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆维修登记记录',
		   url: 'trans/vehicle/vehiclebase/regList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'REG_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'WX_RQ', editor:true,width:100}, 
					{fname:'WX_LB', editor:true,width:100}, 
					{fname:'WX_NR', editor:true,width:200},
					{fname:'WX_DW', editor:true,width:200}					
				]
 	   };
    },	
     part5: function(){
   		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehiclePartChangeModel', 
 		   itemId:'partPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆主要总成部件更换记录',
		   url: 'trans/vehicle/vehiclebase/partChangeList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'PART_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'ADD_TIME', editor:true,width:100}, 
	  			    {fname:'PART_NAME', editor:true,width:250}, 
					{fname:'CORP_NAME', editor:true,width:100}, 
					{fname:'CREATED', editor:true,width:100}
				]
 	   };
    },	
   part6: function(){
   		var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.VehicleRegModel', 
 		   itemId:'changePanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '车辆变更记录 ',
		   url: 'trans/vehicle/vehiclebase/changeList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'CHANGE_ID', editor:true,hidden: true,width:100}, 
	  			    {fname:'CHANGE_DATE', editor:true,width:100}, 
					{fname:'CHANGE_REASON', editor:true,width:250}, 
					{fname:'CHANGE_ITEM', editor:true,width:150}
				]
 	   };
    },
 part7: function(){
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
		
				]
 	   };
    },
	part8: function(){
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
		
				]
 	   };
    },
	part9: function(){
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
				]
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
		
		var repairstore = me.down('#repairlist').getStore();
		repairstore.proxy.extraParams={VEHICLE_ID_eq:record.get('VEHICLE_ID')};
		repairstore.load();
		
		var checkstore = me.down('#checklist').getStore();
		checkstore.proxy.extraParams={vehId:record.get('VEHICLE_ID')};
		checkstore.load();
		
		var partstore = me.down('grid[itemId=partPanel]').getStore();
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
		
		if(!Ext.isEmpty(record.get('PHOTO'))){
			me.down('image').setSrc("/attach/" + record.get('PHOTO'));
		}
	}
});
