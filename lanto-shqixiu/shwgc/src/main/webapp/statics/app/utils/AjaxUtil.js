Ext.define('app.utils.AjaxUtil', {
	singleton:true,
	
	insert : function(url, params, record, store, win){
		Ext.Ajax.request({
		    url: url,
		    params: params,
		    method : 'POST',
		    success: function(response, opts) {
		        var ret = Ext.decode(response.responseText);
		        if( ret.success ){
		        	if( !Ext.isEmpty(record) ){
		        		record.set(ret.data);
		        		record.commit();
		        		if(!Ext.isEmpty(store) ){
		        			store.insert(0,record);
		        		}
		        	}
		        	if( !Ext.isEmpty(win) ) win.close();
		        }
		    }
		});
	},
	
	update : function(url, params, record, store, win){
		Ext.Ajax.request({
		    url: url,
		    params: params,
		    method : 'POST',
		    success: function(response, opts) {
		        var ret = Ext.decode(response.responseText);
		        if( ret.success ){
		        	if( !Ext.isEmpty(record) ){
		        		record.set(ret.data);
		        		record.commit();
		        	}
		        	if( !Ext.isEmpty(win) ) win.close();
		        }
		    }
		});
	},
	
	del : function(url, params, record){
		Ext.Ajax.request({
		    url: url,
		    params: params,
		    method : 'POST',
		    success: function(response, opts) {
		        var ret = Ext.decode(response.responseText);
		        if( ret.success ){
		        	if( !Ext.isEmpty(record.store) ){
		        		record.store.remove(record);
		        	}
		        }
		    }
		});
	}
});