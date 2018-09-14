Ext.define('app.view.notice.InfoPublicMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.notice.InfoPublicMngPanel',
	itemId: 'notice.InfoPublicMngPanel',
	title: '行业信息预览',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'fit',
	width : 800,
	height:550,
	modal : true,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getInfoPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	//加载数据
	loadData : function(record){
		var me = this;
	},
	getInfoPanel : function(){
		var me = this;
		var url='';
		var title = '文件下载';
		var type = '10281012';
		if(this.funcId=='100302'){
			//url='http://120.76.45.119:808/shwgweb/industry/10281001?isSys=yes';
			type = '10281003';
			title = '行业政策';
		}
		var store = Ext.create('Ext.data.Store',{
			fields:['INFO_ID','TITLE','CONTENT',{name:'PUBLISH_TIME',type:'date',dateFormat:'Y-m-d H:i:s'}],
			proxy: {
		    	actionMethods:{read:'POST'},
		        type: 'ajax',
		        reader: {
		            type: 'json',
		            root: 'data'
		        },
		        url: 'check/notice/infopublic/list'
		    }
		});
		
		return {
			xtype:'dataview',
			minWidth:500,
			listeners:{
				itemclick:function(view,record){
					var win = Ext.create('app.view.notice.TbInfoPublicView',{
						title:record.get('TITLE')
					});
					win.loadHtml(record);
				},
				beforerender:function(view){
					var params = {
						INFO_TYPE_eq:type,
						PUBLISH_STATUS_eq:'10311001'
					};
					store.proxy.extraParams=params;
					store.loadPage(1);
					me.addDocked({
							xtype : "pagingtoolbar",
							dock : "bottom",
							pageSize : 25,
							totalCount:store.getTotalCount(),
							displayInfo : true,
							plugins : Ext.create('app.ux.ProgressBarPager', {}),
							store : store,
							listeners : {
								afterrender : function(h, g) {
									h.insert(6, ["-", "每页", {
												xtype : "combobox",
												width : 50,
												allowBlank : false,
												editable : false,
												value : h.getStore().pageSize,
												store : [25, 50, 75, 100, 150,
														200, 250, 300, 350,
														400, 450, 500],
												listeners : {
													change : function(j, k, i) {
														h.getStore().pageSize = k;
														h.getStore().loadPage(1);
													}
												}
											}, "条"]);
								}
							}
						})
			
				}
			},
			autoScroll:true,
			itemId:'contentPanel',
			multiSelect: false,
		    selectedItemCls: 'current',
		    trackOver: true,
			itemSelector:'li',
			store:store,
			tpl:['<div class="zhengwu_t">' ,
		        	'<span class="sp_zw">' + title + '</span>',
		            '<span class="sp_wz"></span>',
		        '</div>',
		        '<ul class="zhengwu_c" id="dataBody">',
		        	'<tpl for=".">',
		        	'<li>',
		        		'<a href="javascript:void(0);" class="sel">{TITLE}</a>',
		        		'<span>{PUBLISH_TIME:this.formatDate}</span>',
		        	'</li>',
		        	'</tpl>',
		        '</ul>',
		        {
		        	formatDate:function(v){
		        		return Ext.Date.format(v, "Y-m-d H:i:s");
		        	}
		        }
		        ]
			//html:' <iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"> </iframe>'
		}
	}
});

