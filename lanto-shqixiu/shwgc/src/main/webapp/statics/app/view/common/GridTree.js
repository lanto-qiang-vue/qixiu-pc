Ext.define('app.view.common.GridTree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.common.GridTree',
	itemId : 'common.GridTree',

	requires : [],

	rootVisible : true,
	useArrows : true,
	title:'功能列表',
	frame : true,
	multiSelect: true,
//	singleExpand: true,
	url : '',
	params : {},
	tbar: [{
		xtype: 'button',iconCls: 'arrow_out_button', text: '展开全部',handler:function(btn){
			btn.up('treepanel').expandAll();
		}
	},{
		xtype: 'button',iconCls: 'arrow_in_button', text: '收缩全部',handler:function(btn){
			btn.up('treepanel').collapseAll();
		}
	}],

	initComponent : function() {
		var me = this;
		me.callParent();	
		me.loadTree(null);
	},

	loadTree : function() {
		var me = this;
		Ext.Ajax.request({
			url : me.url,
			params : me.params,
			success : function(response) {
				var ret = Ext.decode(response.responseText);
				console.log(ret.data);
				if (ret.success == true) {
					me.setRootNode(ret.data);
					me.expandNode(me.getRootNode());
//					me.expandAll();
				} else {
					Ext.Msg.alert('错误', '读取数据错误!');
				}
			}
		});
	}

});
