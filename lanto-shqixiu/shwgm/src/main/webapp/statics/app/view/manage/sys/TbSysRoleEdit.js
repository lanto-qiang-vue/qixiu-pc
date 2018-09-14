Ext.define('app.view.manage.sys.TbSysRoleEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.sys.TbSysRoleEdit',
	itemId: 'manage.sys.TbSysRoleEdit',
	title: '权限编辑',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer','app.view.common.GridTree'],
	autoShow : true,
	closable : true,
	cls:'noIconTree',
	layout : 'border',
	width : 900,
	height:570,
//	autoScroll:true,
	modal : true,
	maximizable: true,
    collapsible: true,
    animCollapse: true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.sys.TbSysRoleModel',
				layout:'column',
				columns:2,
				btns:[],
				items: [
					{fname:'ROLE_ID',hidden:true},
					{fname:'ROLE_NAME',vtype:'notEmpty'},
					'ROLE_STATUS'
				]
			}]
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
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存'
					}, {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		var role_id = null;
		if(!Ext.isEmpty(record)){
			 var form = me.down('form').loadRecord(record);	
			 role_id = record.get("ROLE_ID");
		}
    	var treepanel = Ext.create('app.view.common.GridTree',{
    		border:0,
    		region:'center',
    		itemId:'treePanel',
    		params:{ROLE_ID:role_id},
    		url:'manage/sys/tbsysrole/getCheckedMenus',
    		fields: ["funcId", "funcName","funcPower",'funcButton'],
    		columns: [{   
                xtype:"treecolumn",  
                text: "功能名称", 
                flex:1.2,
                sortable: true,
                dataIndex:"funcName" 
            },{
    			  
                text: "功能权限",
                flex:3,
                sortable: true,
                dataIndex: "funcPower",
                renderer: function (v,a,b,c) {
                	var funcButton = b.data.funcButton;
                	if(Ext.isEmpty(funcButton)){
                		return '';
                	}
                	var buttons = funcButton.split(',');
                	var check = "";
                	var power = v.split(',');
                	for(var i = 0;i<buttons.length;i++){
                		var ischeck = '';
                		for(var j=0;j<power.length;j++){
                			if(buttons[i] == power[j]){
                				ischeck = " checked='true'";
                			}
                		}
                		var store = Ext.getStore('sys_funcButton');
                		var record = store.findRecord('CODE',buttons[i]);
                		var name = buttons[i];
                		if(!Ext.isEmpty(record)){
                			name = record.data.NAME;
                		}
                		check = check + " <div class='div_tree' ><sub><input type='checkbox' value='" + buttons[i] + "' name='ch_" + b.data.funcId + "'" + ischeck + " id='ch_" + b.data.funcId + buttons[i] +  "'/></sub><span onclick='app.utils.ButtonUtils.divTreeClick(\"" + b.data.funcId + "\",\"" + buttons[i] + "\");'>" + name + "</span></div>";
                	}
                    return check;
                }
    		},{
  				text:'操作',
  				flex:1,
  		  		xtype:'actiontextcolumn',
  		  		dataIndex:"ctrl",
  		  		items : [{
							text : '[全部功能]',
							isShow : this.isShow,
							handler : function(grid, rowIndex, colIndex) {
								var mds = grid.getStore().getAt(rowIndex);
								var win = grid.up('window');
								var treepanel = win.down('treepanel[itemId=treePanel]');
								var root = treepanel.getRootNode();
								app.utils.CommonUtil.setTreeNodeCheck(root,mds.data.funcId);
								var power = document.getElementsByName("ch_" + mds.data.funcId);
								var po = [];
								for(var i=0;i<power.length;i++){
									if(!power[i].checked){
										power[i].checked = true;
									}
									po.push(power[i].value);
								}
								mds.data.funcPower = po.join(",");
								mds.commit();
							}	
  						},{
							text : '[取消全部]',
							isShow : this.isShow,
							handler : function(grid, rowIndex, colIndex) {
								var mds = grid.getStore().getAt(rowIndex);
								var power = document.getElementsByName("ch_" + mds.data.funcId);
								for(var i=0;i<power.length;i++){
									if(power[i].checked){
										power[i].checked = false;
									}
								}
								mds.data.funcPower = '';
								mds.commit();
							}	
  						}]
  			}]
    	});
    	me.add(treepanel);
	},
	isShow : function(value, meta, record){
  		var isCre = record.data.leaf;
  		if(isCre){
  			return true;
  		}
  		return false;
  	}
});
