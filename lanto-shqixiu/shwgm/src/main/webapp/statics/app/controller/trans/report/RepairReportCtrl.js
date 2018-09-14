Ext.define('app.controller.trans.report.RepairReportCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.report.RepairReportMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.report.RepairReportMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=trans.report.RepairReportMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=trans.report.RepairReportMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.report.RepairReportMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.report.RepairReportMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=trans.report.RepairReportMngPanel]': {
				afterrender : this.loadData
			},
        	'panel[itemId=trans.report.RepairReportMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
			'panel[itemId=trans.report.RepairReportMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			}
		});
	},
	// grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'deleteBtn'==button.itemId ){
			me.doDelete(button);
		}else if( 'editBtn'==button.itemId ){
			me.doEdit(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getGridPanel().getStore().loadPage(1);
		}
		
	},
	//组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
		var st = grid.getStore();
		/*st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			var params = fm.getValues();
			params.CORP_ID_eq=window.GL.corpId;
			store.proxy.extraParams=params;
		});*/
		st.loadPage(1);
	},
	//加载数据
	loadData : function(mngPanel){
		var me=this;
		var store=mngPanel.down('#repairChart').getStore();
		var url = 'trans/report/repairreport/getinfo';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				var data=new Array();
				if(ret.data.alreadyOut!=0){
					var item1={ITEM_NAME:'已逾期',ITEM_SCORE:ret.data.alreadyOut};
					data.unshift(item1);
				}
				if(ret.data.soonOut!=0){
					var item1={ITEM_NAME:'即将逾期',ITEM_SCORE:ret.data.soonOut};
					data.unshift(item1);
				}
				if(ret.data.noPlan!=0){
					var item1={ITEM_NAME:'未提交计划',ITEM_SCORE:ret.data.noPlan};
					data.unshift(item1);
				}
				if(ret.data.noRecord!=0){
					var item1={ITEM_NAME:'不存在维修记录',ITEM_SCORE:ret.data.noRecord};
					data.unshift(item1);
				}
				if(ret.data.normal!=0){
					var item1={ITEM_NAME:'正常维护',ITEM_SCORE:ret.data.normal};
					data.unshift(item1);
				}
				store.removeAll();
				store.add(data);
			}
		});
		/*var tstore=mngPanel.down('#typeChart').getStore();
		var params=this.getSearchPanel().getForm().getValues();
		var url = 'manage/publicservice/complaint/report';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			if( ret.success ){
				var data=[{ITEM_NAME:'未受理',ITEM_SCORE:ret.data.noAcceptNum},
							{ITEM_NAME:'已受理',ITEM_SCORE:ret.data.acceptNum},
							{ITEM_NAME:'已办结',ITEM_SCORE:ret.data.endNum}];
				sstore.removeAll();
				sstore.add(data);
				var data1=[{ITEM_NAME:'服务投诉',ITEM_SCORE:ret.data.serviceCompNum},
							{ITEM_NAME:'质量投诉',ITEM_SCORE:ret.data.qualityCompNum},
							{ITEM_NAME:'举报',ITEM_SCORE:ret.data.reportCompNum}];
				tstore.removeAll();
				tstore.add(data1);
			}
		});*/
	}
	
});
