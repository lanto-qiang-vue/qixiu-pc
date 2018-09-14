Ext.define('app.view.sys.HomePageMngPanel',{
	extend : 'Ext.form.Panel',
	alias : 'widget.sys.HomePageMngPanel',
	itemId : 'sys.HomePageMngPanel',
	requires:['Ext.chart.*'],
	cls:'allnoIconTree',
	layout: {
        type: "table",
        columns: 3
    },
    autoScroll:true,
	defaults: {
		bodyPadding : '0 3 3 3',
        frame: false,
        width: 500,
        height: 170,
        margin: "5 0 0 5",
        tools:[{
	        	type:'search',
	        	tooltip: '查看更多',
	        	handler: function(event, toolEl, panel){
		        	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        	me.toMore(this);
		    	}
	    	},{
			    type:'refresh',
			    tooltip: '刷新',
			    handler: function(event, toolEl, panel){
			    	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        	me.reLoad(this);
		    	}
		}]
    },
    items:[{
            title: "用户登录信息",
            collapsible: true,
            tools:[{
	        	type:'search',
	        	tooltip: '查看最近操作记录',
	        	handler: function(event, toolEl, panel){
		        	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        	me.toMore(this);
		    	}
	    	}],
            id: "sya",
            itemId:'sya',
            iconCls: "info_a_icon"
        }, {
            title: "公众查询网及手机APP下载",
            id: "syb",
            tools:[],
            itemId:'syb',
            collapsible: true,
            iconCls: "info_b_icon",
            html:'<div style="align:center;margin:2px 2px 2px 2px;font-size:11px;color:#8E8E8E;">扫描二维码进入上海市机动车维修行业综合管理公众查询网，点击右边图标下载手机APP</div>'
            		+ '<div style="bottom: -1px;border-bottom: 1px solid #848484;" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>'
            		+ '<div style="align:center;text-align:center;">' +
            			'<table align="center" width="35%">' +
            				'<tr>' +
	            				'<td algin="right" width="50%">' +
	            					'<div style="width:70px;height:70px;margin:3px 10px 10px 0px;align:center;">' +
	            					'<img src="images/ptqrshow.png" style="width:80px;height:80px;"/>' +
	            					'<div style="font-size:11px;">公众查询网</div>' +
	            					'</div>' +
	            				'</td>' +
	            				'<td align="left" width="30%">' +
	            					'<div onclick="window.open(\'js/plugin/Setup.exe\');" class="appdiv" onmouseover="this.className=\'appdiv_move\'" onmouseout="this.className=\'appdiv\'" >' +
			            				'<div style="width:45px;height:45px;font-size:23px;text-align:center;margin:6px 10px; "><i class="icon-paste bigger-200 blue"></i></div>' +
			            				'<span style="font-size:11px;">下载插件</span>' +
			            			'</div>' +
	            				'</td>' +
	            				'<td align="left" width="35%">' +
	            					'<div onclick="window.open(\'http://121.8.227.203:811/apk/JwApp.apk\');" class="appdiv"  style="margin-top:3px;width:80px;height:80px;">' +
			            			//	'<div style="width:45px;height:45px;font-size:23px;text-align:center;margin:6px 10px; "><i class="icon-android bigger-200 blue"></i></div>' +
			            			//	'<span style="font-size:11px;">下载手机APP</span>' +
			            				'<img src="images/downapp.png" style="width:80px;height:80px;"/>' +
			            				'<div style="font-size:11px;">下载手机APP</div>' +
			            			'</div>' +
	            				'</td>' +
            				'</tr>' +
            			'</table>' +
            		'</div>'
        }, {
            title: "待办事项",
            xtype:'panel',
            id: "syc",
            margin: "5 5 0 5",
            tools:[{
			    type:'refresh',
			    tooltip: '刷新',
			    handler: function(event, toolEl, panel){
			    	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        	me.reLoad(this);
		    	}
			}],
            itemId:'syc',
            width: 600,
            collapsible: true,
            iconCls: "info_b_icon",
            layout:'fit',
			xtype:'treepanel',
        	rootVisible : false,
			useArrows : true,
            multiSelect: false,
      		bodyPadding: 2
        }, {
            title: "最新待办任务",
            id: "syd",
            itemId:'syd',
            collapsible: true,
            iconCls: "history_button",
            width: 600,
            height: 210,
            colspan: 2
        }, {
            title: "最新通知",
            id: "sye",
            itemId:'sye',
            collapsible: true,
            icon: "images/menus/1001.png",
            width: 600,
            height: 210
        },{
        	title: "企业地图",
            id: "syf",
            itemId:'syf',
            tools:[{
            		type:'gear',
            		tooltip:'修改位置信息',
            		handler: function(event, toolEl, panel){
			        	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        		me.toMore(this);
			    	}
            },{
				    type:'refresh',
				    tooltip: '刷新',
				    handler: function(event, toolEl, panel){
			        	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        		me.reLoad(this);
			    	}
			}],
            collapsible: true,
            icon: "images/menus/1002.png",
            width: 600,
            height: 300,
            frame: false,
            colspan: 2
           // html:'<iframe height="100%" width="100%" src="client/corp/tbcorpposition/position" scrolling="yes" frameborder="0" id="bmapHomeFrame" name="bmapHomeFrame"></iframe>'

    },{
        	title: '<i class="icon-rss bigger-120"></i> 最新行业管理信息',
            id: "syg",
            itemId:'syg',
            tools:[{
				    type:'refresh',
				    tooltip: '刷新',
				    handler: function(event, toolEl, panel){
			        	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        		me.reLoad(this);
			    	}
			}],
            collapsible: true,
            width: 600,
            height: 300,
            frame: false
    }],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.on('resize',function(B, C, D){
			if (!Ext.isEmpty(Ext.getCmp("sya"))) {
                var E = (C - 38) / 4;
                var H = D - 410;
                if(D > 593){
                	E = (C - 25) / 4;
                	H = D - 400;
                }
                Ext.getCmp("sya").setWidth(E);
                Ext.getCmp("syb").setWidth(E);
                Ext.getCmp("syc").setWidth(E * 2);
                Ext.getCmp("syd").setWidth(E * 2 + 5);
                Ext.getCmp("sye").setWidth(E * 2);
                Ext.getCmp("syf").setWidth(E * 2 + 5);
                Ext.getCmp("syg").setWidth(E * 2);

                if (H < 200) {
                    H = 195
                };
                Ext.getCmp("syf").setHeight(H-5);
                Ext.getCmp("syg").setHeight(H-5);
            }
		});
	},
	loadData:function(){
		var me = this;
//		app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/sys/homepage/getHomePage',null,function(ret){
//			if(ret.success){
//				//Ext.getCmp("syc").update(ret.data.C);
//				var tree = Ext.getCmp("syc");
//				tree.setRootNode(ret.data.C);
//				tree.expandAll();
//				Ext.getCmp("syd").update(ret.data.D);
//				Ext.getCmp("sye").update(ret.data.E);
//				Ext.getCmp("syg").update(ret.data.G);
//				var A = ret.data.A;
//				var T = Ext.Date.format(new Date(), "Y-m-d H:i");
//				var ahtml = '<ul class="ListTitle">';
//				ahtml = ahtml + '<li class="homepage-info" title="' + A.USER_CODE + '"><span style="float:left;width:25px;"><i class="icon-lock bigger-180 blue"></i></span> 登录帐号：<span class="blue font-bold">' + A.USER_CODE + '</span></li>';
//				ahtml = ahtml + '<li class="homepage-info" title="' + A.USER_NAME + '"><span style="float:left;width:25px;"><i class="icon-user bigger-160 blue"></i></span> 用户姓名：<span class="blue font-bold">' + A.USER_NAME + '</span></li>';
//				ahtml = ahtml + '<li class="homepage-info" title="' + A.CORP_NAME + '"><span style="float:left;width:25px;"><i class="icon-sitemap bigger-160 blue"></i></span> 所属企业：<span class="blue font-bold">' + A.CORP_NAME + '</span></li>';
//				ahtml = ahtml + '<li class="homepage-info" title="' + app.utils.FunUtils.findAreaByCode(A.BLONG_AREA) + '"><span style="float:left;width:25px;"><i class="icon-map-marker bigger-160 blue"></i></span> 所属辖区：<span class="blue font-bold">' + app.utils.FunUtils.findAreaByCode(A.BLONG_AREA) + '</span></li>';
//				ahtml = ahtml + '<li class="homepage-info" title="' + T + '"><span style="float:left;width:25px;"><i class="icon-time bigger-170 blue"></i></span> 登录时间：<span class="blue font-bold">' + T + '</span></li></ul>';
//				Ext.getCmp("sya").update(ahtml);
//			}
//		});
	},
	reLoad : function(btn){
		var me = this;
		var panel = btn.up('panel');
		var id = panel.id;
		if(id == 'syf'){
			panel.setLoading('读取中...');
            Ext.defer(function() {
                panel.setLoading(false);
            }, 500);
			panel.update('<iframe height="100%" width="100%" src="client/corp/tbcorpposition/position" scrolling="yes" frameborder="0" id="bmapHomeFrame" name="bmapHomeFrame"></iframe>');
		}else if(id == 'syb'){
			panel.setLoading('读取中...');
            Ext.defer(function() {
                panel.setLoading(false);
            }, 1000);
		}else{
			panel.setLoading('读取中...');
			app.utils.AjaxCallbackUtil.ajaxLoadingCallback('client/sys/homepage/' + id,null,panel,function(ret){
				if(ret.success){
					if(id == 'syc'){
						var tree = Ext.getCmp("syc");
						tree.setRootNode(ret.data);
						tree.expandAll();
					}else{
						Ext.getCmp(id).update(ret.data);
					}
					panel.setLoading(false);
				}
			});
		}
	},toMore : function(btn){
		var me = this;
		var panel = btn.up('panel');
		var id = panel.id;
		var tabPanel = Ext.ComponentQuery.query('panel[itemId=maintabs]')[0];
		if(id == 'syd'){
			var win = Ext.create('app.view.common.ToDoWin',{iconCls: "history_button"});
			win.show();
			win.loadData();
		}else if(id == 'sya'){
			var win = Ext.create('app.view.sys.TqSysOperateLogWin',{iconCls: "info_b_icon"});
			win.show();
			win.loadData();
		}else if(id == 'sye'){
			var ctrl = app.app.getController('notice.TbNoticeReceiveCtrl');
			var tp = tabPanel.getComponent('notice.TbNoticeReceiveMngPanel');
			if(tabPanel.items.getCount()>=10 && Ext.isEmpty(tp)){
				Ext.Msg.alert('提示','您当前打开的标签页数量过多，请关闭不需要使用<br>的标签页（页面过多会影响系统速度）！');
	        	return false;
	        }
			if (Ext.isEmpty(tp)) {
				clz = 'app.view.notice.TbNoticeReceiveMngPanel';
				tp = Ext.create(clz,{itemId:'notice.TbNoticeReceiveMngPanel', title:'<i class="icon-comments bigger-120"></i> 通知管理', closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
				tabPanel.add(tp);

			}
			tabPanel.setActiveTab(tp);
		}else if(id == 'syf'){
			var ctrl = app.app.getController('corp.TbCorpPositionCtrl');
			var tp = tabPanel.getComponent('corp.TbCorpPositionMngPanel');
			if(tabPanel.items.getCount()>=10 && Ext.isEmpty(tp)){
				Ext.Msg.alert('提示','您当前打开的标签页数量过多，请关闭不需要使用<br>的标签页（页面过多会影响系统速度）！');
	        	return false;
	        }
			if (Ext.isEmpty(tp)) {
				clz = 'app.view.corp.TbCorpPositionMngPanel';
				tp = Ext.create(clz,{itemId:'corp.TbCorpPositionMngPanel', title:'企业地图',icon:'images/menus/1002.png', closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
				tabPanel.add(tp);

			}
			tabPanel.setActiveTab(tp);
		}
	},
	reLoadTask : function(){
		var me = this;
		var panel = me.down('panel[itemId=syd]');
		panel.setLoading('读取中...');
		app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/sys/homepage/syd',null,function(ret){
			if(ret.success){
				Ext.getCmp('syd').update(ret.data);
				panel.setLoading(false);
			}
		});
	}
});
