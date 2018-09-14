Ext.define('app.view.notice.InfoPublicEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.InfoPublicEdit',
	itemId: 'notice.InfoPublicEdit',
	title: '信息公布编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 800,
	border:false,
	height:550,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			border:false,
			layout : 'border',
			itemId:'mainForm',
			items:[{
				xtype:'panel',
				region:'north',
				split : true,
				collapsible:true,
				border:0,
				title:'公布信息',
				items:[{
					xtype : 'jsf.ModelContainer',
					model : 'app.model.notice.InfoPublic',
					defaults: {msgTarget:'side',width:250},
					layout: {
	            		type: 'table',
	            		columns: 3
	        		},
	        		labelWidth: 80,
					btns:[],
					items: [
						{fname:'INFO_ID',hidden:true},
						//{fname:'INFO_TYPE',meta:{val:'dict|dict.1028'}},
						{fname:'TITLE',vtype:'notEmpty',colspan:2,width:507},
						{xtype:'container',
							rowspan:3,
							layout:'vbox',
							items:[{xtype:'hidden',name:'PHOTO',itemId:'vehphoto'},{
								xtype:'image',
								width:220,
								height:60,
								itemId:'vehImage',
								margin:'10 0 10 30',
								style:'border:1px #ddd solid;',
								height:120,
								alt:'新闻图片',
								border:true
							}]
						},
						{fname:'CREATOR',value:window.GL.name},
						{fname:'DATA_FROM',value:'行业管理服务端'},
						{fname:'IMPORTANT_FLAG',value:'10041002'}

					]
				}]
			},{
				xtype:'panel',
				region:'center',
				border:false,
				title:'详细内容',
				layout:'fit',
				items:[{
						xtype : 'htmleditor',
						itemId:'INFO_CONTENT',
						enableSourceEdit:false,
						plugins: [
 			        	    Ext.create('app.ux.HtmlEditorImage'),
			        	    Ext.create('app.ux.HtmlEditorAttach')
			            ],
						name : 'CONTENT',
						fontFamilies : ["宋体", "隶书", "黑体"]
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
			items : ['->',me.getImageBtn(),'-',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'icon-save blue',
						text : '保 存'
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
	getImageBtn:function(){
		var me = this;
		return {
			xtype:'pluploadbutton',
	        text: '添加照片...',
	        iconCls: 'icon-picture bigger-120 blue',
	        pluploadConfig:{       	
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : 'newpartid',
				url :  '../manage/sys/tpsysuser/uploadImage',
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
	}
});
