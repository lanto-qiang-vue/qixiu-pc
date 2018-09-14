Ext.define('app.view.corp.CorpJoinView',{
	extend:'Ext.window.Window',
	alias: 'widget.corp.CorpJoinView',
	itemId: 'corp.CorpJoinView',
	title: '入网资料查看',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 1050,
	height:625,
	modal : true,
	border:false,
	isAdd:false,

	initComponent : function() {
		var me = this;
		me.items = [ {
				xtype:'form',
				border:false,
				layout:'fit',
				items:[{
					xtype:'tabpanel',
					items:me.getEditPanel()
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
	getEditPanel:function(){
		var me = this;
		me.count = 0;
		return [{
			xtype:'panel',
			border:false,
			title:'企业简介',
			itemId:'qyjj',
			layout: {
		        type: 'vbox',
		        pack: 'start',
		        align: 'stretch'
		    },
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.corp.CorpJoinModel',
				layout:'column',
				margin:'10 0 0 0 ',
				columns:3,
				items: [
					{fname:'JOIN_ID',hidden:true},
					{fname:'CORP_ID',hidden:true},
					{fname:'LONGITUDE',hidden:true},
					{fname:'LATITUDE',hidden:true},
					{fname:'FRONT_PHOTO',hidden:true},
					{fname:'LINK_MAN',readOnly:true},
					{fname:'LINK_TEL',readOnly:true},
					{fname:'CORP_ADD',readOnly:true}
				]
			},{
				xtype:'panel',
				title:'简介',
				flex:1,
				border:false,
				layout:'fit',
				items:[{
					xtype:'htmleditor',
					plugins: [
		        	    Ext.create('app.ux.HtmlEditorImage')
		            ],
					name : 'PROFILE',
					fontFamilies : ["宋体", "隶书", "黑体"]
				}]
			}]
		},{
			xtype:'panel',
			title:'企业图片',
			border:false,
			layout: {
		        type: 'hbox',
		        pack: 'start',
		        align: 'stretch'
		    },
		    listeners:{
		    	afterrender:function(panel){
		    		Ext.defer(function(){
		    			Ext.get('arrow_to_right').on('click',function(){
		    				var total = me.down('dataview').getStore().getCount() - 5;
		    				if(me.count <= total){
		    					me.count ++ ;
								if(Ext.isIE9m){
									Ext.get('small-pic-slide').setStyle('left',-86*me.count + 'px');
								}else{
									Ext.get('small-pic-slide').setStyle('transform','translate3d(' + -86*me.count + 'px, 0px, 0px)');
								}
		    				}
						});
						Ext.get('arrow_to_left').on('click',function(){
							if(me.count > 0){
								me.count -- ;
								if(Ext.isIE9m){
									Ext.get('small-pic-slide').setStyle('left',-86*me.count + 'px');
								}else{
									Ext.get('small-pic-slide').setStyle('transform','translate3d(' + -86*me.count + 'px, 0px, 0px)');
								}
							}
							
						});
						me.down('dataview').getSelectionModel().select(0);
		    		},500);
		    	}
		    },
		    items:[{
		    	xtype:'panel',
		    	margin:'10 0 10 10',
		    	border:false,
		    	items:[{
					xtype:'dataview',
					itemId:'leftpiclist',
				//	autoScroll:true,
					store: Ext.create('Ext.data.Store',{
						fields: ['PHOTO_ID','PHOTO_PATH','IS_FRONT']
					}),
		        	tpl: ['<div class="pc-slide">',
								'<div class="pic-view">',
									'<div class="swiper-container">',
										'<div class="swiper-wrapper" id="big-pic-slide" style="width:{[values.length*500]}px;">',
											'<tpl for=".">',
												'<div class="swiper-slide">',
													'<a><img src="/attach/{PHOTO_PATH}"></a>',
												'</div>',
											'</tpl>',
										'</div>',
									'</div>',
								'</div>',
								'<div class="preview">',
									'<a class="arrow-left" id="arrow_to_left"></a>',
									'<a class="arrow-right" id="arrow_to_right"></a>',
									'<div class="swiper-container">',
										'<div class="swiper-wrapper" id="small-pic-slide" style="width:{[values.length*500]}px;">',
											'<tpl for=".">',
												'<div class="cum_select swiper-slide">',
													'<img src="/attach/{PHOTO_PATH}" alt="xxx">',
												'</div>',
											'</tpl>',
										'</div>',
									'</div>',
								'</div>',
						'</div>',{
							formatADD:function(values){
							
							}
						}],
		        	multiSelect: false,
		        	count:0,
		            height: "100%",
		            itemSelector: ".cum_select",
				    selectedItemCls: 'active-nav',
				    trackOver: true,
				    listeners: {
				    	select:function( view, record, eOpts){
				    		//me.viewSwiper.swipeTo(2);
				    		var index = view.getStore().indexOf(record);
				    		if(Ext.isIE9m){
								Ext.get('big-pic-slide').setStyle('left',-500*index + 'px');
							}else{
								Ext.get('big-pic-slide').setStyle('transform','translate3d(' + -500*index + 'px, 0px, 0px)');
							}
				    	},
				    	beforecontainerclick:function(){return false;}
			    	}
				}]
		    },{
		    	xtype:'panel',
		    	margin:'10 10 10 10',
		    	bodyPadding:10,
		    	title:'封面图片(添加照片时默认将第1张图片设为封面)',
		    	layout: {
			        type: 'hbox',
			        pack: 'center',
			        align: 'stretch'
			    },
			    style:'text-align:center;',
		    	width:500,
		    	height:500,
		    	itemId:'front_image',
		    	html:''
		    }]
		},{
			xtype:'panel',
			title:'地图位置',
			itemId:'map_position',
			html:''
		}];
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		if(!Ext.isEmpty(record.get('FRONT_PHOTO'))){
			me.down('#front_image').update('<img src="/attach/' + record.get('FRONT_PHOTO') + '" style="max-width:500px;max-height:450px;"/>');
		}
		me.down("#map_position").update('<iframe height="100%" width="100%" src="client/corp/corpjoin/position?isview=yes&joinId=' + record.get('JOIN_ID') + '" scrolling="yes" frameborder="0" id="corpjoinbmapFrame" name="bmapFrame"></iframe>');
		app.utils.AjaxCallbackUtil.ajaxTitleCallback('client/corp/corpjoin/getInfo',{joinId:record.get('JOIN_ID')},me,"加载中...",function(ret){
			if( ret.success ){
				var photos = ret.data;
				var store = me.down('dataview').getStore();
				store.add(photos);
      		}
		});
	}
});
