Ext.define('app.utils.AjaxCallbackUtil', {
    singleton: true,
    
    ajaxCallback: function (url, params, callback) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (response, opts) {
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret.data);
                    }
                }
            },
            failure: function (response, opts) {
                app.utils.CommonUtil.doError(opts.result);
            }
        });
    },
    
    ajaxLoadingCallback: function(url, params,loading, callback) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (response, opts) {
            	loading.setLoading(false);
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    }
                }
            },
            failure: function (response, opts) {
            	loading.setLoading(false);
                app.utils.CommonUtil.doError(opts.result);
            }
        });
    },
    
    ajaxSaveCallback: function(url, params,loading, callback) {
    	loading.setLoading("正在保存...请稍候...");
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (response, opts) {
            	loading.setLoading(false);
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    }
                }
            },
            failure: function (response, opts) {
            	loading.setLoading(false);
                app.utils.CommonUtil.doError(opts.result);
            }
        });
    },
    
    ajaxTitleCallback: function(url, params,loading,title, callback) {
    	loading.setLoading(title);
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (response, opts) {
            	loading.setLoading(false);
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    }
                }
            },
            failure: function (response, opts) {
            	loading.setLoading(false);
                app.utils.CommonUtil.doError(opts.result);
            }
        });
    },
    
     asyncAjaxTitleCallback: function(url, params,loading,title, callback) {
    	loading.setLoading(title);
        Ext.Ajax.request({
            url: url,
            async: false, 
            params: params,
            method: 'POST',
            success: function (response, opts) {
            	loading.setLoading(false);
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    }
                }
            },
            failure: function (response, opts) {
            	loading.setLoading(false);
                app.utils.CommonUtil.doError(opts.result);
            }
        });
    },

    ajaxCallbackAll: function (url, params, callback) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (response, opts) {
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    }
                } 
//                else {
//                    Ext.Msg.alert('警告11', '操作失败!' +
//                        ret.Exception.message ? ret.Exception.message
//                        : '服务器忙!');
//                }
            },
            failure: function (response, opts) {
                app.utils.CommonUtil.doError(opts.result);
            }
        });
    },

    //add by zhaotianwu 增加错误时的操作
    call: function (url, params, callback) {
        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (response, opts) {
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    } else {
                        var msg = !Ext.isEmpty(ret.msg) ? ret.msg
                            : '操作成功!'
                        Ext.Msg.alert('提示', ret.msg);
                    }
                } else {
                    Ext.Msg.alert('警告', '操作失败!' +
                        ret.Exception.message ? ret.Exception.message
                        : '服务器忙!');
                }
            }
        });
    },

     //add by zhaotianwu 增加错误时的操作(同步请求)
    asyncCall: function (url, params, callback) {
        Ext.Ajax.request({
            url: url,
            async: false, 
            params: params,
            method: 'POST',
            success: function (response, opts) {
                var ret = Ext.decode(response.responseText);
                if(ret.success) {
                    if(Ext.isFunction(callback)) {
                        callback(ret);
                    } else {
                        var msg = !Ext.isEmpty(ret.msg) ? ret.msg
                            : '操作成功!'
                        Ext.Msg.alert('提示', ret.msg);
                    }
                } else {
                    Ext.Msg.alert('警告', '操作失败!' +
                        ret.Exception.message ? ret.Exception.message
                        : '服务器忙!');
                }
            }
        });
    }

});
