/**
 * Created by liuxin on 2015-04-24.
 */
Ext.define('app.ux.ItemSelGrid', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.itemselgrid',
	rowSelType : 'SIMPLE',
	floating: true,
    shadow: true,
    modal : true,
    width:500,
    height:450,
	initComponent : function() {
		var me = this;
		me.items = [me.getGridPanel()];
		me.bbar = ['->',{
			    		xtype: 'button',
			    		text:'确 定',
			    		iconCls:'accept_button',
			    		handler : function(button){
			    			var grid = me.down('grid');
			    			var mds = grid.getSelectionModel().getSelection();
			    			if(Ext.isEmpty(mds)) {
					            Ext.MessageBox.alert('警告', '未选择数据!');
					            return false;
					        } 
			    			me.callBack1(mds);
			    			me.destroy();
			    		}
			    },{
			    		xtype: 'button',
			    		text:'取 消',
			    		iconCls:'close_button',
			    		handler:function(button){
			    			me.destroy();
			    		}
			    }]
		me.callParent(arguments);
	},
	getGridPanel : function(){
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			selModel : Ext.create("Ext.selection.CheckboxModel", {
						mode : me.rowSelType 
					}),
			paging:false,
			model : 'app.model.common.Dict',
//			url : 'manage/daily/checkbusiness/list',
			store:me.store,
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'name',flex:1,text:me.columnText,sortable:false}
			],
			btns : []
		};
	}

});