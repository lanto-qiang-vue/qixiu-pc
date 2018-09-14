Ext.define('app.controller.manage.sys.RepairStandardCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.sys.RepairStandardMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.sys.RepairStandardMngPanel]'
	},{
		ref : 'treePanel',
		selector : 'panel[itemId=manage.sys.RepairStandardMngPanel] treepanel[itemId=treelist]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.sys.RepairStandardMngPanel]': {
                //afterrender : app.utils.CommonUtil.setPanelFuncPower
            },
			'panel[itemId=manage.sys.RepairStandardMngPanel] treepanel[itemId=treelist]': {
				beforerender : this.initTreePnaelBeforeRender,
				itemcontextmenu:this.onItemContextMenu
			}
//			'panel[itemId=trans.sys.RepairStandardPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
//				click: this.gridBtnsHandler
//			},
//			'panel[itemId=trans.sys.RepairStandardPanel] panel[itemId=spanel] button[itemId=searchBtn]':{
//				click: this.doSearch
//			},
//			'window[itemId=trans.sys.TbSysRoleEdit] button[itemId=saveBtn]': {
//				click: this.doSave
//			},
//			'window[itemId=trans.sys.TbSysRoleEdit] treepanel':{
// 	    		checkchange: this.doChange
//            }
		});
	},
	//查询panel中点击查询
	doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getGridPanel().getStore().loadPage(1);
		}
	},
	//组件初始化时store上挂接查询form.
	initTreePnaelBeforeRender : function(tree, opts){
		tree.loadTree();
//		app.utils.AjaxCallbackUtil.ajaxCallbackAll("manage/sys/repairstandard/treelist",null,function(ret){
//			if( ret.success ){
//				tree.setRootNode(ret.data);
//				tree.expandNode(tree.getRootNode());
//				//tree.getSelectionModel().select(0);
//			}
//		});
	},
	onItemContextMenu:function(panel , record , item , index , e , eOpts){
		var me = this;
    	e.preventDefault();
    	var type = record.raw.type;
    	var items = [];
    	if(type == '0'){
    		items.push({ text: '新增厂家',iconCls:'add_button',menu:{
    				plain: true,
    				xtype:'uxmenu',
                	items:[{
                		xtype:'toolbar',
                		width:240,
                		layout:{
                			type:'hbox'
                		},
                		items:[{
                			xtype:'textfield',
                			emptyText:'请输入厂家名称',
                			allowBlank:false,
                			flex:1,
                			name:'name'
                		},{
                			xtype:'button',
                			iconCls:'accept_button',
                			text:'确定',
                			handler:function(bt){
                				var field = bt.up('toolbar').down('textfield');
                				if(!field.isValid()){
                					return;
                				}
                				var data = {name:field.getValue(),type:'1',parId:0};
                				var params = {
									data : Ext.JSON.encode(data)
								};
								var url = 'manage/sys/repairstandard/save';
								app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,bt.up('toolbar'),"正在保存中...",function(ret){
									if( ret.success ){
										record.appendChild({text:data.name,type:data.type,parId:data.parId,id:ret.data.id,children:[],icon:'images/menus/100202.png'});
						        		bt.up('#mainMenu').hide();
						      		}
								});
                			}
                		}]
                	}]
    		}});
    	}else if(type == '1'){
    		items.push({ text: '新增品牌',iconCls:'add_button',menu:{
    				plain: true,
    				xtype:'uxmenu',
                	items:[{
                		xtype:'toolbar',
                		width:240,
                		layout:{
                			type:'hbox'
                		},
                		items:[{
                			xtype:'textfield',
                			emptyText:'请输入品牌名称',
                			allowBlank:false,
                			flex:1,
                			name:'name'
                		},{
                			xtype:'button',
                			iconCls:'accept_button',
                			text:'确定',
                			handler:function(bt){
                				var field = bt.up('toolbar').down('textfield');
                				if(!field.isValid()){
                					return;
                				}
                				var data = {name:field.getValue(),type:'2',parId:record.get('id')};
                				var params = {
									data : Ext.JSON.encode(data)
								};
								var url = 'manage/sys/repairstandard/save';
								app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,bt.up('toolbar'),"正在保存中...",function(ret){
									if( ret.success ){
										record.appendChild({text:data.name,type:data.type,parId:data.parId,id:ret.data.id,children:[],icon:'images/menus/1002.png'});
						        		bt.up('#mainMenu').hide();
						      		}
								});
                			}
                		}]
                	}]
    		}});
    		items.push({ text: '修改',iconCls:'edit_button' ,menu:{
    				plain: true,
    				xtype:'uxmenu',
                	items:[{
                		xtype:'toolbar',
                		width:240,
                		layout:{
                			type:'hbox'
                		},
                		items:[{
                			xtype:'textfield',
                			emptyText:'请输入厂家名称',
                			allowBlank:false,
                			flex:1,
                			name:'name',
                			value:record.get('text')
                		},{
                			xtype:'button',
                			iconCls:'accept_button',
                			text:'确定',
                			handler:function(bt){
                				var field = bt.up('toolbar').down('textfield');
                				if(!field.isValid()){
                					return;
                				}
                				var data = {name:field.getValue(),id:record.get('id')};
                				var params = {
									data : Ext.JSON.encode(data)
								};
								var url = 'manage/sys/repairstandard/save';
								app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,bt.up('toolbar'),"正在保存中...",function(ret){
									if( ret.success ){
										record.set('text',data.name);
										record.commit();
						        		bt.up('#mainMenu').hide();
						      		}
								});
                			}
                		}]
                	}]}});
              items.push({ text: '删除',iconCls:'delete_button' ,action:'del'});
    	}else if(type == '2'){
    		items.push({ text: '新增型号',iconCls:'add_button',menu:{
    				plain: true,
    				enableFocusableContainer:true,
    				xtype:'uxmenu',
                	items:[{
                		xtype:'form',
                		width:150,
                		layout:{
                			type:'vbox',
                			pack: 'start',
        					align: 'stretch'
                		},
                		items:[{
                			xtype:'textfield',
                			emptyText:'请输入型号名称',
                			allowBlank:false,
                			name:'name'
                		},{
                			xtype:'numberfield',
                			emptyText:'请输入维护周期(月)',
                			minValue:1,
                			maxValue:12,
                			allowBlank:false,
                			name:'repairCycle'
                		},{
                			xtype:'numberfield',
                			emptyText:'请输入维护里程',
                			allowBlank:false,
                			name:'repairMileage'
                		},{
                			xtype:'button',
                			iconCls:'accept_button',
                			text:'确定',
                			handler:function(bt){
                				var form = bt.up('form');
                				if(!form.isValid()){
                					return;
                				}
                				var data = form.getValues();
                				data.type = '3';
                				data.parId = record.get('id');
                				var params = {
									data : Ext.JSON.encode(data)
								};
								var url = 'manage/sys/repairstandard/save';
								app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,form,"正在保存中...",function(ret){
									if( ret.success ){
										record.appendChild({repairCycle:data.repairCycle,repairMileage:data.repairMileage,text:data.name,type:data.type,parId:data.parId,id:ret.data.id,children:[],icon:'images/menus/100904.png',leaf:true});
						        		bt.up('#mainMenu').hide();
						      		}
								});
                			}
                		}]
                	}]
    		}});
    		items.push({ text: '修改',iconCls:'edit_button' ,menu:{
    				plain: true,
    				xtype:'uxmenu',
                	items:[{
                		xtype:'toolbar',
                		width:240,
                		layout:{
                			type:'hbox'
                		},
                		items:[{
                			xtype:'textfield',
                			emptyText:'请输入品牌名称',
                			allowBlank:false,
                			flex:1,
                			name:'name',
                			value:record.get('text')
                		},{
                			xtype:'button',
                			iconCls:'accept_button',
                			text:'确定',
                			handler:function(bt){
                				var field = bt.up('toolbar').down('textfield');
                				if(!field.isValid()){
                					return;
                				}
                				var data = {name:field.getValue(),id:record.get('id')};
                				var params = {
									data : Ext.JSON.encode(data)
								};
								var url = 'manage/sys/repairstandard/save';
								app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,bt.up('toolbar'),"正在保存中...",function(ret){
									if( ret.success ){
										record.set('text',data.name);
										record.commit();
						        		bt.up('#mainMenu').hide();
						      		}
								});
                			}
                		}]
                	}]}});
              items.push({ text: '删除',iconCls:'delete_button' ,action:'del'});
    	}else if(type == '3'){
    		items.push({ text: '修改',iconCls:'edit_button' ,menu:{
    				plain: true,
    				xtype:'uxmenu',
                	items:[{
                		xtype:'form',
                		width:150,
                		layout:{
                			type:'vbox',
                			pack: 'start',
        					align: 'stretch'
                		},
                		items:[{
                			xtype:'textfield',
                			emptyText:'请输入型号名称',
                			allowBlank:false,
                			name:'name',
                			value:record.get('text')
                		},{
                			xtype:'numberfield',
                			emptyText:'请输入维护周期(月)',
                			minValue:1,
                			maxValue:12,
                			allowBlank:false,
                			name:'repairCycle',
                			value:record.raw.repairCycle
                		},{
                			xtype:'numberfield',
                			emptyText:'请输入维护里程',
                			allowBlank:false,
                			name:'repairMileage',
                			value:record.raw.repairMileage
                		},{
                			xtype:'button',
                			iconCls:'accept_button',
                			text:'确定',
                			handler:function(bt){
                				var form = bt.up('form');
                				if(!form.isValid()){
                					return;
                				}
                				var data = form.getValues();
                				data.id = record.get('id');
                				var params = {
									data : Ext.JSON.encode(data)
								};
								var url = 'manage/sys/repairstandard/save';
								app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,form,"正在保存中...",function(ret){
									if( ret.success ){
										record.set('text',data.name);
										record.set('repairCycle',data.repairCycle);
										record.set('repairMileage',data.repairMileage);
										record.raw.repairCycle = data.repairCycle;
										record.raw.repairMileage = data.repairMileage;
										record.commit();
						        		bt.up('#mainMenu').hide();
						      		}
								});
                			}
                		}]
                	}]}});
              items.push({ text: '删除',iconCls:'delete_button' ,action:'del'});
    	}
    	Ext.create('Ext.menu.Menu', { 
    		itemId:'mainMenu',
    		record:record,
    		enableFocusableContainer:false,
    		defaults:{
    			xtype:'menuitem',
    			canActivate: true,
    			enableFocusableContainer:false,
                //hideOnClick: false,
    			listeners:{
	        		click:'onCtxMenuClick',
	        		scope:me
	        	}
    		},
            items: items
        }).showAt(e.getXY());
	},
	onCtxMenuClick:function(item){
		if(item.action == 'del'){
			var menu = item.up('menu');
			var record = menu.record;
			if(record.hasChildNodes()){
				Ext.Msg.alert('系统提示','请先删除子项！');
				return;
			}
			Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
				if(flag=='yes'){
					var url = 'manage/sys/repairstandard/delete';
					app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{ids:record.get('id')},function(ret){
						if( ret.success ){
							record.parentNode.removeChild(record);
							Ext.Msg.alert('系统提示','删除成功！');
						}
					});
				}
			});
		}
	},
	onAjaxToMenuSave:function(btn,data,record){
		
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
		var win =	Ext.create('app.view.trans.sys.TbSysRoleEdit');
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
		if(mds.data.CORP_ID == 'all_corp' && window.GL.userCode != 1){
			Ext.Msg.alert('系统提示',mds.data.ROLE_NAME + '是系统角色，不能修改!');
			return false;
		}
		var win =	Ext.create('app.view.trans.sys.TbSysRoleEdit');
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
				var url = 'trans/sys/sysrole/save';
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
			if(record.data.CORP_ID == 'all_corp' || record.data.ROLE_ID == 1){
				Ext.Msg.alert('系统提示',record.data.ROLE_NAME + '是系统角色，不能删除!');
				return false;
			}
			if(i == 0){
				ids = record.data.ROLE_ID;
			}else{
				ids = ids + "," + record.data.ROLE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(flag){
			if(flag=='yes'){
				var store = grid.getStore();
				var url = 'trans/sys/sysrole/delete';
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
