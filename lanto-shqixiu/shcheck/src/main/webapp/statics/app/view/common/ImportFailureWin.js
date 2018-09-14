Ext.define('app.view.common.ImportFailureWin', {
    extend : 'Ext.window.Window',
    alias : 'widget.common.ImportFailureWin',
    itemId : 'common.ImportFailureWin',
    width : 600,
    height : 300,
    layout:'border',
    modal : true,
    initComponent : function() {
	    var me = this;
	    me.items = [ me.getImportPanel()];
	    try {
	    	me.callParent(arguments);
	    	
	    }catch (err){
	    	console.log(err);
	    }
    },
    
    getImportPanel : function(){
    	var me = this;
  		return {
  				xtype:'form',
  				region:'center',
  				autoScroll :true,
  				itemId:'importform',
				itemLayout:'column',
				itemColumns:1,
				bodyPadding:10,
				items: [
				        {
				        	xtype:'displayfield',
				        	name:'errorShow'
				        }
				       ],
		       dockedItems :[ {
    	            xtype : 'toolbar',
    	            dock : 'bottom',
    	            layout : {
    	                pack : 'end',
    	                type : 'hbox'
    	            },
items : ['->',
    	            		 {
    	            			 	xtype : 'button',
			    	                itemId : 'cancelBtn',
			    	                text : '返 回',
			    	                iconCls:'close_button',
			    	                handler : function(btn) {
			    		                btn.up('window').close();
			    	                }
    	            		 }
    	                     ]	
				}]
  		
  		
  		};
  	}
});