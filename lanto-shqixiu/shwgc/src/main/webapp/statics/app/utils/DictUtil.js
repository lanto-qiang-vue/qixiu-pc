Ext.define('app.utils.DictUtil', {
	singleton:true,

	getFieldName:function(code){
		var store = Ext.getStore('dict.'+code.substr(0, 4));
		if( Ext.isEmpty(store) ){
			return code;
		}else{
			var record = store.findRecord('code',code);
			return record?record.get('name'):code;
		}
	},
	
	loadDicts : function(url, params, model){
		if( Ext.isEmpty(Ext.ModelManager.getModel(model)) ){
			Ext.syncRequire(model);
		}
		Ext.Ajax.request({
		    url: url,
		    async: false, 
		    params : params,
		    success: function(response, opts) {
		        var ret = Ext.decode(response.responseText);
		        if( ret.success && Ext.isArray(ret.data) ){
		        	for(var i=0;i<ret.data.length;i++){
		        		app.utils.DictUtil.loadDict(model,ret.data[i]);
		        	}
		        }
		    }
		});
	},
	
	//构建dictStore.
	loadDict :function(model,data){
		var dictName = 'dict.'+data.group;
		var st = Ext.getStore(dictName);		
		if( Ext.isEmpty(st) ){
			st = Ext.create('Ext.data.Store',{
				storeId: dictName,
				model:model
			});
		}
		if(!st.findRecord('code',data.code)){
			st.add(data);
		}
		return st;
	}

});