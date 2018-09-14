Ext.define('app.view.manage.vehicle.VehicleYearCheckEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.vehicle.VehicleYearCheckEdit',
	itemId: 'manage.vehicle.VehicleYearCheckEdit',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	width:900,
	height:500,
	modal:true,
	title:'新增年审记录',
	layout : 'fit',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items=[me.getBasePanel()],
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
						itemId : 'passBtn',
						iconCls : 'icon-ok green',
						text : '审核通过'
				},'-',{
						xtype : 'button',
						itemId : 'notPassBtn',
						iconCls : 'icon-remove red',
						text : '审核不通过'
				},'-', {
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
		form.findField('CHECK_YEAR').setValue(parseInt(new Date().getFullYear())-1);
	},
	getBasePanel : function(){
		var me=this;
		var items = [me.getRepairGrid(),me.getCheckGrid()];
		return {
		xtype : 'form',
		itemId : 'spanel',
		border:false,
		layout : {
			type:'vbox',
			pack:'start',
			align:'stretch'
		},
		bodyPadding: 5,
		items :[{xtype: 'fieldset',
	            title: '年审数据',
	            padding:5,
	            items:{
					xtype:'jsf.ModelContainer',
					model : 'app.model.vehicle.VehicleYearCheck',
					layout: {
	            		type: 'table',
	            		columns: 4
	        		},
					labelWidth: 100,
					items: [
						{fname:'CHECK_ID',hidden:true},
						{fname:'VEHICLE_ID',hidden:true},
						{xtype:'triggerfield',name:'PLATE_NUM',fieldLabel:'车牌号码',
							triggerCls: 'x-form-search-trigger',
			                editable:false,
			                beforeLabelTextTpl: required,	
			                allowBlank:false,
			                onTriggerClick: function(e) {
			                	var me = this;
			                	var repairstore = me.up('form').down('#repairgrid').getStore();
			                	var checkstore = me.up('form').down('#checkgrid').getStore();
			                	var form = me.up('form').getForm();
			                	var year=me.up('form').getValues().CHECK_YEAR;
				    			var win = Ext.create("app.view.common.TransVehicleSelWin",{
				    			     modal : true,
				    				 rowSelType : 'SINGLE', //单选
					   				 callback:function( records ){
										repairstore.proxy.extraParams={VEHICLE_ID_eq:records[0].data.VEHICLE_ID,REPAIR_DATE_lk:year};
										repairstore.load();
										checkstore.proxy.extraParams={vehId:records[0].data.VEHICLE_ID,YEAR:year};
										checkstore.load();
										var params = records[0].data;
										var repairInfo="";
										var checkInfo="";
										form.findField('PLATE_NUM').setValue(params.PLATE_NUM);
										form.findField('VEHICLE_ID').setValue(params.VEHICLE_ID);
										if(params.REPAIR_CYCLE==0){
											repairInfo='未上报维修计划！';
										}
										if(repairstore.getCount()<params.REPAIR_CYCLE){
											repairInfo='未按规定进行维修！';
										}
										if(repairInfo==''){
											form.findField('REPAIR_SUGGEST').setValue('已按规定进行维修！');
											me.up('form').down('#repairFlag').update('<i class="icon-ok bigger-150 green"></i>');
										}else{
											form.findField('REPAIR_SUGGEST').setValue(repairInfo);
											me.up('form').down('#repairFlag').update('<i class="icon-remove bigger-150 red"></i>');
										}
										var loseDate=params.CERT_DATE;
										loseDate.setFullYear(params.CERT_DATE.getFullYear()+5);
										//出租客车、客运班车、旅游包车
										if(params.VEHICLE_TYPE=='10071001' || params.VEHICLE_TYPE=='10071004' || params.VEHICLE_TYPE=='10071005'){
											//5年内车辆
											if(loseDate<new Date()){
												if(checkstore.getCount()<1){
													checkInfo='未按规定进行技术等级评定！';
												}
											}else{
												if(checkstore.getCount()<2){
													checkInfo='未按规定进行技术等级评定！';
												}	
											}
											
										}else{
											if(checkstore.getCount()<1){
												checkInfo='未按规定进行技术等级评定！';
											}
										}
										if(checkInfo==''){
											form.findField('CHECK_SUGGEST').setValue('已按要求进行技术等级评定！');
											me.up('form').down('#checkFlag').update('<i class="icon-ok bigger-150 green"></i>');
										}else{
											form.findField('CHECK_SUGGEST').setValue(checkInfo);
											me.up('form').down('#checkFlag').update('<i class="icon-remove bigger-150 red"></i>');
										}
					   				}
			    				});
			    				win.show();
			    				win.down('grid').getStore().loadPage(1);
				    		}
						},
						{fname:'CHECK_YEAR'},
						{fname:'CHECK_PERSON'},
						{xtype:'component'},
						{xtype:'textfield',name:'REPAIR_SUGGEST',fieldLabel:'维修审核建议',allowBlank:true,colspan:3,width:780},
						{
							xtype: 'container',
							itemId:'repairFlag',
							margin:'10 0 0 20',
							html:''
						},
						{xtype:'textfield',name:'CHECK_SUGGEST',fieldLabel:'评定审核建议',allowBlank:true,colspan:3,width:780},
						{
							xtype: 'container',
							itemId:'checkFlag',
							margin:'10 0 0 20',
							html:''
						},
						{fname:'CHECK_REMARK',colspan:3,width:780},
						{xtype:'component'}
					]
	            }
			},{
				xtype : 'tabpanel',
				flex:1,
				bodyStyle:'border-color: #add2ed;',
				defaults: {xtype:'panel',border:0,autoScroll:true},
				items: items
			}]
		};
	},
	getRepairGrid : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'repairgrid',
			region : 'center',
			rowSelType : 'MULTI',
			title:'维修记录',
			layout : {type:'fit',align:'stretch'},
			model: 'app.model.transrepair.RepairRecordModel',
            url: 'transrepair/repairrecords/list',
            columns: [
				{text:'序号',xtype:'rownumberer'},
				{fname:'REPAIR_CORP_NAME',width:200},
				{fname:'REPAIR_TYPE',width:100},
				{fname:'REPAIR_DATE',width:120,format:'Y-m-d H:i:s'},
				{fname:'REPAIR_MILE',width:100},
				{fname:'STATION_NAME',width:150}
			],
	            btns:[{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'font-bold icon-edit blue',
				handler:function(btn){
					var grid = btn.up('window').down('#repairgrid');
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
	getCheckGrid : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'checkgrid',
			region : 'center',
			rowSelType : 'MULTI',
			title:'等级评定记录',
			layout : {type:'fit',align:'stretch'},
			model: 'app.model.check.CheckRecordModel',
            url: 'manage/vehicle/vehiclebase/checkYearList',
            columns: [
            	{text:'序号',xtype:'rownumberer'},
				{fname:'CHECK_START_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'CHECK_END_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'CHECK_TYPE',flex:1},
				{fname:'VEHICLE_LEVEL',flex:1},
				{fname:'CHECK_RESULT',flex:1},
				{fname:'CHECK_PRESON',flex:1},
				{text:'照片',flex:1,align:'center',
                	renderer:function(v){
                		if(v==""){
                			return '无照片';
                		}else{
                			return '<a href="javascript:void(0);">查看照片</a>';
                		}
                	},
                	listeners:{
                		click:function(a,b,c,d,e,f){
							var params = {CHECK_ID : f.data.CHECK_ID};
							var win = Ext.create('app.view.check.CheckPhotoList');
							win.loadData(f,params);
                		}
                	}
                }
            ],
			btns : []
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
	}
});
