/**
 * 附件上传组件
 * @user : jerry
 * @date : 2014-4-25
 */

Ext.define("app.ux.UploadWin", {
	extend : "Ext.window.Window",
	alias : "widget.uploadWin",
	width : 600,
	height : 480,
	autoShow : true,
	modal : true,
	layout : "fit",
	items : [],
	itemId : "fileUploadWin",
	
	file_types : "*.*",
	file_size_limit : "2MB",
	file_total_size : "10MB",
	forEdit : false,
	isProgressbar:true,
    isDetail: false ,
    fileBillId : '',
    fileBillType : '',
    
	listeners : {
		beforeclose : function(panel, eOpts) {
			var grid = panel.down("#fileUploadGrid");
			if(grid.store && grid.store.getCount() > 0) {
				grid.store.removeAll();
			}
		}
	},
	
	initComponent : function() {
		var a = this;
		a.items[0] = {
			xtype : "uploadpanel",
			border : false,
			file_types : a.file_types,
			file_size_limit : a.file_size_limit,
			file_total_size : a.file_total_size,
			isProgressbar:a.isProgressbar,
			forEdit : a.forEdit,
			isDetail : a.isDetail,
			fileBillId : a.fileBillId,
			fileBillType : a.fileBillType
		}; 
		a.callParent()
	}
});

 

Ext.define('app.ux.UploadPanel',{
	extend : "Ext.form.Panel",
	alias : "widget.uploadpanel",
	
	items : [],
	
	forEdit:false, //是否可以是编辑模式
	border : 0,
	
	itemId : "fileUploadForm",
	layout : 'fit',
	isDetail : false,//是否有显示已存在的明细
	isAutoLoad : false,
	isProgressbar:true,
	isHiddenUser:true,
	attrUser:'',
	fileBillId : "",
	fileBillType : "",
	file_types : "*.*",
	file_size_limit : "2MB",
	file_total_size : "10MB",
	file_deny_types : ".exe .EXE .bat .BAT",
	file_types_description : "file description",
	file_upload_limit : 0,
	file_queue_limit : 200,
	upload_url :'manage/common/fileUpload/upload',
	flash_url : "js/swfupload/swfupload.swf",
	initComponent : function() {
		var a = this;
		a.items[0] = {
			xtype : "uploadgrid",
			border : a.border,
			forEdit : a.forEdit,
			isDetail : a.isDetail,
			isAutoLoad : a.isAutoLoad,
			isProgressbar:a.isProgressbar,
			fileBillId : a.fileBillId,
			fileBillType : a.fileBillType,
			isHiddenUser : a.isHiddenUser,
			attrUser : a.attrUser,
			flash_url : a.flash_url,
			upload_url : a.upload_url,
			file_types : a.file_types,
			file_size_limit : a.file_size_limit,
			file_total_size : a.file_total_size,
			file_deny_types : a.file_deny_types,
			file_types_description : a.file_types_description,
			file_upload_limit : a.file_upload_limit,
			file_queue_limit : a.file_queue_limit
		}, a.callParent();
	}
});




