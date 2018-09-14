Ext.define('app.view.manage.corp.TcCorpAllMap',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TcCorpAllMap',
	itemId: 'manage.corp.TcCorpAllMap',
	title: '企业电子地图',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 1000,
	height:600,
	maximizable : true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'treepanel',
			autoScroll:true,
			itemId:'treeitem',
			split : true,
			collapsible:true,
			region : 'west',
			title:'企业树',
			width:190,
			store: {}
		},{
			region : 'center',
			xtype:'panel',
			itemId:'mapPanel',
			autoScroll:true,
			html:''
			
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : [{xtype:'form',itemId:'map_form',
							layout : {
								pack : 'start',
								type : 'hbox'
							},
							border:0,
							frame:true,
							defaults: {margin:'0 2 0 2'},
							items:[
//									{	
//										xtype:'combo',
//										name:'CORP_AREA',
//										itemId:'corpArea',
//										fieldLabel : '所属辖区',
//										emptyText:'查看辖区企业分布',
//										labelWidth:55,
//										width:180,
//						                editable:false,
//						                store:Ext.getStore("sys_belong_area"),
//						                displayField: 'NAME',  
//						                valueField: 'CODE',
//						                queryMode: 'local'
//						            },
						            {
						            	xtype:'textfield',
						            	name:'addr',
						            	width:230,
						            	margin:'0 2 0 40',
						            	emptyText:'输入地址'
						            },{
						            	xtype:'text',
						            	text:'查看周围',
						            	margin:'3 0 0 0'
						            },{
						            	xtype:'combo',
						            	store:Ext.create('Ext.data.Store', {
										    fields: ['code', 'name'],
										    data : [
										        {"code":1000, "name":"1公里"},
										        {"code":2000, "name":"2公里"},
										        {"code":3000, "name":"3公里"},
										        {"code":5000, "name":"5公里"},
										        {"code":10000, "name":"10公里"}
										    ]
						            	}),
						            	value:1000,
						            	displayField: 'name',  
						                valueField: 'code',
						                queryMode: 'local',
						            	width:70,
						            	name:'gl'
						            },{
						            	xtype:'text',
						            	text:'内的维修企业',
						            	margin:'3 0 0 0'
						            },
									{xtype:'button',text:'查看',iconCls:'icon-search bigger-120 blue',width:60,handler : function(btn) {
										var form = btn.up('form[itemId=map_form]').getForm();
										var params = form.getValues();
										bmapFrame.window.setAddPlace(params.addr,params.gl,form.findField('result'));
									}},
									{xtype:'button',text:'重置',iconCls:'icon-reply bigger-120 blue',width:60,handler : function(btn) {
											var form = btn.up('form[itemId=map_form]').getForm();
											form.reset();
											bmapFrame.window.stopAnimaMarker();
											bmapFrame.window.closeCircles();
										}
									},{
						            	xtype:'displayfield',
						            	fieldStyle:'color:red;',
						            	name:'result'
						            }]
					},'->',{
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
//		me.down('combo[itemId=corpArea]').on('change',function(){
//			var form = me.down('form[itemId=map_form]').getForm();
//			var params = form.getValues();
//			bmapFrame.window.$('#corpArea').val(params.CORP_AREA);
//			var areaName = app.utils.FunUtils.findAreaByCode(params.CORP_AREA);
//			bmapFrame.window.setPlace(areaName);
//			bmapFrame.window.getAllCorpPosition();
//		});
		me.on('restore',function(win){
	    	win.setWidth(1000);
	    	win.setHeight(600);
	    	win.getEl().center();
	    });
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(){
		var me = this;
		me.down('panel[itemId=mapPanel]').update('<iframe height="100%" width="100%" src="manage/corp/tccorpinfo/position" scrolling="yes" frameborder="0" id="bmapFrame" name="bmapFrame"></iframe>');
		me.createTree();
	},
	createTree:function(){
		var me = this;
		var treepanel = me.down('treepanel');
		app.utils.AjaxCallbackUtil.ajaxCallbackAll('manage/corp/tccorpinfo/mapTree',{},function(ret){
			if( ret.success ){
				var root = ret.data;
				treepanel.getStore().setRootNode(root);
				treepanel.expandAll();
	  		}
		});
		treepanel.on('itemclick',function(view,record){
			bmapFrame.window.stopAnimaMarker();
			if(record.raw.type == 'all'){
				var point = new bmapFrame.window.BMap.Point(record.raw.lng, record.raw.lat);// 广州
				bmapFrame.window.map.panTo(point);
			}else if(record.raw.type == 'area'){
//				bmapFrame.window.$('#corpArea').val(record.raw.code);
				bmapFrame.window.setPlace(record.raw.text);
			}else if(record.raw.type == 'corp'){
				var point = new bmapFrame.window.BMap.Point(record.raw.lng, record.raw.lat);
				bmapFrame.window.map.panTo(point);
				var store =  Ext.getStore("markers");
				var rec = store.findRecord('code',record.raw.code);
				var marker = rec.data.mark;
				marker.setAnimation(bmapFrame.window.BMAP_ANIMATION_BOUNCE); // 跳动的动画
				marker.setIcon(bmapFrame.window.icon_blue); 
				marker.openInfoWindow(rec.data.info);
				bmapFrame.window.animaMarker.push(marker);
			}else{
				
			}
			
		});
	}
});
