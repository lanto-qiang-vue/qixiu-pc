Ext.define('app.view.check.CheckPhotoList',{
	extend:'Ext.window.Window',
	alias: 'widget.check.CheckPhotoList',
	itemId: 'check.CheckPhotoList',
	title: '检测照片',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 580,
	border:false,
	height:410,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 10,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.transrepair.PartsListModel',
				layout: 'fit',
        		labelWidth: 80,
				btns:[],
				//defaults:{width:210},
				items: [
					{xtype:'container',
						//width:160,
						//layout:'vbox',
						items:[{
							
							xtype : 'dataview',
							//padding : '0 0 0 5',
							itemId : 'checkphoto',
							store : Ext.create('Ext.data.Store', {
								fields : ['IMAGE_ID','CHECK_ID','IMAGE_PATH','TAKE_TIME','IMAGE_INFO'],
								proxy: {
							    	actionMethods:{read:'POST'},
							        type: 'ajax',
							        reader: {
							            type: 'json',
							            root: 'data'
							        },
							        url: 'check/checkphoto/photolist'
							    },
							    autoLoad:false
							}),
							tpl: [
					                '<tpl for=".">',
					                    '<div class="thumb-wrap">',
					                        '<div class="thumb" data-qtip="双击查看图片"><img src="{IMAGE_PATH:this.formatSrc}" height="70"></div>',
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
				]
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
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
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(params){
		var me = this;
		var store = me.down('dataview[itemId=checkphoto]').getStore();
		store.proxy.extraParams.CHECK_ID=params.data.CHECK_ID;
		store.load();
	}
});
