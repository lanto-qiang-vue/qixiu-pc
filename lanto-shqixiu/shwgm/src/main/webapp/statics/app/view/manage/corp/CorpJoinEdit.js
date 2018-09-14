Ext.define('app.view.manage.corp.CorpJoinEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.CorpJoinEdit',
	itemId: 'manage.corp.CorpJoinEdit',
	title: '入网申请资料修改',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 1140,
	height:580,
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
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存',
						code:'save'
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
				}],
				rbar:{
					xtype : 'toolbar',
					dock : 'right',
					layout : {
						pack : 'start',
						type : 'vbox',
						align: 'stretch'
					},
					items : [me.getImageBtn()
						,'-', {
								xtype : 'button',
								iconCls : 'delete_button',
								text : '删除图片',
								handler : function(btn) {
									var view = me.down('dataview'),
										store = view.getStore(),
										records = view.getSelectionModel().getSelection();
									if(!records || records.length <=0){
										Ext.Msg.alert('系统提示','请选择要删除的图片！');
										return;
									}
									Ext.MessageBox.confirm('系统提示','确认要删除选中的图片吗？',function(flag){
										if(flag=='yes'){
											var record = records[0];
											store.remove(record);
										}
									});
								}
						},'-', {
								xtype : 'button',
								iconCls : 'icon-picture blue',
								text : '设为封面',
								handler : function(btn) {
									var view = me.down('dataview'),
										store = view.getStore(),
										records = view.getSelectionModel().getSelection();
									if(!records || records.length <=0){
										Ext.Msg.alert('系统提示','请选择要设为封面的图片！');
										return;
									}
									Ext.MessageBox.confirm('系统提示','确认要设置选中的图片为封面吗？',function(flag){
										if(flag=='yes'){
											var record = records[0];
											me.down('#front_image').update('<img src="/attach/' + record.get('PHOTO_PATH') + '" style="max-width:500px;max-height:450px;"/>');
											me.down('form').getForm().findField('FRONT_PHOTO').setValue(record.get('PHOTO_PATH'));
										}
									});
								}
						},'-',{
							xtype:'container',
							itemId:'uploading',
							style:'text-align:center;',
							html:''
						}]
					}
		    },{
		    	xtype:'panel',
		    	margin:'10 10 10 0',
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
			title:'位置设定',
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
		me.down("#map_position").update('<iframe height="100%" width="100%" src="manage/corp/corpjoin/position?joinId=' + record.get('JOIN_ID') + '" scrolling="yes" frameborder="0" id="corpjoinbmapFrame" name="bmapFrame"></iframe>');
		app.utils.AjaxCallbackUtil.ajaxTitleCallback('manage/corp/corpjoin/getInfo',{joinId:record.get('JOIN_ID')},me,"加载中...",function(ret){
			if( ret.success ){
				var photos = ret.data;
				var store = me.down('dataview').getStore();
				store.add(photos);
      		}
		});
	},
	getImageBtn:function(){
		var me = this;
		return {
			xtype:'pluploadbutton',
	        text: '添加照片',
	        iconCls: 'add_button',
	        pluploadConfig:{       	
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : 'newpartid',
				url :  '../manage/corp/corpjoin/uploadImages',
				flash_swf_url :  'js/upload/Moxie.swf',
				silverlight_xap_url : 'js/upload/Moxie.xap',
//								container: document.getElementById('newpart_area'), // ... or DOM Element itself
				multiple_queues : false,
				multi_selection:true,
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
						up.start();
					},
					// 某个文件上传过程中不断触发
					UploadProgress : function(up, file) {
						me.down('#uploading').update('上传中...' + file.percent + '％ ');
					},
					// 当某个文件上传完成后触发
					FileUploaded : function(up, file, responseObject) {
						var form = me.down('form');
						var data = Ext.decode(responseObject.response);
						me.isAdd = true;
						me.down('#uploading').update('上传完毕');
						var view = me.down('dataview');
						var store = view.getStore();
						var count = store.getCount();
						if(count == 0){
							me.down('#front_image').update('<img src="/attach/' + data.data + '" style="max-width:500px;max-height:500px;"/>');
							form.getForm().findField('FRONT_PHOTO').setValue(data.data);
						}
						store.add({PHOTO_PATH:data.data});
						view.refresh();
						Ext.get('arrow_to_right').on('click',function(){
		    				var total = view.getStore().getCount() - 5;
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
						var itemCount = store.getCount() - 5;
						if(itemCount >= 0){
							me.count =  itemCount + 1;
							if(Ext.isIE9m){
								Ext.get('small-pic-slide').setStyle('left',-86*itemCount + 'px');
							}else{
								Ext.get('small-pic-slide').setStyle('transform','translate3d(' + -86*itemCount + 'px, 0px, 0px)');
							}
						}
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
	}
});
