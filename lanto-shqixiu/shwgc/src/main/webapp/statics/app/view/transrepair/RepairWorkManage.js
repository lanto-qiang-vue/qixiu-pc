var iDownloadID=-1;
var tDownloadProcess=0;
var trNum=0;
Ext.define('app.view.transrepair.RepairWorkManage',{
	extend:'Ext.window.Window',
	alias: 'widget.transrepair.RepairWorkManage',
	itemId: 'transrepair.RepairWorkManage',
	config:{
		info:'',			//信息提示窗口的文字信息
		channelInfo:null,	//登录成功后从设备上获取的通道信息
		selChannel:0,		//用户在多窗口模式时选择的通道数，单窗口时值不改变
		winModel:4,			//窗口模式，如果为1单窗口模式时selChannel不改变，保留用户在多窗口模式时选择的通道数
		szIP : null,		//硬盘录像机局域网IP地址
		szPort:null,		//端口号，默认为80
		szUsername:null,	//用户名
		szPassword:null		//密码
	},
	title: '施工管理',
	listeners: {
		//窗口关闭前先停止预览
		close:function(){
			var me=this;
			if(me.config.channelInfo!=null){
				$.each(me.config.channelInfo, function (i) {
					var id = parseInt($(this).find("id").eq(0).text(), 10);
					WebVideoCtrl.I_Stop(id-1);
				});
			}
		}
	},
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','js.HKVideo.webVideoCtrl'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 900,
	border:false,
	height:550,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : {
				type:'vbox',
				pack:'start',
				align:'stretch'
			},
			itemId:'npanel',
			bodyPadding : 10,
			items:[me.topPanel(),me.bottomPanel()]
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
						itemId : 'getPicBtn',
						iconCls : 'icon-save blue',
						text : '抓图'
					},'-',{
						xtype : 'button',
						itemId : 'uploadBtn',
						iconCls : 'icon-save blue',
						text : '上传图片'
					},'-',{
						xtype : 'button',
						itemId : 'startBtn',
						iconCls : 'icon-save blue',
						text : '开 工'
					},'-', {
						xtype : 'button',
						itemId : 'endBtn',
						iconCls : 'icon-off red',
						text : '完 工',
						handler : function(btn) {
							btn.up('window').close();
						}
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-save blue',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
					}
				]
			} ];
		me.callParent(arguments);
		me.config.info='';
	},
	//上半部分面板
	topPanel : function(){
		var me=this;
		return {
			xtype:'panel',
			layout : {
				type:'hbox',
				pack:'start',
				align:'stretch'
			},
			border:false,
			flex:2,
			items:[me.baseInfoPanel(),me.videoPanel()]
		}
	},
	//下半部分面板
	bottomPanel : function(){
		var me=this;
		return {
			xtype:'panel',
			layout : {
				type:'hbox',
				pack:'start',
				align:'stretch'
			},
			border:false,
			flex:1,
			items:[me.picsPanel(),me.infoPanel()]
		}
	},
	//工单基本资料面板
	baseInfoPanel : function(){
		return {
		xtype: 'fieldset',
        title: '工单基本资料',
        padding:5,
        flex:1,
        items:{
			xtype : 'jsf.ModelContainer',
			model : 'app.model.transrepair.RepairRecordModel',
			layout: {
        		type: 'table',
        		columns: 1
    		},
    		labelWidth: 70,
			btns:[],
			items: [
				{fname:'RECORD_ID',hidden:true},
				{fname:'STATUS',hidden:true},
				{fname:'VEHICLE_ID',hidden:true},
				{fname:'PLATE_NUM',readOnly:true},
				{xtype:'datetimefield',name:'START_REPAIR_TIME',fieldLabel:'开工时间',allowBlank:true,readOnly:true},
				{xtype:'datetimefield',name:'END_REPAIR_TIME',fieldLabel:'完工时间',allowBlank:true,readOnly:true},
				{fname:'STATUS_',readOnly:true},
				{	
					xtype:'combo',
					name:'REPAIR_STATION',
					fieldLabel : '<font color="red"><sub><b>*</b></sub></font>维修工位',
	                editable:false,
	                store:Ext.getStore("sys_bd_station"),
	                displayField: 'STATION_NAME',  
	                valueField: 'STATION_ID',
	                queryMode: 'local',
	                allowBlank:false
	            },
	            {fname:'REPAIR_HAVE_TIME'}
			]}
		}
	},
	//施工录像面板
	videoPanel : function(){
		var me=this;
		return {
			xtype: 'fieldset',
	        title: '施工录像',
	        margin:'0 0 10 10',
	        flex:2,
	        layout:'fit',
	        items:[{
		        xtype:'panel',
				itemId:'map_position',
				html:'<div id="divPlugin"></div>',
				lbar:[{
					xtype: 'container',
					layout:{
						type: 'vbox',
						pack : 'start'
					},
					items:[{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '单画面',
						itemId: '1picBtn',
						margin:5,
						handler:function(btn){
							me.config.winModel=1;
							WebVideoCtrl.I_ChangeWndNum(1);
							$.each(me.config.channelInfo, function (i) {
								var id = parseInt($(this).find("id").eq(0).text(), 10);
								WebVideoCtrl.I_Stop(id-1);
							});
							setTimeout(function(){
								WebVideoCtrl.I_StartRealPlay('192.168.1.188', {
									iStreamType: 1,
									iChannelID: me.config.selChannel,
									bZeroChannel: false
								});
							},500);
						}
					},{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '四画面',
						itemId: '4picBtn',
						margin:5,
						handler:function(btn){
							me.config.winModel=4;
							WebVideoCtrl.I_ChangeWndNum(2);
							$.each(me.config.channelInfo, function (i) {
								var id = parseInt($(this).find("id").eq(0).text(), 10);
								WebVideoCtrl.I_Stop(id-1);
								me.doConn(id);
							});
						}
					},{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '九画面',
						itemId: '9picBtn',
						margin:5,
						handler:function(btn){
							me.config.winModel=9;
							WebVideoCtrl.I_ChangeWndNum(3);
							$.each(me.config.channelInfo, function (i) {
								var id = parseInt($(this).find("id").eq(0).text(), 10);
								WebVideoCtrl.I_Stop(id-1);
								me.doConn(id);
							});
						}
					},{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '回放录像',
						itemId: 'playBtn',
						margin:5,
						menu:{
					        items: [
					            {
					                text: '通道1',
					                handler: function () {
					                    me.StartPlayback(1);
					                }
					            }, {
					                text: '通道2',
					                handler: function () {
					                    me.StartPlayback(2);
					                }
					            }, {
					                text: '通道3',
					                handler: function () {
					                    me.StartPlayback(3);
					                }
					            }, {
					                text: '通道4',
					                handler: function () {
					                    me.StartPlayback(4);
					                }
					            }
					        ]
					    }
					},{
						xtype: 'button',
						iconCls: 'icon-search bigger-120 white',
						text : '录像下载',
						itemId: 'downloadBtn',
						margin:5,
						menu:{
					        items: [
					            {
					                text: '通道1',
					                handler: function () {
					                    me.searchRecord(1);
					                }
					            }, {
					                text: '通道2',
					                handler: function () {
					                    me.searchRecord(2);
					                }
					            }, {
					                text: '通道3',
					                handler: function () {
					                    me.searchRecord(3);
					                }
					            }, {
					                text: '通道4',
					                handler: function () {
					                    me.searchRecord(4);
					                }
					            }
					        ]
					    }
					}]
				}]
			}]
		}
	},
	//维修照片面板
	picsPanel : function(){
		return {
			xtype: 'fieldset',
	        title: '维修图片',
	        padding:5,
	        flex:2,
	        autoScroll : true,
	        items:[
	        	{
				xtype : 'dataview',
				//padding : '0 0 0 5',
				itemId : 'repairphoto',
				store : Ext.create('Ext.data.Store', {
					fields : ['IMAGE_ID','RECORD_ID','IMAGE_PATH','TAKE_TIME','IMAGE_INFO'],
					proxy: {
				    	actionMethods:{read:'POST'},
				        type: 'ajax',
				        reader: {
				            type: 'json',
				            root: 'data'
				        },
				        url: 'transrepair/repairphoto/photolist'
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
	},
	infoPanel : function(){
		return {
			xtype: 'fieldset',
	        title: '提示信息',
	        margin:'0 0 10 10',
	        flex:1.8,
	        layout:'fit',
	        items:[{
		        xtype:'panel',
				itemId:'info',
				html:'',
				border:false,
				autoScroll :true
	        }]
		}
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var data=me.down('form').getValues();
		//加载维修图片
		var store = me.down('dataview[itemId=repairphoto]').getStore();
		store.proxy.extraParams.RECORD_ID=data.RECORD_ID;
		store.load();
		if(data.STATUS=='10161001'){
			me.down('#endBtn').setDisabled(true);
			me.down('#playBtn').hide();
		}else if(data.STATUS=='10161002'){
			me.down('#startBtn').setDisabled(true);
			me.down('#playBtn').hide();
			me.down('#downloadBtn').hide();
		}else{
			me.down('#startBtn').hide();
			me.down('#endBtn').hide();
			me.down('#uploadBtn').hide();
			me.down('#getPicBtn').hide();
			me.down('#1picBtn').hide();
			me.down('#4picBtn').hide();
			me.down('#9picBtn').hide();
		}
		//加载视频
		var url = 'client/corp/tbcorpvideoset/getModel';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				me.config.szIP = ret.data.LOCAL_IP;
				me.config.szPort = ret.data.PORT;
				me.config.szUsername = ret.data.USER_NAME;
				me.config.szPassword = ret.data.PSW;
				if(data.STATUS=='10161001' || data.STATUS=='10161002'){
					me.initVideo(2);
					setTimeout(function(){
						if(me.config.channelInfo!=null){
							$.each(me.config.channelInfo, function (i) {
								var id = parseInt($(this).find("id").eq(0).text(), 10);
								me.doConn(id);
							});
						}
					},1000);
				}else{
					me.initVideo(1);
				}
			}
		});
	},
	//初始化视频插件
	initVideo : function(winType){
		var me=this;
		// 检查插件是否已经安装过
		if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
			alert("您还未安装过插件，在登录页面下载控件进行安装！");
			return;
		}
		
		// 初始化插件参数及插入插件
		WebVideoCtrl.I_InitPlugin(445, 265, {
	        iWndowType: winType,
			cbSelWnd: function (xmlDoc) {
				g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
				if(me.config.winModel!=1){		//单窗口模式selChannel不改变
					me.config.selChannel=parseInt(g_iWndIndex)+1;
				}
			}
		});
		WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
		// 检查插件是否最新
		/*if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
			alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
			return;
		}*/
		
		var szIP = me.config.szIP;
		var szPort = me.config.szPort;
		var szUsername = me.config.szUsername;
		var szPassword = me.config.szPassword;

		var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
			success: function (xmlDoc) {
				me.config.info=me.config.info+szIP+'登录成功！</br>';
				me.down('#info').update(me.config.info);
				setTimeout(function () {
					me.getChannelInfo(szIP);
				}, 100);
				return true;
			},
			error: function () {
				me.config.info=me.config.info+szIP+'登录失败！</br>';
				me.down('#info').update(me.config.info);
				return false;
			}
		});
	
		if (-1 == iRet) {
			return true;
		}
	},
	//视频通道预览
	doConn : function(iChannelID){
		var me=this;
		//WebVideoCtrl.I_ChangeWndNum(3);	//窗口分隔，1：单窗口，2：四画面，3：九画面，4：十六画面
		szIP = me.config.szIP,
		iStreamType = 1,
		bZeroChannel = false,
		szInfo = "";
		if ("" == szIP) {
			return;
		}
		var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
			iStreamType: iStreamType,
			iWndIndex:iChannelID-1,
			iChannelID: iChannelID,
			bZeroChannel: bZeroChannel
		});
		if (0 == iRet) {
			me.config.info=me.config.info+'通道'+iChannelID+'预览成功！</br>';
			me.down('#info').update(me.config.info);
		} else {
			me.config.info=me.config.info+'通道'+iChannelID+'预览失败！</br>';
			me.down('#info').update(me.config.info);
		}
	},
	getChannelInfo : function(szIP){
		// 模拟通道
		var me=this;
		WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
			async: false,
			success: function (xmlDoc) {
				me.config.channelInfo = $(xmlDoc).find("VideoInputChannel");
				me.config.info=me.config.info+szIP+' 获取模拟通道成功！</br>';
				me.down('#info').update(me.config.info);
			},
			error: function () {
				me.config.info=me.config.info+szIP+' 获取模拟通道失败！</br>';
				me.down('#info').update(me.config.info);
			}
		});
	},
	// 开始回放
	StartPlayback : function(channel) {
		var me=this;
		var startTime=me.down('form').getValues().START_REPAIR_TIME;
		var endTime=me.down('form').getValues().END_REPAIR_TIME;
		var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
			szIP = me.config.szIP,
			bZeroChannel =  false,
			iChannelID = channel,
			szStartTime = startTime,
			szEndTime = endTime,
			iRet = -1;
	
		if ("" == szIP) {
			return;
		}
	
		if (bZeroChannel) {// 零通道不支持回放
			return;
		}
	
		if (oWndInfo != null) {// 已经在播放了，先停止
			WebVideoCtrl.I_Stop();
		}
		
		iRet = WebVideoCtrl.I_StartPlayback(szIP, {
			iChannelID: iChannelID,
			szStartTime: szStartTime,
			szEndTime: szEndTime
		});
	
		if (0 == iRet) {
			me.config.info=me.config.info+szIP+' 开始回放成功！</br>';
			me.down('#info').update(me.config.info);
		} else {
			me.config.info=me.config.info+szIP+' 开始回放失败！</br>';
			me.down('#info').update(me.config.info);
		}
	},
	//下载录像窗口加载数据
	searchRecord : function(channel){
		var me=this;
		var startTime=me.down('form').getValues().START_REPAIR_TIME;
		var endTime=me.down('form').getValues().END_REPAIR_TIME;
		var html='<div class="searchdiv">'+
					'<table id="searchlist" class="searchlist" cellpadding="0" cellspacing="0" border="0"></table>'+
				'</div>';
		me.down('#info').update(html);
		$("#searchlist").on('click','.starttoDownloadrecord',function(){
			var code = $(this).attr("data-code");
			me.clickStartDownloadRecord(code);
			trNum=code;
		});
		var szIP = me.config.szIP,
			iChannelID = channel,
			bZeroChannel = false,
			szStartTime = startTime,
			szEndTime = endTime;
	
		if ("" == szIP) {
			return;
		}
	
		/*if (bZeroChannel) {// 零通道不支持录像搜索
			return;
		}
	
		if (0 == iType) {// 首次搜索
			$("#searchlist").empty();
			iSearchTimes = 0;
		}*/
		var iSearchTimes = 0;
		WebVideoCtrl.I_RecordSearch(szIP, iChannelID, szStartTime, szEndTime, {
			iSearchPos: iSearchTimes * 40,
			success: function (xmlDoc) {
				console.log(xmlDoc);
				if("MORE" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
					
					for(var i = 0, nLen = $(xmlDoc).find("searchMatchItem").length; i < nLen; i++) {
						var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
						if(szPlaybackURI.indexOf("name=") < 0) {
							break;
						}
						var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
						var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
						var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));
	
						var objTr = $("#searchlist").get(0).insertRow(-1);
						var objTd = objTr.insertCell(0);
						objTd.id = "downloadTd" + i;
						objTd.innerHTML = iSearchTimes * 40 + (i + 1);
						objTd = objTr.insertCell(1);
						objTd.width = "30%";
						objTd.innerHTML = szFileName;
						objTd = objTr.insertCell(2);
						objTd.width = "30%";
						objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
						objTd = objTr.insertCell(3);
						objTd.width = "30%";
						objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
						objTd = objTr.insertCell(4);
						objTd.width = "10%";
						objTd.innerHTML = "<a class=\"starttoDownloadrecord\" data-code=\"" + i +"\" href='javascript:;' >下载</a>";
						objTd = objTr.insertCell(5);
						objTd.width = "10%";
						objTd.innerHTML = "<div id='downProcess"+i+"' class='freeze'></div>";
						$("#downloadTd" + i).data("playbackURI", szPlaybackURI);
					}
					iSearchTimes++;
					clickRecordSearch(1);// 继续搜索
				} else if ("OK" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
					var iLength = $(xmlDoc).find("searchMatchItem").length;
					for(var i = 0; i < iLength; i++) {
						var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
						if(szPlaybackURI.indexOf("name=") < 0) {
							break;
						}
						var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
						var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
						var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));
	
						var objTr = $("#searchlist").get(0).insertRow(-1);
						var objTd = objTr.insertCell(0);
						objTd.width = "10%";
						objTd.id = "downloadTd" + i;
						objTd.innerHTML = iSearchTimes * 40 + (i + 1);
						objTd = objTr.insertCell(1);
						objTd.width = "30%";
						objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
						objTd = objTr.insertCell(2);
						objTd.width = "30%";
						objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
						objTd = objTr.insertCell(3);
						objTd.width = "10%";
						objTd.innerHTML = "<a href='javascript:;' class=\"starttoDownloadrecord\" data-code=\"" + i +"\" >下载</a>";
						objTd = objTr.insertCell(4);
						objTd.width = "10%";
						objTd.innerHTML = "<div id='downProcess"+i+"' class='freeze'></div>";
						$("#downloadTd" + i).data("playbackURI", szPlaybackURI);
					}
					alert(szIP + " 搜索录像文件成功！");
				} else if("NO MATCHES" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
					setTimeout(function() {
						alert(szIP + " 没有录像文件！");
					}, 50);
				}
			},
			error: function () {
				alert(szIP + " 搜索录像文件失败！");
			}
		});
	},
	// 下载进度
	downProcess:function() {
		var me=this;
		var iStatus = WebVideoCtrl.I_GetDownloadStatus(iDownloadID);
		if (0 == iStatus) {
			var iProcess = WebVideoCtrl.I_GetDownloadProgress(iDownloadID);
			if (iProcess < 0) {
				clearInterval(tDownloadProcess);
				tDownloadProcess = 0;
				m_iDownloadID = -1;
			} else if (iProcess < 100) {
				$("#downProcess"+trNum).text(iProcess + "%");
			} else {
				$("#downProcess"+trNum).text("100%");
				setTimeout(function () {
					$("#downProcess"+trNum).remove();
				}, 1000);
	
				WebVideoCtrl.I_StopDownloadRecord(iDownloadID);
	
	            		alert("录像下载完成");
				clearInterval(tDownloadProcess);
				tDownloadProcess = 0;
				m_iDownloadID = -1;
			}
		} else {
			WebVideoCtrl.I_StopDownloadRecord(iDownloadID);
	
			clearInterval(tDownloadProcess);
			tDownloadProcess = 0;
			iDownloadID = -1;
		}
	},
	getImageBtn:function(){
		var me = this;
		return {
			xtype:'pluploadbutton',
	        text: '添加照片',
	        iconCls: 'icon-picture bigger-120 blue',
	        pluploadConfig:{       	
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : 'newpartid',
				url :  '../transrepair/partslist/uploadImage',
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
							form.getForm().findField('IMAGE_PATH').setValue(data.data);
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
	clickStartDownloadRecord:function(i){
		var me=this;
		var szIP = me.config.szIP,
			szChannelID = 1,
			szFileName = szIP + "_" + szChannelID + "_" + new Date().getTime(),
			szPlaybackURI = $("#downloadTd" + i).data("playbackURI");
	
		if ("" == szIP) {
			return;
		}
	
		iDownloadID = WebVideoCtrl.I_StartDownloadRecord(szIP, szPlaybackURI, szFileName);
		if (iDownloadID < 0) {
			var iErrorValue = WebVideoCtrl.I_GetLastError();
			if (34 == iErrorValue) {
				showOPInfo(szIP + " 已下载！");
			} else if (33 == iErrorValue) {
				showOPInfo(szIP + " 空间不足！");
			} else {
				showOPInfo(szIP + " 下载失败！");
			}
		} else {
			//$("<div id='downProcess' class='freeze'></div>").appendTo("body");
			tDownloadProcess = setInterval(me.downProcess, 1000);
		}
	}
	
});