Ext.define("jsf.upload.UploadGrid", {
	extend : 'jsf.upload.BatchUploadGrid',
	alias : 'widget.uploadgrid',
	forEdit:false, //是否可以是编辑模式
	border : false,
	layout : 'fit',
	itemId : "fileUploadGrid",
	isDetail : false,//是否有显示已存在的明细
	isProgressbar:true,//是否要总的进度条，
	isAutoLoad : false,
	isHiddenUser:true,
	attrUser:'',
	debug : false,
	viewConfig : {
		forceFit : true,
		stripeRows : true
	},
	fileBillId : "",
	fileBillType : "",
	file_types : "*.*",
	file_size_limit : "2MB",
	file_total_size : "10MB",
	file_deny_types : ".exe .EXE .bat .BAT",
	file_types_description : "file description",
	file_upload_limit: 0,
	file_queue_limit : 50,
	upload_url :'manage/common/fileUpload/upload',
	flash_url : "js/swfupload/swfupload.swf",
	flash9_url : "js/swfupload/swfupload_fp9.swf",
	
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
					var type = ['doc','','docx','js','jsp','mp3','pdf','ppt','xls','xlsx','html','rar','zip','txt','mp3','mp4','mpg','flv','fla','exe','dll','chm','3gp','swf','pptx','xml','wav','pps','rtf','png','gif','bmp'];
					var img = ['.jpg','.jpeg'];
					var isImg = false;
					for(var i=0;i<img.length;i++){
						if(img[i] == a.toLowerCase()){
							isImg = true;
						}
					}
					if(isImg){
						return '<div style="height:16px;background-image: url(js/swfupload/icons/jpg.gif); background-repeat: no-repeat; !important;padding-left:18px;">' + a + '</div>';
					}else{
						for(var j=0;j<type.length;j++){
							if('.' + type[j] == a.toLowerCase()){
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
					var returnValue = '';
					returnValue = '<div class="x-progress x-progress-default" id="progressbar-1037">' +
										'<div class="x-progress-text x-progress-text-back" id="ext-gen1496" style="width: 100px;">' + a + ' %</div>' +
										'<div id="progressbar-1037-bar" class="x-progress-bar x-progress-bar-default" style="width: ' + a + '%;">' +
											'<div class="x-progress-text" id="ext-gen1495" style="width: 100px;">' + a + ' %</div>' +
										'</div>' +
								'</div>';
					return returnValue;
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
				text : "上传人",
				width : 110,
				dataIndex : "attrUser"
			}, {
				text : "操作",
				xtype : "actiontextcolumn",
				width:130,
				sortable : false,
				items : [{
					text : "[移除]",
					isShow : false,
					icon : "",
					tooltip : "移除",
					handler : function(b, c, a) {
						b = b.up("grid");
						b.swfUploader.cancelUpload(b.getStore().getAt(c)
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
							b.progressInfo.filesTotal -= 1;
							b.progressInfo.bytesTotal -= record.data.size;
							b.store.remove(record);
						}	
					}
				}, {
					text : "[下载]",
					isShow : true,
					icon : "",
					tooltip : "下载",
					handler : function(b, c, a) {
						var form = b.up('form').getForm();
						var params = b.up("grid").getStore().getAt(c).getData();
						params.fileBillType = b.up("grid").fileBillType;
						if(params.status == -4) {
							app.utils.CommonUtil.exportStandardSubmit(form,'manage/common/fileUpload/downloadFile',params);
						}else {
							Ext.Msg.alert('提示','附件没有上传!');
						}
					}
				},{
					
					text : "[查看]",
					isShow :function(value,metaData,record){
						var img = ['jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF','bmp','BMP'];
						//var office = ['doc','DOC','docx','DOCX','xls','XLS','xlsx','txt','TXT','PDF','pdf'];
						var type = record.data.type;
						for(var i=0;i<img.length;i++){
							if('.'+img[i] == type){
								return true;
							}
						}
//						for(var i=0;i<office.length;i++){
//							if('.'+office[i] == type){
//								return true;
//							}
//						}
						return false;
					},
					icon : "",
					tooltip : "图片可以直接查看",
					handler : function(b, c, a) {
						var form = b.up('form').getForm();
						var params = b.up("grid").getStore().getAt(c).getData();
						var fileId = params.fileId;
						var img = ['jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF','bmp','BMP'];
//						var office = ['doc','DOC','docx','DOCX','xls','XLS','xlsx','txt','TXT','PDF','pdf'];
						var type = params.type;
						var winName = 'ImageWin';
//						for(var i=0;i<office.length;i++){
//							if('.'+office[i] == type){
//								winName = 'OfficeWin';
//							}
//						}
						if(params.status == -4) {
							if(winName == 'OfficeWin'){			
								var win = Ext.create('app.view.common.' + winName,{title: params.name });
								win.show();
								win.loadData(fileId);
							}else{
								var win = Ext.create('app.view.common.' + winName,{title: params.name ,fileId:fileId});
								win.show();
							}
						}else {
							Ext.Msg.alert('提示','附件没有上传!');
						}
					}
				}]
			}],
	pbbar:[{xtype:'progressbar',value:0,text: '准备就绪…… 已完成：0 %',width:'100%',itemId:'upload_progressbar',
			animate:{
				duration: 1000,
				easing: 'bounceOut'	
			}}],
	toolbarItems : [{
		xtype : "toolbar",
		dock : "top",
		items : [{
					xtype : "button",
					itemId : "addFileBtn",
					icon : "icons/add.gif",
					id : '_btn_for_swf_',
					text : "添加文件"
				}, "-", {
					xtype : "button",
					itemId : "uploadBtn",
					icon : "icons/up.png",
					text : "开始上传",
					handler : function(b) {
						var a = b.up("grid");
						//----deny files and all files size limit
						var file_deny_types = a.file_deny_types;
						var file_deny_types_arr = file_deny_types.split(" ");
						var file_size_limit = a.file_size_limit;
						var file_total_size = a.file_total_size;
						var file_size_limit_byte = 0;
						var file_total_size_byte = 0;
						if(file_size_limit.indexOf('MB') != -1){
							var num = file_size_limit.substr(0,file_size_limit.length-2);
							file_size_limit_byte = Number(num)*1024*1024;
						}else if(file_size_limit.indexOf('KB') != -1){
							var num = file_size_limit.substr(0,file_size_limit.length-2);
							file_size_limit_byte = Number(num)*1024;
						}
						if(file_total_size.indexOf('MB') != -1){
							var num = file_total_size.substr(0,file_total_size.length-2);
							file_total_size_byte = Number(num)*1024*1024;
						}else if(file_total_size.indexOf('KB') != -1){
							var num = file_total_size.substr(0,file_total_size.length-2);
							file_total_size_byte = Number(num)*1024;
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
						if(allSize > file_total_size_byte){
							msg += "<font color='red'>所有文件大小之和超过限制("+file_total_size_byte+")</font><br/>";
						}
						if(msg){
							Ext.Msg.alert('上传提示',msg);
							return;
						}
						if (a.swfUploader && a.store.getCount() > 0
								&& a.swfUploader.getStats().files_queued > 0) {
							a.swfUploader.uploadStopped = false;
							a.swfUploader.startUpload();
							a.setBtnStatus(a, false);
						}
					}
				}, "-", {
					xtype : "button",
					itemId : "cancelBtn",
					icon : "icons/stop.png",
					text : "停止上传",
					disabled : true,
					handler : function(b) {
						var a = b.up("grid");
						if (a.swfUploader) {
							a.swfUploader.uploadStopped = true;
							a.swfUploader.stopUpload();
							a.setBtnStatus(a, true);
						}
					}
				}, "-", {
					xtype : "button",
					itemId : "removeBtn",
					icon : "icons/trash.gif",
					text : "清空列表",
					handler : function(e) {
						var d = e.up("grid");
						var b = d.getStore();
						var data = [];
						for (var c = 0; c < b.getCount(); c++) {
							var a = b.getAt(c);
							var f = a.get("id");
							d.swfUploader.cancelUpload(f, false);
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
				    					d.initProgressInfo();
				    					b.removeAll();
					          		}
				    			});
				    		}
						});	
						
					}
				},'-',{
					xtype:'button',
					icon : '../../images/help.png',
					text:'帮助',
					itemId : 'uploadHelp'
//					tooltip:'<font color="red">注：单个文件大小不能超过'+app.utils.AttachCodes.file_size_limit + '</br>' +
//							'所有文件大小之和不能超过' + app.utils.AttachCodes.file_total_size + '</font>'
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
	}],
	
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
        fields : ['id','fileUploadInfoId','name','type','size','percent','status','fileName','fileUrl','attrUser','fileId']
    }),
	
	listeners : {
		afterrender : function(a) {
			if (Ext.isEmpty(a.swfUploader) && a.forEdit) {
				a.swfUploader = new SWFUpload(a.getSWFConfig(a, a
								.down("toolbar button[itemId=addFileBtn]")));
				Ext.get(a.swfUploader.movieName).setStyle({
							position : "absolute",
							top : 0
						})
			}
		}
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
	progressInfo:{
			filesTotal : 0,
			filesUploaded : 0,
			bytesTotal : 0,
			bytesUploaded : 0,
			currentCompleteBytes : 0,
			lastBytes : 0,
			lastElapsed : 1,
			lastUpdate : null,
			timeElapsed : 1
		},
	initProgressInfo:function(){
		var d = this;
		var info = d.progressInfo;
		info.filesTotal = 0;
		info.bytesTotal = 0;
		info.filesUploaded = 0;
		info.bytesUploaded = 0;
		info.currentCompleteBytes = 0;
		info.lastBytes = 0;
		info.lastElapsed = 1;
		info.lastUpdate = null;
		info.timeElapsed = 1;
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
	updateProgressInfo : function() {
		var me = this;
		if(me.isProgressbar){
			var info = me.progressInfo;
			var speedAverage = Ext.util.Format.fileSize(Math.ceil(1000 * info.bytesUploaded / info.timeElapsed)) + '/s';
			var p = info.bytesUploaded / info.bytesTotal;
			p = p || 0;
			if(p > 1){
				p = 1;
			}
			var text = "正在上传中…… 已完成： " + Math.ceil(p * 100) + " % / 速度：" + speedAverage;
			if(p == 1){
				text = "上传完毕               已完成： " + Math.ceil(p * 100) + " % / 速度：" + speedAverage;
				me.initProgressInfo();
			}
			if(p == 0){
				text = "准备就绪……              已完成： " + Math.ceil(p * 100) + " % / 速度：" + speedAverage;
			}
			me.down('progressbar[itemId=upload_progressbar]').updateProgress(p,text);
		}
		
	},
	upload_progress_handler : function(file, bytesLoaded, bytesTotal){ 
		var me = this.settings.custom_settings.scope_handler;		
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		percent = percent == 100? 99 : percent;
       	var rec = me.store.getById(file.id);
       	rec.set('percent', percent);
		rec.set('status', file.filestatus);
		rec.commit();
		if(me.isProgressbar){
			me.progress_handler(file, bytesLoaded, bytesTotal);
		}
	},
	progress_handler:function(file, bytesLoaded, bytesTotal){
		var me = this;
		var info = me.progressInfo;
		var bytes_added = bytesLoaded -info.currentCompleteBytes;
		info.bytesUploaded += Math.abs(bytes_added < 0 ? 0 : bytes_added);
		info.currentCompleteBytes = bytesLoaded;
		if (info.lastUpdate) {
			info.lastElapsed = info.lastUpdate.getMilliseconds();
			info.timeElapsed += info.lastElapsed;
		}
		info.lastBytes = bytes_added;
		info.lastUpdate = new Date();
		me.updateProgressInfo();
	},
	file_queued_handler : function(a) {
		var b = this.settings.custom_settings.scope_handler;
		b.store.add({
					id : a.id,
					name : a.name,
					fileName : a.name,
					size : a.size,
					type : a.type,
					status : a.filestatus,
					percent : 0
				})
		b.progressInfo.filesTotal += 1;
		b.progressInfo.bytesTotal += a.size;
		b.updateProgressInfo();
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
		b.post_params.fileBillId = b.fileBillId;
		b.post_params.attrUser = b.attrUser;
		b.post_params.fileBillType = b.fileBillType;
		this.setPostParams(b.post_params);
	},
	upload_success_handler : function(b, a, c) {
		var d = this.settings.custom_settings.scope_handler;
		var e = d.store.getById(b.id);
		var outData = Ext.JSON.decode(a);
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
		d.updateProgressInfo();
	},
	
	file_queue_error_handler : function(a, c, b) {
		var d = "";
		switch (c) {
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED :
				d = "上传文件列表数量超限,不能选择！";
				break;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT :
				d = "文件大小超过" + this.settings.custom_settings.scope_handler.file_size_limit + "限制, 不能选择！";
				break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE :
				d = "该文件大小为0,不能选择！";
				break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE :
				d = "该文件类型不允许上传！";
				break
		}
		Ext.Msg.show({
					title : "提示",
					msg : d,
					width : 250,
					icon : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK
				});
	},
	
	getDataIds : function(params) {
		var values = [];
		var fileIds = [];
		this.store.each(function(item, index, count) {
			if(item.get('status') == -4) {
		    	values.push(item.get('fileUploadInfoId'));
		    	fileIds.push(item.get('fileId'));
			}
		});
		params.fileUploadInfoId = values;
		params.fileId = fileIds;
		return params;
	},
	getData : function() {
		var values = [];
		this.store.each(function(item, index, count) {
			if(item.get('status') == -4) {
		    	values.push(item.data);
			}
		});
		return values;
	},
	
	checkComplete : function() {
		var result = true;
		this.store.each(function(item, index, count) {
		    if(item.get('status') != -4){
		    	Ext.Msg.alert('提示','第'+(index+1)+'行,附件没有上传!');
	    		result = false;
	    		return;
		    }
		});
		return result;
	},
	
	checkBlock : function() {
		var result = true;
		var count = this.store.getCount();
		if(count == 0) {
			Ext.Msg.alert('提示','请上传附件!');
    		result = false;
		}
		return result;
	},
	
	reload : function() {
		this.getStore().reload();
	},
	setForEdit : function(isEdit){
		var me = this;
		var bbar = me.down('toolbar[dock=bottom]');
		var tbar = me.down('toolbar[dock=top]');
		if(Ext.isEmpty(tbar)){
			return;
		}

		if(isEdit){
			tbar.show();
			if(me.isProgressbar){
				if(!Ext.isEmpty(bbar)){
					bbar.show();
				}
			}else{
				if(!Ext.isEmpty(bbar)){
					bbar.hide();
				}
			}
		}else{
			tbar.hide();
			if(!Ext.isEmpty(bbar)){
				bbar.hide();
			}
		}
		me.columns[me.columns.length-1].items[0].isShow = isEdit;
	},
	initComponent : function() {
		try {
			var b = this;
			if(b.isProgressbar && b.forEdit){
				b.initProgressInfo();
				b.bbar = b.pbbar;
			}
			if(!b.forEdit) {
				b.dockedItems[0] = [];
			}else {
				b.dockedItems = b.toolbarItems;
			}
			b.columns[b.columns.length-1].items[0].isShow = b.forEdit;
			b.columns[b.columns.length-2].hidden = b.isHiddenUser;
			b.callParent(arguments);
			var store = b.getStore();
			store.on('beforeload', function (st, options) {
	            //beforeload之前附加查询参数
	            st.proxy.extraParams = {fileBillId:b.fileBillId, fileBillType:b.fileBillType};
	        });
		    var tooltip = '<font color="red" size="15px">注：单个文件大小不能超过[ '+b.file_size_limit + ' ]</br>' +
							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有文件大小之和不能超过[ ' + b.file_total_size + ' ]</br>' +
							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不允许上传的文件类型为[ ' + b.file_deny_types + ' ]</br>' +
							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如需修改文件大小限制或文件类型限制，请联系管理员</font>';
		   if(!Ext.isEmpty(b.down('button[itemId=uploadHelp]'))){
				 b.down('button[itemId=uploadHelp]').setTooltip(tooltip);
			}
		}catch (err) {
            if(console)    console.error(err);
        }
		
    	
	}
});