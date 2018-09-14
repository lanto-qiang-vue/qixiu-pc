/**
 * Created by holysky5 on 13-12-26.
 */
Ext.define('app.utils.TaskUtils', {
    singleton: true,
    alternateClassName:'taskutils',
    maxExp: 60*30,
    exp:60*30,
    exeTask: function () {
    	Ext.TaskManager.start(this.task);
    },
    stopTask : function(){
    	Ext.TaskManager.stop(this.task);
    },
    task : {
    	run: function(x) {
        	if(app.utils.TaskUtils.exp <= 0){
        		app.utils.TaskUtils.stopTask();
        		Ext.util.Cookies.clear("clinet_login_user_cookie_value");
    			Ext.util.Cookies.clear("clinet_login_userCode_cookie_value");
    			Ext.util.Cookies.clear("clinet_login_userName_cookie_value");
        		Ext.create('app.view.common.LockLoginWin');
        	}
        	app.utils.TaskUtils.exp -- ;
        },
        interval: 1000
    },
     isLogin:function(){
     	var userid,usercode,username;
//     	if(loginTag == 'trans'){
     		userid = Ext.util.Cookies.get("clinet_login_user_cookie_value");
    		usercode = Ext.util.Cookies.get("clinet_login_userCode_cookie_value");
    		username = Ext.util.Cookies.get("clinet_login_userName_cookie_value");
//     	}else{
//     		userid = Ext.util.Cookies.get("manage_login_user_cookie_value");
//    		usercode = Ext.util.Cookies.get("manage_login_userCode_cookie_value");
//    		username = Ext.util.Cookies.get("manage_login_userName_cookie_value");
//     	}
        if ( !Ext.isEmpty(userid) && !Ext.isEmpty(usercode) && !Ext.isEmpty(username) ) {
        	return true;
        }else{
        	return false;
        }
    },
    renmoveLogin:function(){
//    	if(loginTag == 'trans'){
			Ext.util.Cookies.clear("clinet_login_user_cookie_value");
			Ext.util.Cookies.clear("clinet_login_userCode_cookie_value");
			Ext.util.Cookies.clear("clinet_login_userName_cookie_value");
//		}else{
//			Ext.util.Cookies.clear("manage_login_user_cookie_value");
//			Ext.util.Cookies.clear("manage_login_userCode_cookie_value");
//			Ext.util.Cookies.clear("manage_login_userName_cookie_value");
//		}
    },
    appInfos:{
    	image:'statics/images/loginrepair.png',
    	title:'维修端',
    	requires:[
			'app.store.FuncPower',
   			'app.store.FuncButton',
   			'app.store.BelongArea']
    }
});
