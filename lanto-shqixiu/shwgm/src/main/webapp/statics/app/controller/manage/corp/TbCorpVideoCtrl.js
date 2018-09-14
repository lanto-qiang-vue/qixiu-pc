Ext.define('app.controller.manage.corp.TbCorpVideoCtrl',{
	extend:'Ext.app.Controller',
	config:{hdUrl:null,fastUrl:null},
	views: [
		'manage.corp.TbCorpVideoMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.corp.TbCorpVideoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=corpspanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=corpgpanel]'
	},{
		ref : 'chSearchPanel',
		selector : 'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=spanel]'
	},{
		ref : 'chGridPanel',
		selector : 'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=chgpanel]'
	},{
		ref : 'videoPanel',
		selector : 'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=videoPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.corp.TbCorpVideoMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.TbCorpVideoEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] grid[itemId=corpgpanel]': {
				beforerender : this.initGridSearchCondition,
				select:this.onclick
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=corpspanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=chsgpanel] button[itemId=chSearchBtn]':{
				click: this.channelSearch
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] grid[itemId=chgpanel]': {
				//select:this.chOnclick
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=videoPanel] button[itemId=hdBtn]':{
				click: this.selHd
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=videoPanel] button[itemId=fastBtn]':{
				click: this.selFast
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=chsgpanel] button[itemId=addBtn]':{
				click: this.addChannel
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=chsgpanel] button[itemId=editBtn]':{
				click: this.editChannel
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=chsgpanel] button[itemId=deleteBtn]':{
				click: this.deleteChannel
			},
			'panel[itemId=manage.corp.TbCorpVideoMngPanel] panel[itemId=chsgpanel] button[itemId=viewVideoBtn]':{
				click: this.viewVideo
			},
			'panel[itemId=manage.corp.TbCorpVideoEdit] button[itemId=saveBtn]':{
				click: this.doSave
			}
		});
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
		st.on('beforeload', function (store, options) {
			var fm = me.getSearchPanel().getForm();
			store.proxy.extraParams=fm.getValues();
		});
		st.loadPage(1);//预加载
	},
	onclick:function(a,b,c){
		var me = this;
		var form=me.getChSearchPanel().getForm();
		var store=me.getChGridPanel().getStore();
		store.proxy.extraParams={CORP_ID_eq:b.data.CORP_ID};
		store.loadPage(1);
		//var panel = me.getMngPanel();
		//panel.down('panel[itemId=videoPanel]').setTitle('视频查看：【 ' + b.data.CORP_NAME + ' 】');
		
	},
	viewVideo : function(btn){
		var me = this;
		var grid = me.getChGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if(mds.length>4){
			Ext.Msg.alert('系统提示','不能同时观看超过四个视频');
			return false;
		}
		var ids = "";
		var html='<table width="100%" height="100%" border="0">';
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(record.data.STATUS=="10441001" || record.data.STATUS=="10441004"){
				Ext.Msg.alert('系统提示','所选设备不在线');
				return false;
			}
			if(mds.length == 1){
				html='<video id="myPlayer" width="100%" poster="" controls playsInline webkit-playsinline autoplay>'+
		    					'<source src="'+record.data.HLS_URL_FAST+'" type="application/x-mpegURL" />'+
						'</video>';
				me.getVideoPanel().update(html);
				var player = new EZUIPlayer('myPlayer');
				me.config.hdUrl=record.data.HLS_URL_HD;
				me.config.fastUrl=record.data.HLS_URL_FAST;
				me.getVideoPanel().down('#hdBtn').setDisabled(false);
				me.getVideoPanel().down('#fastBtn').setDisabled(false);
				return false;
			}else{
				me.getVideoPanel().down('#hdBtn').setDisabled(true);
				me.getVideoPanel().down('#fastBtn').setDisabled(true);
				var str1='';
				var str2='';
				if((i+2)%2==0){
					str1='<tr>';
				}else{
					str2='</tr>';
				}
				html=html+str1+'<td><video id="'+record.data.ID+'" width="100%" poster="" controls playsInline webkit-playsinline autoplay>'+
		    					'<source src="'+record.data.HLS_URL_FAST+'" type="application/x-mpegURL" />'+
							'</video></td>'+str2;
			}
		}
		html=html+'</table>';
		console.log(html);
		me.getVideoPanel().update(html);
		var player=new Array();
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			player[i] = new EZUIPlayer(record.data.ID.toString());
		}
	},
	selHd : function(btn){
		var me=this;
		var html='';
		if(me.config.hdUrl==null){
			return false;
		}
		html='<video id="myPlayer" width="100%" poster="" controls playsInline webkit-playsinline autoplay>'+
					'<source src="'+me.config.hdUrl+'" type="application/x-mpegURL" />'+
		'</video>';
		me.getVideoPanel().update(html);
		var player = new EZUIPlayer('myPlayer');
	},
	selFast : function(btn){
		var me=this;
		var html='';
		if(me.config.fastUrl==null){
			return false;
		}
		html='<video id="myPlayer" width="100%" poster="" controls playsInline webkit-playsinline autoplay>'+
					'<source src="'+me.config.fastUrl+'" type="application/x-mpegURL" />'+
		'</video>';
		me.getVideoPanel().update(html);
		var player = new EZUIPlayer('myPlayer');
	},
	channelSearch : function(btn){
		var me = this;
		var store=me.getChGridPanel().getStore();
		var data=btn.up('form').getValues();
		store.proxy.extraParams={CORP_ID_eq:'',STATUS:data.STATUS};
		store.loadPage(1);
	},
	addChannel : function(btn){
		var win =	Ext.create('app.view.manage.corp.TbCorpVideoEdit');
		win.show();
	},
	//编辑页面保存按钮
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/corp/corpvideo/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						me.getChGridPanel().getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	//跳转修改页面
	editChannel:function(button){ 
		var me = this;
		var grid = me.getChGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.corp.TbCorpVideoEdit');
		win.show();
		win.loadData(mds);
	},
	deleteChannel : function(button){
		var me = this;
		var grid = me.getChGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(i == 0){
				ids = record.data.ID;
			}else{
				ids = ids + "," + record.data.ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/corp/corpvideo/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	}
});
