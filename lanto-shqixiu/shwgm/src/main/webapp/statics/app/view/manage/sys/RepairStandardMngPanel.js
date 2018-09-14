Ext.define('app.view.manage.sys.RepairStandardMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.sys.RepairStandardMngPanel',
	itemId: 'manage.sys.RepairStandardMngPanel',
	requires:['jsf.grid.ModelGrid','app.view.common.GridTree','app.ux.Menu'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getMainPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getMainPanel : function(){
		var me = this;
		return {
			xtype:'common.GridTree',
			itemId:'treelist',
			rootVisible : true,
			useArrows : false,
    		params:{},
    		url:'manage/sys/repairstandard/treelist',
    		fields: ["repairCycle", "repairMileage","name","text","id","parId","type"],
    		columns: [{   
                xtype:"treecolumn",  
                text: "厂家 - 品牌 - 型号", 
                flex:3,
                sortable: true,
                dataIndex:"text" 
            },{
                text: "维护周期(月)",
                sortable: true,
                flex:2,
                dataIndex: "repairCycle",
                renderer: function (v,a,b,c) {
					if(b.get('type') == '3'){
						return v;
					}
                    return '';
                }
    		},{
  				text:'维护里程(公里)',
  				flex:2,
  		  		dataIndex:"repairMileage",
  		  		renderer: function (v,a,b,c) {
					if(b.get('type') == '3'){
						return v;
					}
                    return '';
                }
  			}],
  			tbar: [{
				xtype: 'button',iconCls: 'arrow_out_button', text: '展开全部',handler:function(btn){
					btn.up('treepanel').expandAll();
				}
			},{
				xtype: 'button',iconCls: 'arrow_in_button', text: '收缩全部',handler:function(btn){
					btn.up('treepanel').collapseAll();
				}
			},'->',{
				xtype: 'button',iconCls: 'icon-signin bigger-120 blue', text: 'Excel导入',handler:function(btn){
					var win =	Ext.create('app.view.manage.sys.RepairStandardImportWin');
					win.show();	
				}
			},'-',{
				xtype: 'button',iconCls: 'icon-signout bigger-120 blue', text: 'Excel导 出',handler:function(btn){
					window.open("manage/sys/repairstandard/doExport");;
				}
			},'-',{
				xtype: 'button',iconCls: 'x-tbar-loading', text: '刷新',handler:function(btn){
					btn.up('treepanel').loadTree();
				}
			}]
		};
	}
});
