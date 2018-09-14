Ext.define('app.controller.manage.sys.TbSysRoleCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.sys.TbSysRoleMngPanel',
		'manage.sys.TbSysRoleEdit'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.sys.TbSysRoleMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=manage.sys.TbSysRoleMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=manage.sys.TbSysRoleMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.sys.TbSysRoleMngPanel]': {
                afterrender : app.utils.CommonUtil.setPanelFuncPower
            },
            'panel[itemId=manage.sys.TbSysRoleEdit]': {
                //afterrender : app.utils.CommonUtil.setPanelFuncPower
            },
			'panel[itemId=manage.sys.TbSysRoleMngPanel] grid[itemId=gpanel]': {
				beforerender : this.initGridSearchCondition
			},
			'panel[itemId=manage.sys.TbSysRoleMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
				click: this.gridBtnsHandler
			},
			'panel[itemId=manage.sys.TbSysRoleMngPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
				click: this.doSearch
			},
			'window[itemId=manage.sys.TbSysRoleEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=manage.sys.TbSysRoleEdit] treepanel':{
 	    		checkchange: this.doChange
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
			store.proxy.extraParams=fm.getValues(false,true);
		});
		st.loadPage(1);//预加载
	},
	//grid工具条中button事件.
	gridBtnsHandler : function(button, event, eOpts){
		var me = this;
		if( 'addBtn'==button.itemId ){
			me.doAdd(button);
		}else if( 'editBtn' == button.itemId){
			me.doEdit(button);
		}else if( 'deleteBtn' == button.itemId){
			me.doDelete(button);
		}else{
			Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
		}
	},
	//跳转新增页面
	doAdd:function(button){ 
		var win =	Ext.create('app.view.manage.sys.TbSysRoleEdit');
		win.show();
		win.loadData(null);
	},
	//跳转修改页面
	doEdit:function(button){ 
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var win =	Ext.create('app.view.manage.sys.TbSysRoleEdit');
		win.show();
		win.loadData(mds);
	},
	doChange : function(node, checked){
		var me = this;
		me.setParChecked(node,checked);
		node.cascadeBy(function (child) {  
            child.set("checked", checked);  
        }); 
	},
	setParChecked : function(node,checked){
		var curNode = node;
		while(!Ext.isEmpty(curNode.parentNode)){
			if(!checked && !Ext.isEmpty(curNode.parentNode) && !Ext.isEmpty(curNode.parentNode.childNodes)){
				for(var i=0;i<curNode.parentNode.childNodes.length;i++){
					if(curNode.parentNode.childNodes[i].data.checked)	return false;
				}
			}
			curNode.parentNode.set("checked", checked);
			curNode = curNode.parentNode;
		}
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var form = win.down('form').getForm();
				var data = form.getFieldValues();
				var treepanel = win.down('treepanel');//得到功能树
				treepanel.expandAll();
		    	var records = treepanel.getChecked();//得到选中的功能
		    	var count = 0;
				var funcs = [];	
				Ext.Array.each(records, function(rec) {
					if(rec.data.leaf){
						var funcPower = me.getCheckBox(rec.data.funcId);
						rec.data.funcPower = funcPower;
					}
					funcs.push(rec.data);
					count++;
				});
				var params = {
					data : Ext.JSON.encode(data),
					array: Ext.JSON.encode(funcs)
				};
				var url = 'manage/sys/tbsysrole/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						if(Ext.isEmpty(data.ROLE_ID)){
							me.getGridPanel().getStore().insert(0,ret.data);
						}else{
							var record = form.getRecord();
							record.set(ret.data);
							record.commit();
						}
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	doDelete : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.mutChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		var ids = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(i == 0){
				ids = record.data.ROLE_ID;
			}else{
				ids = ids + "," + record.data.ROLE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'manage/sys/tbsysrole/delete';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:ids},function(ret){
					if( ret.success ){
						store.remove(mds);
						Ext.Msg.alert('系统提示','删除成功！');
					}
				});
			}
		});
	},
	getCheckBox:function(name){
		var power = document.getElementsByName("ch_" + name);
		var po = [];
		for(var i=0;i<power.length;i++){
			if(power[i].checked){
				po.push(power[i].value);
			}
		}
		return po.join(",");
	}
});
