/**
 * Created by liuxin on 2015-04-24.
 */
Ext.define('app.ux.ItemSelGrid2', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.itemselgrid2',
	rowSelType : 'SIMPLE',
	floating: true,
    shadow: true,
    modal : true,
    column:'ITEM_NAME',
    editor:false,
    model:'app.model.daily.CheckSelItem',
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
			editType:Ext.create("Ext.grid.plugin.CellEditing", {
				clicksToEdit : 2
			}),
			paging:false,
			model : me.model,
//			url : 'manage/daily/checkbusiness/list',
			store:me.store,
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:me.column,flex:1,text:me.columnText,sortable:false,editor:me.editor}
			],
			btns : []
		};
	}

});