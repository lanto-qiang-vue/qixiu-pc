/**
 * Created by holysky5 on 13-12-26.
 */
Ext.define('app.utils.IcCardUtil', {
    singleton: true,
    alternateClassName:'iccardutil',
    isInitCom:false,
    initCom:function(port){
    	var ActionName="InitCom";
		var Params= port + "|57600";
		var Result=plugin.CallOcx(ActionName,Params);
		if(Result != 1){
			return iccardutil.initConByEach(1);
		}
		iccardutil.isInitCom = true;
		return Result;
    },
    initConByEach:function(num){
    	var ActionName="InitCom";
		var Params= num + "|57600";
		var Result=plugin.CallOcx(ActionName,Params);
		if(Result != 1){
			if(num > 16){
				return 0;
			}
			return iccardutil.initConByEach(num + 1);
		}else{
			var d = new Date(new Date().getTime() + 365*24*60*60*1000*5);//五年
			Ext.util.Cookies.set('IC_CARD_COM_PORT',num,d);
			iccardutil.isInitCom = true;
			return Result;
		}
    },
    initComByCookie:function(num){
    	if(iccardutil.isInitCom){
    		return true;
    	}
    	var port = Ext.util.Cookies.get('IC_CARD_COM_PORT');
		if(!Ext.isEmpty(port)){
			return iccardutil.initCom(port);
		}else{
			return iccardutil.initConByEach(num);
		}
    },
    writeIcCard:function(params){
		var ActionName="WriteIcCard";
	//	var Params="1|12345|刘三姐|2222|12345|66666|test|test";
		var Result=plugin.CallOcx(ActionName,params);
		if(Result != 1){
			Ext.Msg.alert('系统提示','该卡写卡失败：[' + Result + ']!');
		}
		return Result;
    },
    getIcCardSn:function(){
    	var ActionName="GetIcCardSn";
		var Params="";
		var Result=plugin.CallOcx(ActionName,Params);
		return Result;
    },
    readIcCard:function(){
    	try{
    		var ActionName="ReadIcCard";
			var Params="";
			var Result=plugin.CallOcx(ActionName,Params);
			var r = Result.split('|');
			if(!r || r[0] == 0 || r.length < 3){
				Ext.Msg.alert('系统提示','读卡失败：[' + Result + ']!');
				return null;
			}
			return r;
    	}catch(err){
    		Ext.Msg.alert('系统提示','读卡失败,请检查是否安装插件或浏览器版本是否支持!');
    		return null;
    	}
    }
});
