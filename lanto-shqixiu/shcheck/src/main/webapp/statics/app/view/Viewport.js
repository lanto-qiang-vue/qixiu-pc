Ext.define('app.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout: 'border',
	id:'manage_viewport',
	requires:[
			'app.store.FuncPower',
   			'app.store.FuncButton',
   			'app.store.BelongArea'],
	listeners:{
		afterrender:function(){
			Ext.get('appOverlay').hide();
			var url = 'check/sys/common/getLoginUser';
			// 将全局登陆用户变量放入全局变量中
			app.utils.AjaxCallbackUtil.asyncCall(url,{}, function (Obj) {
				Ext.get('login_user_text').setHTML('<span data-qtip="' + Obj.data.USER_NAME + '">' + Obj.data.USER_NAME + '（'+Obj.data.CORP_NAME+'）</span>');
				if(Obj.data.NO_SEE_NOTICE_NUM!=0){
					Ext.get('noSeeNoticeNum').setHTML(Obj.data.NO_SEE_NOTICE_NUM);
				}else{
					Ext.get('noSeeNoticeNum').hide();
				}
				Ext.get('noticeNum').setHTML(Obj.data.NOTICE_NUM);
				// 添加登陆用户到viewPort上
				window['GL'] = {
					name : Obj.data.USER_NAME,
					userCode: Obj.data.USER_CODE,
					userArea : Obj.data.CORP_AREA,
					corpName:Obj.data.STATION_NAME,
					corpId:Obj.data.CORP_ID
				};	
			});
		}
	},
	items : [{
		xtype:'panel',
		itemId:'menuPanel',
		border:false,
		region : 'west',
		width:96,
		layout:'fit',
		items:[{
			xtype:'dataview',
			itemId:'leftMenu',
		//	autoScroll:true,
			store: Ext.create('app.store.CreateMenu'),
        	tpl: new Ext.XTemplate(app.utils.ButtonUtils.gptpl),
        	multiSelect: false,
            height: "100%",
            itemSelector: ".menu1",
		    selectedItemCls: 'current',
		    trackOver: true,
		    listeners: {
//		    	afterrender:function(view){
//                	var mydsktpl = '<i class="{0} bigger-150 blue"></i> {1}';
//                	Ext.create('Ext.tip.ToolTip', {
//			            target: view.el,
//			            delegate: view.itemSelector,
//			            trackMouse: true,
//			            renderTo: Ext.getBody(),
//			            anchor: 'left',
//			            listeners: {
//			                beforeshow: function(tip) {
//			                    var record = view.getRecord(tip.triggerElement);
//			                    var icon = record.get('iconFont');
//			                    tip.update(Ext.String.format(mydsktpl, icon, record.get('funcName')))
//			                }
//			            }
//			        });
//              },
		    	beforecontainerclick:function(){return false;}
		    	
		    }
		}]
	},{
		xtype:'container',
		//title:'菜单',
		region : 'center',
		layout:'border',
		items:[{
			xtype:'container',
			region : 'north',
			height:60,
			style:'background:#fff;',
			html:['<div class="header_manage">',
			        '<div class="header_wrap_manage">',
			        '<span class="h2-spec">上海市机动车维修公共服务平台.<span style="font-size:18px;">' + taskutils.appInfos.title + '</span></span>',
			        '<ul class="options">',
//			        	'<li class="app-center menu1" code="WBM_APPCENTER">',
//			                '<a href="javascript:void(0);"><i></i><span class="new-con-p new-con">应用中心</span></a>',
//			            '</li>',
			        	'<li class="info menu1" code="WBM_MESSAGE"><i></i><span class="infoNum hide" style="display: inline;" id="noSeeNoticeNum"></span><span class="new-con-p">通知</span>',
			        		'<ul class="container">',
			                    '<div id="newMessageDIV" style="display:none"></div> ',
			                    //'<li class="menu2" code="WBM_MESSAGE_BUSNESS"><a class="new-con" href="javascript:void(0);">业务消息 <span class="businessMessageNum hidden" style="display: none;">（<em class="red"></em>）</span></a></li>',
			                    '<li class="menu2" onclick="app.utils.ButtonUtils.openNotice();" code="WBM_MESSAGE_SYSTEM"><a class="new-con">系统通知 <span class="systemMessageNum hidden" style="display: inline;">（<em class="red" id="noticeNum"></em>）</span></a></li>',
			                    //'<li class="menu2" code="WBM_MESSAGE_UPDATE"><a class="new-con" href="javascript:void(0);">升级公告 <span class="updateMessageNum hidden" style="display: none;">（<em class="red"></em>）</span></a></li>',
			        		'</ul>',
			        	'</li>',
			        	'<li class="user menu1" code="WBM_ACCOUNT"><span class="bindMobile"></span><span class="renewal"></span><i></i><span class="userName" id="login_user_text"></span><span class="new-con-p"></span>',
			        		'<ul class="container">',
				            //'<li class="menu2" code="WBM_ACCOUNT_MYACCOUNT"><a class="new-con" href="javascript:void(0);">我的账号</a></li>',
				            '<li onclick="Ext.create(\'app.view.common.UpPassWin\');"><a class="new-con">修改密码</a></li>',
				            '<li onclick="app.utils.ButtonUtils.exit();">',
			    				'<a class="new-con">安全退出</a>',
							'</li>',
			        		'</ul>',
			        	'</li>',
			        	/*'<li class="setting menu1" code="WBM_SETTING"><i></i><span class="new-con-p">设置</span>',
			        		'<ul class="container">',
			        			'<li class="menu2" code="WBM_SETTING_COMPANY"><a class="new-con" href="javascript:void(0);">参数设置</a></li>',
			        			'<!-- <li class="menu2" code="WBM_SETTING_APP_INTERFACE"><a class="new-con" href="javascript:void(0);">应用接口</a></li> -->',
			        			'<li class="menu2" code="WBM_SETTING_OPERATION_LOG"><a class="new-con" href="javascript:void(0);">操作日志</a></li>',
			        		'</ul>',
			        	'</li>',*/
			        	'<li class="headerService menu1" code="WBM_CS"><i></i><span class="new-con-p">帮助</span>',
			        		'<ul class="container">',
			        			'<li class="menu2" onclick="location.href =\'tencent://message/?uin=382091727&amp;Site=sc.chinaz.com&amp;Menu=yes\'"><a class="new-con">在线客服</a></li>',
			                    '<li class="menu2" onclick="location.href=\'http://www.xzinfo.com.cn/download/jcd_manual.docx\'"><a class="new-con header-quickStart">系统帮助</a></li>',
			        			//'<li class="tel">020-xxxx-xxx<br/>星期一至星期五 <br/>8：30-17：30 <br/>（法定节假日除外）</li>',
			        		'</ul> ',
			        	'</li>',
			        '</ul>',
			        '</div>',
			   ' </div>'].join('')
		},{
			xtype : 'tabpanel',
			region : 'center',
			itemId : 'maintabs',
			layout: 'fit',
			border : 0,
			plugins: [Ext.create('plugin.tabclosemenu', {
				closeTabText: '关闭当前',  
				closeOthersTabsText: '关闭其他界面',  
				closeAllTabsText: '关闭所有'  
			})]
		}]
	},{
		xtype : 'container',
		region : 'south',
		itemId : 'bottom_text',
		border : 0,
		height : 28,
		baseCls: bodyStyle,
		html:'<div style="padding-top:4px;background-color: #e2eff8;color: #0e8ae4;" align= "center">' +
				' Copyright © 2017 LanSu All Rights Reserved.  上海蓝速汽车技术有限公司 版权所有</div>',
		layout : {
			type : 'hbox',
			pack : 'end',
			align: 'middle'
		},
		items:[
//			{
//				xtype:'displayfield',
//				value:'风格:',
//				margin: '1 0 1 1',
//				fieldCls:fieldCls
//			},{
//                xtype: 'combo',
//                rtl: false,
//                width: 120,
//                fieldCls:fieldCls,
//                labelWidth: 40,
//                displayField: 'name',
//                valueField: 'value',
//                margin: '1 5 1 1',
//                store: Ext.create('Ext.data.Store', {
//                    fields: ['value', 'name'],
//                    data : [
//                    	{ value: 'classic', name: 'Classic' },
//                        { value: 'access', name: 'Accessibility' },
//                        { value: 'neptune', name: 'Neptune' },
//                        { value: 'gray', name: 'Gray' }
//                    ]
//                }),
//                value: themes,
//                listeners: {
//                    change: function(combo) {
//                        var theme = combo.getValue();
//                        changeStyle(theme);
//                    }
//                }
//            }
            ]
			
		}],

	initComponent : function() {
		var me = this;
		me.callParent();
		var tabPanel = me.down('panel[itemId=maintabs]');
		
        var todoPanel = Ext.create('Ext.panel.Panel',{
        	itemId: 'client.HomePageMngPanel',
        	border:false,
        	title: '<i class="icon-home bigger-120"></i> 首 页'
        });        
        tabPanel.add(todoPanel); 
        tabPanel.setActiveTab(todoPanel);
        tabPanel.on('tabchange',function(tbpanel, newCard, oldCard, eOpts){
        	var store = me.down('#leftMenu').getStore();
        	var node = store.findRecord('funcId',newCard.topLevel + '');
        	if(node){
        		me.down('#leftMenu').getSelectionModel().select(node);
        	}else{
        		me.down('#leftMenu').getSelectionModel().deselectAll();
        	}
        });
		
		Ext.create("widget.uxNotification", {
	        title: '信息提示',
	        corner: "br",
	        width:250,
	        height:120,
	        stickOnClick: false,
	        iconCls: "info_a_icon",
	        manager: "desktop",
	        html: '<i class="icon-hand-right bigger-120 blue"></i> 上海市机动车维修公共服务平台  <br>初始化完成!'
	    }).show();
	    
	    // 加载字典
		app.utils.DictUtil.loadDicts('check/sys/common/dict', {},
				'app.model.common.Dict');
		app.utils.TaskUtils.exeTask();
	},
	
	buildMenu : function(){},

	getCommonMenu : function(){}
});
