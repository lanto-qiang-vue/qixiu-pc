Ext.define('app.controller.manage.report.CommentReportCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.report.CommentReportMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.report.CommentReportMngPanel]'
	},{
		ref : 'chartPanel',
		selector : 'panel[itemId=manage.report.CommentReportMngPanel] panel[itemId=cpanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.report.CommentReportMngPanel] panel[itemId=spanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.report.CommentReportMngPanel]': {
				afterrender : this.loadData
			},
			'panel[itemId=manage.report.CommentReportMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			}
		});
	},
	//加载数据
	loadData : function(mngPanel){
		var me=this;
		//加载柱状图
		var store=mngPanel.down('#cchart').getStore();
		var url = 'manage/report/commentreport/list';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				store.removeAll();
				store.add(ret.data);
			}
		});
		//加载评价曲线图
		var store1=mngPanel.down('#schart').getStore();
		var url1 = 'manage/report/commentreport/scorelist';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url1,null,function(ret){
			if( ret.success ){
				var month1="";
				var month2="";
				var month3="";
				var month4="";
				var month5="";
				var month6="";
				var month7="";
				var month8="";
				var month9="";
				var month10="";
				var month11="";
				var month12="";
				if(ret.data[0].MONTH1!=""){
					month1=ret.data[0].MONTH1/2;
				}
				if(ret.data[0].MONTH2!=""){
					month2=ret.data[0].MONTH2/2;
				}
				if(ret.data[0].MONTH3!=""){
					month3=ret.data[0].MONTH3/2;
				}
				if(ret.data[0].MONTH4!=""){
					month4=ret.data[0].MONTH4/2;
				}
				if(ret.data[0].MONTH5!=""){
					month5=ret.data[0].MONTH5/2;
				}
				if(ret.data[0].MONTH6!=""){
					month6=ret.data[0].MONTH6/2;
				}
				if(ret.data[0].MONTH7!=""){
					month7=ret.data[0].MONTH7/2;
				}
				if(ret.data[0].MONTH8!=""){
					month8=ret.data[0].MONTH8/2;
				}
				if(ret.data[0].MONTH9!=""){
					month9=ret.data[0].MONTH9/2;
				}
				if(ret.data[0].MONTH10!=""){
					month10=ret.data[0].MONTH10/2;
				}
				if(ret.data[0].MONTH11!=""){
					month11=ret.data[0].MONTH11/2;
				}
				if(ret.data[0].MONTH12!=""){
					month12=ret.data[0].MONTH12/2;
				}
				store1.removeAll();
				store1.add([{name:'1月份',score:month1},
			    			{name:'2月份',score:month2},
			    			{name:'3月份',score:month3},
			    			{name:'4月份',score:month4},
			    			{name:'5月份',score:month5},
			    			{name:'6月份',score:month6},
			    			{name:'7月份',score:month7},
			    			{name:'8月份',score:month8},
			    			{name:'9月份',score:month9},
			    			{name:'10月份',score:month10},
			    			{name:'11月份',score:month11},
			    			{name:'12月份',score:month12}
			    		]);
			}
		});
	},
	doSearch : function(button){
		var me=this;
		var val=me.getSearchPanel().getForm().getValues();
		if(val.typeCombo==2){
			me.getMngPanel().down('#cchart').hide();
			me.getMngPanel().down('#schart').show();
		}else{
			me.getMngPanel().down('#schart').hide();
			me.getMngPanel().down('#cchart').show();
		}
	}
});
