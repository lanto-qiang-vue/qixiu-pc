Ext.define('app.utils.CommonUtil', {
	singleton : true,

	// js错误处理
	doError : function(json) {
		var exception = null;
//		var errorCode = json.Exception.errCode;
//		if (errorCode != undefined) {
//			exception = "错误代码" + errorCode + ":</br>";
//		}
		var message = json.Exception.message;
		if (message != undefined) {
			if (exception == null) {
				exception = message;
			} else {
				exception += message;
			}
		}
		Ext.Msg.alert('错误信息', exception);
	},
	
	 /**
     * 友好格式打印错误堆栈
     * @param e
     */
    printStack: function (e) {
        var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n');
        console.log(stack);
    },
	
	/**
	 * 导入提交
	 * @param form 表单对象
	 * @param url 请求URL
	 * @param callback
	 */
	importSubmit : function(form,url,callback){
		form.submit({
    		url:url,
    		method:'POST',
    		waitMsg:'正在导入...',
    		success: function(response, opts){
    			callback(opts.result);
    		},
    		failure:function(response, opts){
    			app.utils.CommonUtil.doError(opts.result);
    		}
    	});
	},

	/**
	 * 导出提交
	 * @param form 表单对象（导出查询的查询条件等）
	 * @param url 请求URL
	 */
	exportSubmit : function(form,url,params){
		form.submit({
    		url:url,
    		method:'POST',
    		params:params,
    		submitEmptyText:false
    	});
	},
	
	/**
	 * 导出提交(图片可以以文件形式导出)
	 * @param form 表单对象（导出查询的查询条件等）
	 * @param url 请求URL
	 * @param params 参数列表
	 */
	exportStandardSubmit : function(form,url,params){
		var s = form.standardSubmit;
		form.standardSubmit = true;
		this.exportSubmit(form,url,params);
    	form.standardSubmit = s;
	},
	
	downloadSubmit : function(form,url,params){
        app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			var s = form.standardSubmit;
		    form.standardSubmit = true;
		    form.submit({
		    	url:ret.url,
		    	method:'POST'
		    });
		    form.standardSubmit = s;
		});
	},
	setTreeNodeCheck:function(root,id){
		var childs = root.childNodes;
		if(Ext.isEmpty(childs)){
			return;
		}
		for(var i = 0;i<childs.length;i++){
			if(childs[i].raw.funcId == id){
				childs[i].set("checked", true);
				var panode = childs[i].parentNode;
				app.utils.CommonUtil.setTreeParentNodeCheck(panode);
				break;
			}else{
				app.utils.CommonUtil.setTreeNodeCheck(childs[i],id);
			}
		}
	},
	setTreeParentNodeCheck:function(pnode){
		if(!Ext.isEmpty(pnode)){
			pnode.set("checked", true);
			if(!Ext.isEmpty(pnode.parentNode)){
				app.utils.CommonUtil.setTreeParentNodeCheck(pnode.parentNode);
			}
		}
	},
	setPanelFuncPower:function(a,b,c,d){
		var funcId = a.funcId;
		var isLoadPage = true;
		if(!Ext.isEmpty(a.isLoadPage) && !a.isLoadPage){
			isLoadPage = false;
		}
		var store = Ext.getStore('sys_funcPower');
		var record = store.findRecord('FUNC_ID',funcId);
		if(Ext.isEmpty(record)){
			return;
		}
		var all_button = record.data.FUNC_BUTTON;
		var all_power = all_button.split(',');//['searchBtn','addBtn','editBtn','deleteBtn','submitBtn','auditBtn','printBtn','exportBtn'];
		for(var i=0;i<all_power.length;i++){
			var power = record.data.FUNC_POWER;
			var isHave = false;
			if(!Ext.isEmpty(power)){
				var power_ = power.split(',');
				for(var j =0;j<power_.length;j++){
					if(all_power[i] == power_[j]){
						isHave = true;
					}
				}
			}
			if(!isHave){
				app.utils.CommonUtil.controllerButton(a,all_power[i]);
			}else{
				if(isLoadPage){
					//if('searchBtn' == all_power[i] && !Ext.isEmpty(a.down('grid[itemId=gpanel]'))){
						//a.down('grid[itemId=gpanel]').getStore().loadPage(1);
					//}
				}
			}
		}
		
	},
	controllerButton:function(panel,btnId){
		console.log(btnId);
		app.utils.CommonUtil.setButtonHidden(panel.down('button[itemId=' + btnId + ']'),true);
		if('searchBtn' == btnId){
			//if(!Ext.isEmpty(panel.down('grid[itemId=gpanel]'))){
			//	app.utils.CommonUtil.setButtonHidden(panel.down('grid[itemId=gpanel]').down('pagingtoolbar'),false);
			//}
			//app.utils.CommonUtil.setButtonHidden(panel.down('button[itemId=resetBtn]'),true);
		}else if('submitBtn' == btnId){
			app.utils.CommonUtil.setButtonHidden(panel.down('button[itemId=cancelSubBtn]'),true);
		}else if('printBtn' == btnId){
			app.utils.CommonUtil.setButtonHidden(panel.down('button[itemId=printViewBtn]'),true);
		}
	},
	setButtonHidden: function(obj,isHide){
		if(!Ext.isEmpty(obj)){
			if(isHide){
				obj.hide();
			}else{
				obj.setDisabled(true);
			}
			var xtype = obj.xtype;
			if(!Ext.isEmpty(xtype)){
				if('button' == xtype){
					var sep = obj.next('tbseparator');
					if(!Ext.isEmpty(sep)){
						sep.hide();
					}
				}
			}
		}
	},
	setHidden:function(obj,isHide){
		if(!Ext.isEmpty(obj)){
			if(isHide){
				obj.hide();
			}else{
				obj.show();
			}
		}
	}
	

});