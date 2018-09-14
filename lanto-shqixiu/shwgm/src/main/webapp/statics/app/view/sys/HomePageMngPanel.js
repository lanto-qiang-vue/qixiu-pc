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
	defaults: {
        bodyPadding : '0 3 3 3',
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
            			'<table align="center" width="100%">' +
            				'<tr>' +
	            				'<td algin="right" width="50%">' +
	            					'<div style="width:80px;height:80px;margin:3px 40px 10px 10px;align:center;">' +
	            					'<img src="images/ptqrshow.png" style="width:80px;height:80px;"/>' +
	            					'<div style="font-size:11px;">公众查询网</div>' +
	            					'</div>' +
	            				'</td>' +
	            				'<td align="left" width="50%">' +
	            					'<div onclick="window.open(\'http://121.8.227.203:811/apk/JwApp.apk\');" class="appdiv"  style="margin-top:3px;width:80px;height:80px;">' +
			            				//'<div style="width:50px;height:50px;font-size:28px;text-align:center;margin:10px 17px; "><i class="icon-android bigger-200 blue"></i></div>' +
			            				//'<span style="font-size:11px;">下载手机APP</span>' +
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
            margin: "5 0 5 5",
            collapsible: true,
            iconCls: "history_button",
            width: 600,
            height: 450,
            colspan: 2,
            rowspan: 2
        }, {
            title: "最新通知",
            id: "sye",
            margin: "5 5 0 5",
            itemId:'sye',
            collapsible: true,
            icon: "images/menus/1001.png",
            width: 600,
            height: 210
        },{
        	title: "企业辖区分布线性图",
            id: "syf",
            margin: "5 5 5 5",
            itemId:'syf',
            tools:[{
				    type:'refresh',
				    tooltip: '刷新',
				    handler: function(event, toolEl, panel){
			        	var me = this.up('panel[itemId=sys.HomePageMngPanel]');
		        		me.reLoad(this);
			    	}
			}],
            collapsible: true,
            iconCls: "chart_column",
            width: 500,
            height: 300,
            frame: false,
            layout:'fit',
            items:[
//            	{
//            	xtype:'chart',
//            	animate: true,
//            	store: Ext.getStore("home_chart_line"),
//			    axes: [{
//			        type: "Numeric",
//			        minimum: 0,
//			        position: "left",
//			        fields: ["TOTAL_NUM"],
////			        title: '企业数量（家）',
//			        grid: true,
//			        label: {
//			            renderer: Ext.util.Format.numberRenderer("0,0"),
//			            font: "10px Arial"
//			        }
//			    }, {
//			        type: "Category",
//			        position: "bottom",
//			        fields: ["NAME"],
////			        title: '辖区名称'
//			        label: {
//		                rotate: {
//		                    degrees: 45
//		                }
//		            }
//			    }],
//			    series: [{
//			        type: "line",
//			        highlight: true,
//			        axis: "left",
//			        label: {
//	                  	display: 'insideEnd',
//	                  	'text-anchor': 'middle',
//	                    field: 'TOTAL_NUM',
//	                    orientation: 'horizontal',
//	                    fill: '#ffffff',
//	                    font: '17px Arial'
//	                },
//			        xField: "NAME",
//			        yField: "TOTAL_NUM",
//			        tips: {
//			            trackMouse: true,
//			            width: 80,
//			            height: 40,
//			            renderer: function(A, B) {
//			                this.setTitle(A.get("NAME"));
//			                this.update(A.get("TOTAL_NUM") + ' 家')
//			            }
//			        },
//			        style: {
//			            fill: "#38B8BF",
//			            stroke: "#38B8BF",
//			            "stroke-width": 3
//			        },
//			        markerConfig: {
//			            type: "circle",
//			            size: 4,
//			            radius: 4,
//			            "stroke-width": 0,
//			            fill: "#38B8BF",
//			            stroke: "#38B8BF"
//			        }
//			    }]
//        }
        ]
    }],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.on('resize',function(B, C, D){
			if (!Ext.isEmpty(Ext.getCmp("sya"))) {
                var E = (C - 20) / 4;
                Ext.getCmp("sya").setWidth(E);
                Ext.getCmp("syb").setWidth(E);
                Ext.getCmp("syc").setWidth(E * 2);
                Ext.getCmp("syd").setWidth(E * 2 + 5);
                Ext.getCmp("sye").setWidth(E * 2 );
                Ext.getCmp("syf").setWidth(E * 2 );
                E = D - 415;
                var dh = D-185;
                if (E < 100) {
                    E = 100
                };
                if (dh < 330) {
                    dh = 330
                };
                Ext.getCmp("syd").setHeight(dh);
                Ext.getCmp("syf").setHeight(E + 15);
            }
		});
	},
	loadData:function(){
		Ext.getStore("home_chart_line").load();//加载请求
		app.utils.AjaxCallbackUtil.ajaxCallbackAll('manage/sys/homepage/getHomePage',null,function(ret){
			if(ret.success){
			//	Ext.getCmp("syc").update(ret.data.C);
				var tree = Ext.getCmp("syc");
				tree.setRootNode(ret.data.C);
				tree.expandAll();
				Ext.getCmp("syd").update(ret.data.D);
				Ext.getCmp("sye").update(ret.data.E);
				var A = ret.data.A;
				var T = Ext.Date.format(new Date(), "Y-m-d H:i");
				var roleid = A.roleId;
				var roles = eval('[' + roleid + ']');
				var str = [];
				var store = Ext.getStore('sys_all_role');
				for(var i=0;i<roles.length;i++){
					var role = roles[i];
					var record = store.findRecord('ROLE_ID', role);
					str.push(record.data.ROLE_NAME);
				}
				var ahtml = '<ul class="ListTitle">';
				ahtml = ahtml + '<li class="homepage-info" title="' + A.userCode + '"><span style="float:left;width:25px;"><i class="icon-lock bigger-180 blue"></i></span> 登录帐号：<span class="blue font-bold">' + A.userCode + '</span></li>';
				ahtml = ahtml + '<li class="homepage-info" title="' + A.userName + '"><span style="float:left;width:25px;"><i class="icon-user bigger-160 blue"></i></span> 用户姓名：<span class="blue font-bold">' + A.userName + '</span></li>';
				ahtml = ahtml + '<li class="homepage-info" title="' + app.utils.FunUtils.findAreaByCode(A.blongArea) + '"><span style="float:left;width:25px;"><i class="icon-map-marker bigger-160 blue"></i></span> 所属辖区：<span class="blue font-bold">' + app.utils.FunUtils.findAreaByCode(A.blongArea) + '</span></li>';
				ahtml = ahtml + '<li class="homepage-info" title="' + str.join(' | ') + '"><span style="float:left;width:25px;"><i class="icon-cogs bigger-160 blue"></i></span> 角色信息：<span class="blue font-bold">' + str.join(' | ') + '</span></li>';
				ahtml = ahtml + '<li class="homepage-info" title="' + T + '"><span style="float:left;width:25px;"><i class="icon-time bigger-170 blue"></i></span> 登录时间：<span class="blue font-bold">' + T + '</span></li></ul>';
				Ext.getCmp("sya").update(ahtml);
			}
		});
	},
	reLoad : function(btn){
		var me = this;
		var panel = btn.up('panel');
		var id = panel.id;
		if(id == 'syf'){
			panel.setLoading('读取中...');
            Ext.defer(function() {
                panel.setLoading(false);
            }, 1000);
			Ext.getStore("home_chart_line").reload();
		}else if(id == 'syg'){
			panel.setLoading('读取中...');
            Ext.defer(function() {
                panel.setLoading(false);
            }, 1000);
			Ext.getStore("home_chart_line").reload();
		}else if(id == 'syb'){
			panel.setLoading('读取中...');
            Ext.defer(function() {
                panel.setLoading(false);
            }, 1000);
		}else{
			panel.setLoading('读取中...');
			app.utils.AjaxCallbackUtil.ajaxLoadingCallback('manage/sys/homepage/' + id,null,panel,function(ret){
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
			var win = Ext.create('app.view.sys.TmSysOperateLogWin',{iconCls: "info_b_icon"});
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
				tp = Ext.create(clz,{itemId:'notice.TbNoticeReceiveMngPanel', title:'<i class="icon-comments bigger-120"></i> 已收通知', closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
				tabPanel.add(tp);

			}
			tabPanel.setActiveTab(tp);
		}
	},
	reLoadTask : function(){
		var me = this;
		var panel = me.down('panel[itemId=syd]');
		panel.setLoading('读取中...');
		app.utils.AjaxCallbackUtil.ajaxCallbackAll('manage/sys/homepage/syd',null,function(ret){
			if(ret.success){
				Ext.getCmp('syd').update(ret.data);
				panel.setLoading(false);
			}
		});
	}
});
