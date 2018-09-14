/**
 * Created by holysky5 on 13-12-26.
 */
Ext.define('app.utils.ButtonUtils', {
    singleton: true,
    /**
     *单选
     */
    exit: function (obj) {
        Ext.MessageBox.confirm('系统提示','确认要退出系统吗？',function(flag){
			if(flag=='yes'){
				app.utils.TaskUtils.renmoveLogin();
				Ext.getCmp('manage_viewport').destroy();
				Ext.create('app.view.LoginView');
			}
		});
    },
    homePage: function(){
    	var tabPanel = Ext.ComponentQuery.query('panel[itemId=maintabs]')[0];
    	 if(loginTag == 'trans'){
    	   var tp = tabPanel.getComponent('trans.HomePageMngPanel');
    	 } else  {
     	   var tp = tabPanel.getComponent('manage.HomePageMngPanel'); 
    	 }

    	tabPanel.setActiveTab(tp);
    },
    viewNotice : function(id,title){
    	var ctrl = app.app.getController('notice.TbNoticeReceiveCtrl');
    	var win =	Ext.create('app.view.notice.TbNoticeReceiveEdit',{title : title});
		win.show();
		win.loadHomePageData(id);
    },
    openNotice : function(id,tag){
    	var tabPanel = Ext.ComponentQuery.query('panel[itemId=maintabs]')[0];
    	var tp;
    	var ctrl;
    	var mng;
    	if(loginTag=='trans'){
	    	ctrl = "app.controller.trans.notice.TbNoticeReceiveCtrl";
			mng = "trans.notice.TbNoticeReceiveMngPanel";
    	}else{
    		ctrl = "app.controller.notice.TbNoticeReceiveCtrl";
			mng = "notice.TbNoticeReceiveMngPanel";
    	}
		tp = tabPanel.getComponent(mng);
    	if (Ext.isEmpty(Ext.ClassManager.get(ctrl))) {
			try {
				app.app.getController(ctrl);
			} catch (err) {
				Ext.Msg.alert('Error', 'load ' + ctrl
						+ " error !<br>Name:" + err.name
						+ "<br>message:" + err.message);
			}
		}
		if(Ext.isEmpty(tp)){
			tp = Ext.create('app.view.'+mng,{itemId:mng, title:'通知管理', closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
			tabPanel.add(tp);
		}
		tabPanel.setActiveTab(tp);
    },
    test : function(obj,id){
    	var win =	Ext.ComponentQuery.query('window[itemId=credit.TbExamFileInfoEdit]')[0];
    	var view = win.down('dataview');
    	var store = view.getStore();
    	var record = store.findRecord('FILE_ID',id);
    	var checkd = obj.checked;
    	if(obj == '10041001'){
    		Ext.MessageBox.confirm('系统提示','确认要拒绝受理吗？',function(flag){
				if(flag=='yes'){
					record.set('IS_UPLOAD','10041002');
				}
			});
    	}else{
    		record.set('IS_UPLOAD','10041001');
    	}
    },
    test1 : function(id){
    	var win =	Ext.ComponentQuery.query('window[itemId=credit.TbExamFileInfoEdit]')[0];
    	var view = win.down('dataview');
    	var store = view.getStore();
    	var record = store.findRecord('FILE_ID',id);
    	record.commit();
    },
     doTask : function(taskKey,processName,taskName,orderId,instanceUrl){
    	var title = processName + '-->' + taskName;
    	var home = Ext.ComponentQuery.query('panel[itemId=sys.HomePageMngPanel]')[0];
    	var loadingPanel = home.down('panel[itemId=syd]');
    	loadingPanel.setLoading('正在打开...');
		var isEdit = false;
		if(taskKey == 'apply'){
			isEdit = true;
		}
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback('manage/common/business/getModel',{orderId:orderId},loadingPanel,function(ret){
			if( ret.success ){
				var data = ret.data;
				var win =	Ext.create('app.view.' + instanceUrl + 'Edit',{title:title,isEdit:isEdit,fileBillId:data.fileBillId});
				win.show();
				if(taskKey == 'apply'){
					win.loadData(data);
				}else if(taskKey == 'process' || taskKey == 'reprocess'){
					var upload = win.down('#fileUploadGrid');
					if(!Ext.isEmpty(upload)){
						upload.setForEdit(false);
					}	
					win.loadProcessData(data);
				}else if(taskKey == 'check'){
					win.loadCheckData(data);
					var upload = win.down('#fileUploadGrid');
					if(!Ext.isEmpty(upload)){
						upload.setForEdit(false);
					}	
				}else if(taskKey == 'complete'){
					win.loadCompleteData(data);
					var upload = win.down('#fileUploadGrid');
					if(!Ext.isEmpty(upload)){
						upload.setForEdit(false);
					}	
				}else if(taskKey == 'accept'){
					win.loadAcceptData(data);
					var upload = win.down('#fileUploadGrid');
					if(!Ext.isEmpty(upload)){
						upload.setForEdit(false);
					}	
				}else{
					Ext.Msg.alert('系统提示','不存在的环节！');
				}
				var upload = win.down('#fileUploadGrid');
				if(!Ext.isEmpty(upload)){
					upload.reload();
				}	
				win.getEl().center();
				loadingPanel.setLoading(false);
      		}
		});			
    },
//    gptpl:[
//			'<div class="' + themes + '">',
//			'<tpl for=".">',
//				'<div class="menus_clazz">',
//					'<a href="javascript:void(0);" class="menu">',
//						'<i class="{iconFont}"></i> ',
//						'{funcName}',
//					'</a>',
//				'</div>',
//			'</tpl>',
//			'</div>'
//	],
	gptpl:[
			'<div class="side-wrap" id="main-menu">',
				'<h1 class="main_logo">',
					'<a data-qtip="汽车电子健康档案" href="javascript:app.utils.ButtonUtils.homePage();">',
						'<img src="statics/images/logoTop.png" alt="汽车档案">',
					'</a>',
				'</h1>',
				'<div class="side-menu">',
					'<ul>',
						'<tpl for=".">',
						'<li class="pr side-menu-li li-crop menu1" code="WBM_ORDER">',
							'<a class="side-menu-a new-con-p">',
								'<i class="icon {iconCls}"></i>{funcName}',
							'</a>',
							'<div class="float-menu" style="top: 0px;{[(xindex == xcount && xcount >=5) ? "margin-top: -120px;min-height:213px;" : ""]}{[xindex > 1 && (values.children.length>=7)?"margin-top: -120px;":""]}">',
								'<tpl if="funcType == \'3\'">',
									'<ul class="sec-nav clearfix sec-nav-flow" style="width: {[values.children.length*151]}px;">',
										'<tpl for="children">',
											'<li class="sec-nav-li sec-nav-li-flow" style="width:150px;height:100%;">',
												'<a class="sec-nav-a li-a-color">{funcName}</a>',
												'<ul class="third-nav-ul">',
													'<tpl for="children">',
														'<li class="third-nav-li menu2" code="WBM_PRODUCT_LIST" data-funcid="{funcId}" data-qtip="{funcName}">',
															'<a class="third-nav-a new-con"><i class="{iconCls} bigger-120"></i> {funcName}</a>',
														'</li>',
													'</tpl>',
												'</ul>',
											'</li>',
										'</tpl>',
									'</ul>',
								'<tpl else>',
									'<ul class="sec-nav">',
										'<tpl for="children">',
											'<li class="sec-nav-li menu2"  data-funcid="{funcId}" data-qtip="{funcName}">',
												'<a class="sec-nav-a new-con">',
													'<i class="{iconCls} bigger-120"></i> {funcName}',
												'</a>',
											'</li>',
										'</tpl>',
									'</ul>',
								'</tpl>',
							'</div>',
						'</li>',
						'</tpl>',
					' </ul>',
				'</div>',
			'</div>'
	],
	
	
	divTreeClick : function(id,name){
    	var power = document.getElementById("ch_" + id + name);
    	if(!power.checked){
			power.checked = true;
		}else{
			power.checked = false;
		}
    },
    productCheckLook:function(id,cotent){
    	var panel = Ext.create('Ext.panel.Panel',{
    		floating:true,
    		shadow:true,
    		border: 5,
			style: {
				border:'2px',
			    borderColor: '#38f',
			    borderStyle: 'solid'
			},
    		frame:true,
    		html:'<div style="font-size:13px;line-height:20px;padding:5px;">' + cotent + '</div>'
    	});
    	panel.showBy(Ext.get('rect_result_' + id));
    	panel.setY(panel.getY());
    	panel.setX(panel.getX() - (panel.getWidth()/2) - 20);
    	panel.getEl().on('blur',function(){
    		panel.destroy();
    	});
    },
    informationCheckLook:function(id,cotent){
    	var panel = Ext.create('Ext.panel.Panel',{
    		floating:true,
    		shadow:true,
    		width:300,
    		border: 5,
			style: {
				border:'2px',
			    borderColor: '#38f',
			    borderStyle: 'solid'
			},
    		frame:true,
    		html:'<div style="font-size:13px;line-height:20px;padding:5px;">' + cotent + '</div>'
    	});
    	panel.showBy(Ext.get('check_information_' + id));
    	panel.setY(panel.getY());
    	panel.setX(panel.getX());
    	panel.getEl().on('blur',function(){
    		panel.destroy();
    	});
    },
    checkSecureLook:function(id,cotent){
		var win = Ext.create("app.view.common.InforWin",{
					modal : true,
					rowSelType : 'SINGLE', //单选
					callback:function( records ){
					}
					});
		win.loadData(cotent);			
		win.show();
    },    
    
    viewfileUploadWin:function(a,b,c){
    	var flag=0;
    	if (Ext.isEmpty(a))
    	   flag=1;
    	if (a==0)   
     	   flag=1;
     	   
    	if (flag==0) { 
          var win = Ext.create('app.view.corp.uploadWin',{
					fileBillId:a+'_'+b,
					fileBillType: c
				});	
		  win.show();
		  win.down('#fileUploadGrid').reload();
    	} else
    	  Ext.Msg.alert('系统提示','请先保存数据然后再添加附件！');
    },
     viewSecure : function(id,tag){
    	var tabPanel = Ext.ComponentQuery.query('panel[itemId=maintabs]')[0];
    	var tp;
    	var ctrl;
    	var mng;
    	var name;
    	var tag;
    	var check = false;

        ctrl = "app.controller.total.CheckSecureTotalCtrl";
    	mng = "total.CheckSecureTotalMngPanel"; 
		tp = tabPanel.getComponent('total.CheckSecureTotalMngPanel');
		name = '企业事故隐患自查统计';

    	if (Ext.isEmpty(Ext.ClassManager.get(ctrl))) {
			try {
				app.app.getController(ctrl);
			} catch (err) {
				Ext.Msg.alert('Error', 'load ' + ctrl
						+ " error !<br>Name:" + err.name
						+ "<br>message:" + err.message);
			}
		}
		if(Ext.isEmpty(tp)){
			tp = Ext.create('app.view.'+mng,{itemId:mng, title:'<i class="icon-calendar bigger-120"></i> ' + name, closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
			tabPanel.add(tp);
		}
		tp.down('form').getForm().findField('CORP_AREA').setValue(window.GL.userArea);//当前用户所属辖区
		tabPanel.setActiveTab(tp);
		tp.down('grid').getStore().loadPage(1);

    }  
});