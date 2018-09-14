Ext.define('app.view.transrepair.RepairWorkManage',{
	extend:'Ext.window.Window',
	alias: 'widget.transrepair.RepairWorkManage',
	itemId: 'transrepair.RepairWorkManage',
	title: '施工管理',
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
			items:[me.topPanel(),me.picsPanel()]
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
						itemId : 'connBtn',
						iconCls : 'icon-save blue',
						text : '连接'
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
			flex:1.7,
			items:[me.baseInfoPanel(),me.videoPanel()]
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
				{xtype:'datetimefield',name:'START_REPAIR_TIME',fieldLabel:'开工时间',allowBlank:false,readOnly:true},
				{xtype:'datetimefield',name:'END_REPAIR_TIME',fieldLabel:'完工时间',allowBlank:false,readOnly:true},
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
		return {
			xtype: 'fieldset',
	        title: '施工录像',
	        margin:'0 0 10 10',
	        flex:2,
	        layout:'fit',
	        items:[{
		        xtype:'panel',
				itemId:'map_position',
				html:'<div id="divPlugin"></div>'
			}]
		}
	}, 
	//维修照片面板
	picsPanel : function(){
		return {
			xtype: 'fieldset',
	        title: '维修图片',
	        padding:5,
	        flex:1,
	        items:[
	        	{
				xtype : 'dataview',
				autoScroll : true,
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
		                        '<div class="thumb" data-qtip="双击查看图片"><img src="{IMAGE_PATH:this.formatSrc}" height="90"></div>',
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
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var data=me.down('form').getValues();
		if(data.STATUS=='10161001'){
			me.down('#endBtn').setDisabled(true);
		}else if(data.STATUS=='10161002'){
			me.down('#startBtn').setDisabled(true);
		}else{
			me.down('#startBtn').setDisabled(true);
			me.down('#endBtn').setDisabled(true);
		}
		//加载维修图片
		var store = me.down('dataview[itemId=repairphoto]').getStore();
		store.proxy.extraParams.RECORD_ID=data.RECORD_ID;
		store.load();
		me.initVideo();
	},
	//初始化视频插件
	initVideo : function(){
		// 检查插件是否已经安装过
		if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
			alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
			return;
		}
		
		// 初始化插件参数及插入插件
		WebVideoCtrl.I_InitPlugin(300, 200, {
	        iWndowType: 1,
			cbSelWnd: function (xmlDoc) {
				g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
				var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
				//alert(szInfo);
			}
		});
		WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
	
		// 检查插件是否最新
		if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
			alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
			return;
		}
		
		var szIP = '192.168.1.188',
		szPort = '80',
		szUsername = 'admin',
		szPassword = 'admin123456';

		var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
			success: function (xmlDoc) {
				alert('登录成功');
			},
			error: function () {
				alert('登录失败');
			}
		});
	
		if (-1 == iRet) {
			alert('已经登录');
		}
	}
	
});
