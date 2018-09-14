Ext.define('app.view.manage.HomePageMngPanel',{
	extend : 'Ext.form.Panel',
	alias : 'widget.manage.HomePageMngPanel',
	itemId : 'trans.HomePageMngPanel',
	border:false,
	autoScroll:true,
//	layout:{
//		type:'vbox',
//		pack:'start',
//        align:'stretch'
//	},
	layout:'fit',
	padding:8,
	initComponent: function() {
		var me = this;
		me.items = [{
	    	xtype:'container',
	    	flex:1,
	    	margin:'0 0 4 0',
	    	minHeight:220,
	   // 	style:'border: #009bd8 1px solid;border-right:none;',
	    	layout:{
				type:'hbox',
				pack:'start',
		        align:'stretch'
			},
			items:[{
				xtype:'container',
				flex:1,
				itemId:'co_10171001',
				padding:'0 0 6 0',
				style:'border: 1px solid rgb(20, 127, 206);',
				layout:{
					type:'vbox',
					pack:'start',
			        align:'stretch'
				},
				items:[{
						xtype:'container',
						style:'background: rgb(25, 140, 225) url(statics/images/home-clwf-bg.png) no-repeat;color:#fff;',
						height:41,
						layout:{
							type:'hbox',
							pack:'start'
						},
						items:[{
							xtype:'component',
						//	html:'已逾期',
							height:41,
							flex:1,
							style:'padding:8px;color:#fff;text-align:center;'
						},{
							xtype:'component',
							html:'<i class="icon-refresh bigger-120" data-qtip="刷新" style="padding:0px 3px;"></i>',
							cls:'home_ref_btn',
							listeners:{
								 click: {
						            element: 'el', //bind to the underlying el property on the panel
						            fn: function(){
						            	me.loadData('10171001');
						            }
						        }
							}
						},{
							xtype:'component',
							html:'<span data-qtip="查看详情">查看详情</span>',
							cls:'home_detail_btn',
							listeners:{
								 click: {
						            element: 'el', //bind to the underlying el property on the panel
						            fn: function(){
						            	me.toDetail('repair',null);
						            }
						        }
							}
						}]
					},{
						xtype:'container',
						flex:1,
						layout:'fit',
						items:[{
							xtype:'dataview',
							itemId:'repair1',
							selectedItemCls: 'current',
							emptyText:'<div style="margin-top:50px;text-align:center;color:#9e9e9e;">暂无车辆维护逾期报警车辆</div>',
							deferEmptyText:false,
							listeners:{
								itemclick:function(view,record){
									me.toDetail('repair',record.data.PLATE_NUM);
								}
							},
							store:Ext.create('Ext.data.Store',{
								fields:[
						    		{name:'PLATE_NUM' , type:'string'},
						    		{name:'CORP_NAME' , type:'string'},
						    		{name:'PLATE_COLOR' , type:'string'},
						    		{name:'MONTH_DIFF' , type:'int'},
						    		{name:'WARN_DATE' , type:'date' ,dateFormat:'Y-m-d H:i:s'}
						    	]
							}),
							itemSelector: 'li',
							tpl:['<div class="home_faq" style="display: block;">',
				                    '<ul>',
							    		'<tpl for=".">',
				                        	'<li data-qtip="{PLATE_NUM}-{PLATE_COLOR:this.formatColor} 》 {CORP_NAME}">',
					                        	'<a href="javascript:void(0);" title="{PLATE_NUM}">{PLATE_NUM}-{PLATE_COLOR:this.formatColor}<i class="icon-double-angle-right" style="margin-left:-10px;"></i> {CORP_NAME}</a>',
					                        	'<span>{MONTH_DIFF:this.formatStatus}</span>',
				                        	'</li>',
				                    	'</tpl>',
							    	'</ul>',
				                '</div>',{
				                	formatColor:function(v){
				                		return funutils.renderer(v);
				                	},
				                	formatStatus:function(v){
				                		if(v == 1){
				                			return '即将逾期 <img src="statics/images/home-jjyq.png" style="float: right;"/>';
				                		}else{
				                			return '已逾期 <img src="statics/images/home-yyq.png" style="float: right;"/>';
				                		}
				                	},
				                	formatDate:function(v){
				                		return Ext.util.Format.date(v,'Y-m-d');
				                	}
				                }]
						}]
				}]
			},{
				xtype:'container',
				flex:1,
				itemId:'co_10201001',
				margin:'0 0 0 5',
				padding:'0 0 6 0',
				style:'border: 1px solid rgb(20, 127, 206);',
				layout:{
					type:'vbox',
					pack:'start',
			        align:'stretch'
				},
				items:[{
						xtype:'container',
						height:41,
						style:'background: rgb(25, 140, 225) url(statics/images/home-djpd-bg.png) no-repeat;color:#fff;',
						layout:{
							type:'hbox',
							pack:'start'
						},
						items:[{
							xtype:'component',
					//		html:'即将逾期',
							height:41,
							flex:1,
							style:'padding:8px;color:#fff;text-align:center;'
						},{
							xtype:'component',
							html:'<i class="icon-refresh bigger-120" data-qtip="刷新" style="padding:0px 3px;"></i>',
							cls:'home_ref_btn',
							listeners:{
								 click: {
						            element: 'el', //bind to the underlying el property on the panel
						            fn: function(){
						            	me.loadData('10201001');
						            }
						        }
							}
						},{
							xtype:'component',
							html:'<span data-qtip="查看详情">查看详情</span>',
							cls:'home_detail_btn',
							listeners:{
								 click: {
						            element: 'el', //bind to the underlying el property on the panel
						            fn: function(){
						            	me.toDetail('check',null);
						            }
						        }
							}
						}]
					},{
						xtype:'container',
						flex:1,
						layout:'fit',
						items:[{
							xtype:'dataview',
							itemId:'check1',
							emptyText:'<div style="margin-top:50px;text-align:center;color:#9e9e9e;">暂无等级评写逾期报警车辆</div>',
							deferEmptyText:false,
							selectedItemCls: 'current',
							listeners:{
								itemclick:function(view,record){
									me.toDetail('check',record.data.PLATE_NUM);
								}
							},
							store:Ext.create('Ext.data.Store',{
								fields:[
						    		{name:'PLATE_NUM' , type:'string'},
						    		{name:'PLATE_COLOR' , type:'string'},
						    		{name:'CORP_NAME' , type:'string'},
						    		{name:'CHECK_ZQ-CHECK_MONTH' , type:'int'},
						    		{name:'WARN_DATE' , type:'date' ,dateFormat:'Y-m-d H:i:s'}
						    	]
							}),
							itemSelector: 'li',
							tpl:['<div class="home_faq homeorange" style="display: block;">',
				                    '<ul>',
							    		'<tpl for=".">',
				                        	'<li data-qtip="{PLATE_NUM}-{PLATE_COLOR:this.formatColor} 》 {CORP_NAME}">',
					                        	'<a href="javascript:void(0);" title="{name}">{PLATE_NUM}-{PLATE_COLOR:this.formatColor}<i class="icon-double-angle-right" style="margin-left:-10px;"></i> {CORP_NAME}</a>',
					                        	'<span>{CHECK_ZQ-CHECK_MONTH:this.formatStatus}</span>',
				                        	'</li>',
				                    	'</tpl>',
							    	'</ul>',
				                '</div>',{
				                	formatColor:function(v){
				                		return funutils.renderer(v);
				                	},
				                	formatStatus:function(v){
				                		if(v == 1){
				                			return '即将逾期 <img src="statics/images/home-jjyq.png" style="float: right;"/>';
				                		}else{
				                			return '已逾期 <img src="statics/images/home-yyq.png" style="float: right;"/>';
				                		}
				                	},
				                	formatDate:function(v){
				                		return Ext.util.Format.date(v,'Y-m-d');
				                	}
				                }]
						}]
				}]
			},{
				xtype:'container',
				flex:1,
				itemId:'co_10171003',
				margin:'0 0 0 5',
				padding:'0 0 6 0',
				style:'border: 1px solid rgb(20, 127, 206);',
				layout:{
					type:'vbox',
					pack:'start',
			        align:'stretch'
				},
				items:[{
						xtype:'container',
						height:41,
						style:'background: rgb(28, 148, 237) url(statics/images/home-wfjh-bg.png) no-repeat;color:#fff;',
						layout:{
							type:'hbox',
							pack:'start'
						},
						items:[{
							xtype:'component',
						//	html:'未提交维护计划',
							height:41,
							flex:1,
							style:'padding:8px;color:#fff;text-align:center;'
						},{
							xtype:'component',
							html:'<i class="icon-refresh bigger-120" data-qtip="刷新" style="padding:0px 3px;"></i>',
							cls:'home_ref_btn',
							listeners:{
								 click: {
						            element: 'el', //bind to the underlying el property on the panel
						            fn: function(){
						            	me.loadData('10171003');
						            }
						        }
							}
						},{
							xtype:'component',
							html:'<span data-qtip="查看详情">查看详情</span>',
							cls:'home_detail_btn',
							listeners:{
								 click: {
						            element: 'el', //bind to the underlying el property on the panel
						            fn: function(){
						            	me.toDetail('plan',null);
						            }
						        }
							}
						}]
					},{
						xtype:'container',
						flex:1,
						layout:'fit',
						items:[{
							xtype:'dataview',
							itemId:'repair3',
							selectedItemCls: 'current',
							emptyText:'<div style="margin-top:50px;text-align:center;color:#9e9e9e;">暂无未提交维护计划车辆</div>',
							deferEmptyText:false,
							listeners:{
								itemclick:function(view,record){
									me.toDetail('plan',record.data.PLATE_NUM);
								}
							},
							store:Ext.create('Ext.data.Store',{
								fields:[
						    		{name:'PLATE_NUM' , type:'string'},
						    		{name:'PLATE_COLOR' , type:'string'},
						    		{name:'CORP_NAME' , type:'string'},
						    		{name:'WARN_DATE' , type:'date' ,dateFormat:'Y-m-d H:i:s'}
						    	]
							}),
							itemSelector: 'li',
							tpl:['<div class="home_faq" style="display: block;">',
				                    '<ul>',
							    		'<tpl for=".">',
				                        	'<li data-qtip="{PLATE_NUM}-{PLATE_COLOR:this.formatColor} 》 {CORP_NAME}">',
					                        	'<a href="javascript:void(0);" title="{name}">{PLATE_NUM}-{PLATE_COLOR:this.formatColor}<i class="icon-double-angle-right" style="margin-left:-10px;"></i> {CORP_NAME}</a>',
					                        	'<span style="color:#607d8b;">未提交维护计划</span>',
				                        	'</li>',
				                    	'</tpl>',
							    	'</ul>',
				                '</div>',{
				                	formatColor:function(v){
				                		return funutils.renderer(v);
				                	},
				                	formatDate:function(v){
				                		return Ext.util.Format.date(v,'Y-m-d');
				                	}
				                }]
						}]
				}]
			}]
	    }]
		me.callParent(arguments);
	},
	listeners:{
		afterrender:function(me){
			me.loadData('all');
		}
	},
	loadData:function(type){
		var me = this;
		var url = 'manage/sys/common/getHomeInfo';
		var loding = me;
		if(type != 'all'){
			loding = me.down('#co_' + type);
		}
		app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,{type:type},loding,"加载中...",function(ret){
			if( ret.success ){
				if(type == '10171001' || type == 'all'){
					var store1 = me.down('#repair1').getStore();
					store1.removeAll();
					store1.add(ret.data.repair1);
				}
				if(type == '10171003' || type == 'all'){
					var store3 = me.down('#repair3').getStore();
					store3.removeAll();
					store3.add(ret.data.repair3);
				}
				if(type == '10201001' || type == 'all'){
					var st1 = me.down('#check1').getStore();
					st1.removeAll();
					st1.add(ret.data.check1);
				}
			}
		});
	},
	toDetail:function(tag,plateNum){
		var tabPanel = Ext.ComponentQuery.query('panel[itemId=maintabs]')[0];
		var ctrlStr = 'app.controller.manage.vehicle.VehicleWarnCtrl';
		var itemStr = 'manage.vehicle.VehicleWarnMngPanel';
		var text = '车辆维护逾期报警';
		var iconStr = 'icon-shield';
		if(tag == 'plan'){
			ctrlStr = 'app.controller.manage.vehicle.VehiclePlanCtrl';
			itemStr = 'manage.vehicle.VehiclePlanMngPanel';
			text = '车辆维护计划';
			iconStr = 'icon-tags';
		}else if(tag == 'check'){
			ctrlStr = 'app.controller.manage.vehicle.VehicleCheckWarnCtrl';
			itemStr = 'manage.vehicle.VehicleCheckWarnMngPanel';
			text = '等级评定逾期报警';
			iconStr = 'icon-shield';
		}
		var ctrl = app.app.getController(ctrlStr);
		var tp = tabPanel.getComponent(itemStr);
		if(tabPanel.items.getCount()>=10 && Ext.isEmpty(tp)){
			Ext.Msg.alert('提示','您当前打开的标签页数量过多，请关闭不需要使用<br>的标签页（页面过多会影响系统速度）！');
        	return false;
        }
		if (Ext.isEmpty(tp)) {
			tp = Ext.create('app.view.' + itemStr,{plateNum:plateNum,itemId:itemStr, title:'<i class="' + iconStr + ' bigger-120"></i> ' + text, closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
			tabPanel.add(tp);
		}else{
			var st=tp.down('grid').getStore();
			tp.plateNum = plateNum;
			tp.loadData(plateNum);
		}
		tabPanel.setActiveTab(tp); 
	}
});

			