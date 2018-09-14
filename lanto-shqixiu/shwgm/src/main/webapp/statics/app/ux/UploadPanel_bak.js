/**
 * 多文件上传组件 
 * for extjs4.0 + struts2.0 + swfupload
 * @author fixed by houniaofei
 * @since 2013-03-15
 */
Ext.define('app.ux.UploadPanel',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.uploadpanel',
	columns : [{
				xtype : "rownumberer"
			}, {
				text : "文件名",
				flex : 1,
				dataIndex : "name"
			}, {
				text : "重命名",
				flex : 1,
				hidden : true,
				dataIndex : "fileName",
				editor : {
					xtype : "textfield"
				}
			}, {
				text : "类型",
				width : 70,
				dataIndex : "type",
				renderer : function(a) {
					var type = ['doc','','docx','js','jsp','mp3','pdf','ppt','xls','xlsx','html','rar','zip','txt'];
					var img = ['.jpg','.JPG','.jpeg','.JPEG','.png','.PNG','.gif','.GIF','.bmp','.BMP'];
					var isImg = false;
					for(var i=0;i<img.length;i++){
						if(img[i] == a){
							isImg = true;
						}
					}
					if(isImg){
						return '<div style="height:16px;background-image: url(js/swfupload/icons/img.gif); background-repeat: no-repeat; !important;padding-left:18px;">' + a + '</div>';
					}else{
						for(var j=0;j<type.length;j++){
							if('.' + type[j] == a){
								return '<div style="height:16px;background-image: url(js/swfupload/icons/' + type[j] + '.gif); background-repeat: no-repeat; !important;padding-left:18px;">' + a + '</div>';
							}
						}
					}
					return '<div style="height:16px;background-image: url(js/swfupload/icons/unknown.gif); background-repeat: no-repeat; !important;padding-left:18px;">' + a + '</div>';
				}
			}, {
				text : "大小",
				width : 70,
				dataIndex : "size",
				renderer : function(a) {
					return Ext.util.Format.fileSize(a)
				}
			}, {
				text : "进度",
				width : 110,
				dataIndex : "percent",
				renderer : function(a) {
					var b = '<div>' +
								'<div style="border:1px solid #0099CC;height:15px;width:100px;margin:1px 0px 1px 0px;float:left;">' +
									'<div style="float:left;text-align:right;background:#ABCDEF;width:' + a + '%;height:13px;color:#0099CC">' + a + '%</div>' +
								'</div>' +
							'</div>';
					return b
				}
			}, {
				text : "状态",
				width : 80,
				dataIndex : "status",
				renderer : function(a) {
					switch (a) {
						case -1 :
							return "等待上传";
						case -2 :
							return "上传中...";
						case -3 :
							return "<div style='color:red;'>上传失败</div>";
						case -4 :
							return "<div><img src='js/swfupload/icons/ok.png'/></div>";
						case -5 :
							return "停止上传";
						default :
							return ""
					}
				}
			}, {
				text : "操作",
				xtype : "actiontextcolumn",
				width:130,
				sortable : false,
				items : [{
					text : "[删除]",
					isShow : false,
					icon : "",
					tooltip : "删除",
					handler : function(b, c, a) {
						b = b.up("grid");
						b.swfupload.cancelUpload(b.getStore().getAt(c)
										.get("id"), false);
						var record = b.store.getAt(c);
						if(!Ext.isEmpty(record.data.fileUploadInfoId)){
							Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
							if(flag=='yes'){
								var url = "manage/common/fileUpload/delete";
								var params = {data : Ext.JSON.encode(record.data)};
				    			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				    				if( ret.success ){
				    					b.store.remove(record);
					          		}
				    			});
								
				    		}
						});	
						}else{
							b.store.remove(record);
						}	
					}
				}, {
					text : "[下载]",
					isShow : true,
					icon : "",
					tooltip : "下载",
					handler : function(b, c, a) {
						var params = b.up("grid").getStore().getAt(c).getData();
						params.fileBillType = b.up("grid").fileBillType;
						if(params.status == -4) {
							var url = 'manage/common/fileUpload/downloadFile';
							app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){});
						}else {
							Ext.Msg.alert('提示','附件没有上传!');
						}
					}
				},{
					
					text : "[查看]",
					isShow :function(value,metaData,record){
						var img = ['jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF','bmp','BMP'];
						var type = record.data.type;
						for(var i=0;i<img.length;i++){
							if('.'+img[i] == type){
								return true;
							}
						}
						return false;
					},
					icon : "",
					tooltip : "图片可以直接查看",
					handler : function(b, c, a) {
//						var form = b.up('form').getForm();
						var params = b.up("grid").getStore().getAt(c).getData();
						var fileId = params.fileId;
						if(params.status == -4) {
							var win = Ext.create('app.view.common.ImageWin',{fileId:fileId});
							win.show();
						}else {
							Ext.Msg.alert('提示','附件没有上传!');
						}
					}
				}]
			}],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],    
    store : Ext.create("Ext.data.Store", {
    	autoLoad : false,
		autoSync : false,
		proxy : {
			type : "ajax",
			url : 'manage/common/fileUpload/queryFile',
			actionMethods : {
				create : "POST",
				read : "POST",
				update : "POST",
				destroy : "POST"
			},
			reader : {
				type : "json",
				root : "data"
			}
		},
        fields : ['id','fileUploadInfoId','name','type','size','percent','status','fileName','fileUrl','fileId']
    }),
	addFileBtnText : '添加文件',
	uploadBtnText : '开始上传',
	removeBtnText : '清空列表',
	cancelBtnText : '停止上传',
	forEdit:false, //是否可以是编辑模式
	border : false,
	layout : 'fit',
	itemId : "fileUploadGrid",
	isDetail : false,//是否有显示已存在的明细
	isAutoLoad : false,
	debug : false,
	swfupload : null,
	fileBillId : "",
	fileBillType : "",
	file_size_limit : "200MB",
	file_types : '*.*',
	file_types_description : 'file description',
	file_upload_limit: 0,
	file_queue_limit : 50,
	post_params : {},
	upload_url : 'manage/common/fileUpload/upload',
	file_deny_types : ".exe .EXE .bat .BAT",
	flash_url : "js/swfupload/swfupload.swf",
	flash9_url : "js/swfupload/swfupload_fp9.swf",
	initComponent : function(){		
		this.toolbarItems = [{
		    xtype: 'toolbar',
		    dock: 'top',
		    items: [
		        { 
			        xtype:'button',
			        itemId: 'addFileBtn',
			        icon : "js/swfupload/icons/add.gif",
			        id : '_btn_for_swf_',
			        text : this.addFileBtnText
		        },'-',{
		        	xtype : 'button',
		        	itemId : 'uploadBtn',
		        	icon : "js/swfupload/icons/up.gif",
		        	text : this.uploadBtnText,
		        	scope : this,
		        	handler : function(b) {
						var a = b.up("grid");
						//----deny files and all files size limit
						var file_deny_types = a.file_deny_types;
						var file_deny_types_arr = file_deny_types.split(" ");
						var file_size_limit = a.file_size_limit;
						var file_size_limit_byte = 0;
						if(file_size_limit.indexOf('MB') != -1){
							var num = file_size_limit.substr(0,file_size_limit.length-2);
							file_size_limit_byte = Number(num)*1024*1024;
						}else if(file_size_limit.indexOf('KB') != -1){
							var num = file_size_limit.substr(0,file_size_limit.length-2);
							file_size_limit_byte = Number(num)*1024;
						}
						var data = a.store.data;
						var msg = "";
						var allSize = 0;
						for(var i = 0;i < data.length;i++){
							var record = data.getAt(i);
							for(var j = 0;j < file_deny_types_arr.length;j++){
								var file_deny_type = file_deny_types_arr[j];
								if(file_deny_type == record.data.type){
									msg += "文件  "+record.data.name+": <font color='red'>"+record.data.type+"文件类型不允许上传</font><br/>";
									break;
								}
							}
							if(Number(record.data.size)>file_size_limit_byte){
								msg += "文件  "+record.data.name+": <font color='red'>文件大小("+record.data.size+")超过限制("+file_size_limit+")</font><br/>";
							}
							allSize += Number(record.data.size);
						}
						if(allSize > file_size_limit_byte){
							msg += "<font color='red'>所有文件大小之和超过限制("+file_size_limit+")</font><br/>";
						}
						
						if(msg){
							Ext.Msg.alert('上传提示',msg);
							return;
						}
						if (a.swfupload && a.store.getCount() > 0
								&& a.swfupload.getStats().files_queued > 0) {
							a.swfupload.uploadStopped = false;
							a.swfupload.startUpload();
							a.showBtn(a, false);
						}
					}
		        },'-',{
		        	xtype : 'button',
		        	itemId : 'cancelBtn',
		        	iconCls : 'stop_button',
		        	disabled : true,
		        	text : this.cancelBtnText,
		        	scope : this,
		        	handler : function(b) {
						var a = b.up("grid");
						if (a.swfupload) {
							a.swfupload.uploadStopped = true;
							a.swfupload.stopUpload();
							a.showBtn(a, true);
						}
					}
		        },'-',{
		        	xtype : 'button',
		        	itemId : 'removeBtn',
		        	icon : "js/swfupload/icons/trash.gif",
		        	text : this.removeBtnText,
		        	scope : this,
		        	handler : function(e) {
						var d = e.up("grid");
						var b = d.getStore();
						var data = [];
						for (var c = 0; c < b.getCount(); c++) {
							var a = b.getAt(c);
							var f = a.get("id");
							d.swfupload.cancelUpload(f, false);
							if(!Ext.isEmpty(a.data.fileUploadInfoId)){
								data.push(a.data);
							}
						}
						Ext.MessageBox.confirm('系统提示','确认清空列表吗？',function(flag){
							if(flag=='yes'){
								var url = "manage/common/fileUpload/remove";
								var params = {data : Ext.JSON.encode(data)};
				    			app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
				    				if( ret.success ){
				    					b.removeAll();
					          		}
				    			});
				    		}
						});	
						
					}
		        },'-','->',{
					xtype:'button',
					itemId:'refrechBtn',
					iconCls:'reload_button',
					text:'刷新',
					margin:'0 25 0 0',
					handler : function(b) {
						var a = b.up("grid");
						a.getStore().reload();
					}
				}]
		}];
		var b = this;
		if(!b.forEdit) {
			b.dockedItems[0] = [];
		}else {
			b.dockedItems = b.toolbarItems;
		}
		b.columns[b.columns.length-1].items[0].isShow = b.forEdit;
		this.callParent();
		var store = b.getStore();
		store.on('beforeload', function (st, options) {
            //beforeload之前附加查询参数
            st.proxy.extraParams = {fileBillId:b.fileBillId, fileBillType:b.fileBillType};
        });
        if(b.isDetail){
        	store.reload();
        }
		this.down('button[itemId=addFileBtn]').on({	 
			afterrender : function(btn){
				var config = this.getSWFConfig(btn);		
				this.swfupload = new SWFUpload(config);
				Ext.get(this.swfupload.movieName).setStyle({
					position : 'absolute',
					top : 0,
					left : -2
				});	
			},
			scope : this,
			buffer:300
		});
	},
	getSWFConfig : function(btn){
		var me = this;
		var placeHolderId = Ext.id();
		var em = btn.getEl().child('em');
		if(em==null){
			em = Ext.get(btn.getId()+'-btnWrap');
		}		
		em.setStyle({
			position : 'relative',
			display : 'block'
		});
		em.createChild({
			tag : 'div',
			id : placeHolderId
		});
		return {
			debug: me.debug,
			flash_url : me.flash_url,
			flash9_url : me.flash9_url,	
			upload_url: me.upload_url || '',
			post_params: me.post_params||{savePath:'upload\\'},
			file_size_limit : (me.file_size_limit*1024),
			file_types : me.file_types,
			file_types_description : me.file_types_description,
			file_upload_limit : me.file_upload_limit,
			file_queue_limit : me.file_queue_limit,
			button_width: em.getWidth(),
			button_height: em.getHeight(),
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor: SWFUpload.CURSOR.HAND,
			button_placeholder_id: placeHolderId,
			custom_settings : {
				scope_handler : me
			},
			swfupload_preload_handler : me.swfupload_preload_handler,
			file_queue_error_handler : me.file_queue_error_handler,
			swfupload_load_failed_handler : me.swfupload_load_failed_handler,
			upload_start_handler : me.upload_start_handler,
			upload_progress_handler : me.upload_progress_handler,
			upload_error_handler : me.upload_error_handler,
			upload_success_handler : me.upload_success_handler,
			upload_complete_handler : me.upload_complete_handler,
			file_queued_handler : me.file_queued_handler/*,
			file_dialog_complete_handler : me.file_dialog_complete_handler*/
		};
	},
	swfupload_preload_handler : function(){
		if (!this.support.loading) {
			Ext.Msg.show({
				title : '提示',
				msg : '浏览器Flash Player版本太低,不能使用该上传功能！',
				width : 250,
				icon : Ext.Msg.ERROR,
				buttons :Ext.Msg.OK
			});
			return false;
		}
	},
	file_queue_error_handler : function(file, errorCode, message){
		switch(errorCode){
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED : msg('上传文件列表数量超限,不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT : msg('文件大小超过限制, 不能选择!');
			break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE : msg('该文件大小为0,不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE : msg('该文件类型不允许上传！');
			break;
			case -140 : msg(message);
			break;
		}
		function msg(info){
			Ext.Msg.show({
				title : '提示',
				msg : info,
				width : 250,
				icon : Ext.Msg.WARNING,
				buttons :Ext.Msg.OK
			});
		}
	},
	swfupload_load_failed_handler : function(){
		Ext.Msg.show({
			title : '提示',
			msg : 'SWFUpload加载失败！',
			width : 180,
			icon : Ext.Msg.ERROR,
			buttons :Ext.Msg.OK
		});
	},
	upload_start_handler : function(a) {
		var b = this.settings.custom_settings.scope_handler;
		b.down("toolbar button[itemId=cancelBtn]").setDisabled(false);
		var c = b.store.getById(a.id);
		if (Ext.isEmpty(b.post_params)) {
			b.post_params = {};
		}
		b.post_params.rename = encodeURIComponent(c.get("fileName"));
		Ext.apply(b.post_params, c.data);
		this.setPostParams(b.post_params);
	},
	upload_progress_handler : function(file, bytesLoaded, bytesTotal){ 
		var me = this.settings.custom_settings.scope_handler;		
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		percent = percent == 100? 99 : percent;
       	var rec = me.store.getById(file.id);
       	rec.set('percent', percent);
		rec.set('status', file.filestatus);
		rec.commit();
	},
	//每上传一个文件失败触发
	upload_error_handler : function(file, errorCode, message){   
		var me = this.settings.custom_settings.scope_handler;		
		var rec = me.store.getById(file.id);
       	rec.set('percent', 0);
		rec.set('status', file.filestatus);
		rec.commit(); 
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		}else{
			me.showBtn(me,true);
		}
	},
	//每上传一个文件成功后触发
	upload_success_handler : function(b, a, c) {
		var d = this.settings.custom_settings.scope_handler;
		var e = d.store.getById(b.id);
		var outData = Ext.JSON.decode(a);
		console.log(outData);
		if (outData.success) {
			e.set("percent", 100);
			e.set("status", b.filestatus);
			e.set("fileUploadInfoId", outData.fileUploadInfoId);
			e.set("fileId", outData.fileId);
			e.set("fileName", outData.fileOldName);
		} else {
			e.set("percent", 0);
			e.set("status", SWFUpload.FILE_STATUS.ERROR)
		}
		e.commit();
	},
	//上传完成之后触发
	upload_complete_handler : function(a) {
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload()
		} else {
			var b = this.settings.custom_settings.scope_handler;
			b.showBtn(b, true)
		}
	},
	//这个事件在选定文件后触发
	file_queued_handler : function(file){ 
		var me = this.settings.custom_settings.scope_handler;
		me.store.add({
			id : file.id,
			name : file.name,
			fileName : file.name,
			size : file.size,
			type : file.type,
			status : file.filestatus,
			percent : 0
		});
	},
	showBtn : function(me,bl){
		me.down('#addFileBtn').setDisabled(!bl);
		me.down('#uploadBtn').setDisabled(!bl);
		me.down('#removeBtn').setDisabled(!bl);
		me.down('#cancelBtn').setDisabled(bl);
		if(bl){
			me.down('actioncolumn').show();
		}else{
			me.down('actioncolumn').hide();
		}		
	}
});
