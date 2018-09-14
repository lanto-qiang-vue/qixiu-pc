/**
 * This file includes the required ext-all js and css files based upon "theme" and "direction"
 * url parameters.  It first searches for these parameters on the page url, and if they
 * are not found there, it looks for them on the script tag src query string.
 * For example, to include the neptune flavor of ext from an index page in a subdirectory
 * of extjs/examples/:
 * <script type="text/javascript" src="../../examples/shared/include-ext.js?theme=neptune"></script>
 */
(function() {
    
   var path = "statics/";

    document.write('<link rel="stylesheet" type="text/css" href="' + path + 'js/ext/resources/css/ext-all-neptune.css"/>');
    document.write('<link rel="stylesheet" type="text/css" href="' + path + 'js/swiper/swiper.min.css"/>');
    document.write('<script type="text/javascript" src="' + path + 'js/ext/ext-all.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/ext/locale/ext-lang-zh_CN.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/jquery-1.10.2.min.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/upload/plupload.full.min.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/upload/i18n/zh_CN.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/swfupload/swfupload.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/extjs-base-all.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/Tip.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'app/view/App.js"></script>');
    
    var theme = 'neptune';
    bodyStyle = 'bd_' + theme;
    fieldCls = 'field_' + theme;
})();

	function InitOcx(){
			var MisID="JrIeFrV2";
			var MisName="军软打印插件V2";
			var MainDllName="JrIeFrV2.dll";
			var UpdateServer= "http://219.137.166.188:10212";
			var Verification='4c12564376f2dfb3a9be5fdd137030d2';
			var VersionNo='V001';
			plugin.InitOcx(MisName,MainDllName,UpdateServer,MisID,Verification,VersionNo,''); 
		}
		if(document.all){
			document.write('<object id="plugin" classid="clsid:0EFD0793-8BFE-4622-BCE2-4FD74647986A" width="0" height="0"></object>');
		}else{
		    document.write('<object id="plugin" type="application/x-itst-activex" progid="JrIeOcx.JrIeOcxPanel" width="0" height="0"></object>');
		}
		
		function InitTxOcx() {
			var MisID = "HttpSrv";
			var MisName = "Http通讯插件";
			var MainDllName = "HttpSrv.dll";
			var UpdateServer = "http://219.137.166.188:10212";
			var Verification = '226425b9f30a34bbe1b61f18ec8edde0';
			var VersionNo = 'V001';
			var ReservedParams="{'debug':'true','srvUrl':'http://localhost:8080/MmDtMisServer_C/servlet/TransServlet'}";
			var result = plugin.InitOcx(MisName, MainDllName, UpdateServer, MisID,
					Verification, VersionNo, '');
			return result;
		}
		
		function InitCardOcx() {
			var MisID="JrIcCardRw";
			var MisName="军软IC卡读写插件";
			var MainDllName="JrIcCardRw.dll";     
			var UpdateServer="http://219.137.166.188:10212"; 
			var Verification='c128c39bfb121e2207567113cef481dd';
			var VersionNo='V001';
			var ReservedParams="{debug:'false'}";
			 
			plugin.InitOcx(MisName,MainDllName,UpdateServer,MisID,Verification,VersionNo,ReservedParams); 

		}

		
		function FreeOcx() {
			plugin.FreeOcx();
		}
       
       
       function changeStyle(obj){
       		setParam(obj);
       }
       
       function setParam(param) {
            var queryString = "theme=" + param;
            location.search = queryString;
        }
        
        function getQueryParam(name) {
	        var regex = RegExp('[?&]' + name + '=([^&]*)');
	
	        var match = regex.exec(location.search);
	        return match && decodeURIComponent(match[1]);
	    }
	    
	    function getCookieValue(name){
	        var cookies = document.cookie.split('; '),
	            i = cookies.length,
	            cookie, value;
	
	        while(i--) {
	           cookie = cookies[i].split('=');
	           if (cookie[0] === name) {
	               value = cookie[1];
	           }
	        }
	
	        return value;
	    }
        var themes = getQueryParam('theme') || getCookieValue('EXT_THEMES_COOKIE')  || 'classic';
        var d = new Date(new Date().getTime() + 365*24*60*60*1000);
//   		 Ext.util.Cookies.set('EXT_THEMES_COOKIE',themes,d);
        document.cookie = "EXT_THEMES_COOKIE=" + themes + "; expires="+ d.toGMTString();
        
        var bodyStyle,fieldCls;
        
        var Base64 = { cs: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" };
	Base64.encode = function(src) {
		    var buf = [];
		    src = src.replace(/%([\da-f]{2})%([\da-f]{2})%([\da-f]{2})/ig, function($0, $1, $2, $3) {
		        $1 = parseInt($1, 16);
		        $2 = parseInt($2, 16);
		        $3 = parseInt($3, 16);
		        buf.push(Base64.cs.charAt(    $1 >> 2                ));
		        buf.push(Base64.cs.charAt(    (($1<<4)|($2>>4)) & 0x3f    ));
		        buf.push(Base64.cs.charAt(    (($2<<2)|($3>>6)) & 0x3f    ));
		        buf.push(Base64.cs.charAt(    $3 & 0x3f            ));
		        return "";
		    });
		    src = src.replace(/%([\da-f]{2})(?:%([\da-f]{2}))?/ig, function($0, $1, $2) {
		        $1 = parseInt($1, 16);
		        buf.push(Base64.cs.charAt( $1 >> 2 ));
		        if (typeof $2 == "undefined") {
		            buf.push(Base64.cs.charAt(    (($1<<4)|(0>>4))&0x3f    ));
		            buf.push("==");
		        } else {
		            $2 = parseInt($2, 16);
		            buf.push(Base64.cs.charAt(    (($1<<4)|($2>>4))&0x3f    ));
		            buf.push(Base64.cs.charAt(    (($2<<2)|(0>>6))&0x3f    ));
		            buf.push("=");
		        }
		    });
		    return buf.join("");
		};
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		function base64encode(str){
		    var out, i, len;
		    var c1, c2, c3;
		    len = str.length;
		    i = 0;
		    out = "";
		    while (i < len) {
		        c1 = str.charCodeAt(i++) & 0xff;
		        if (i == len) {
		            out += base64EncodeChars.charAt(c1 >> 2);
		            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
		            out += "==";
		            break;
		        }
		        c2 = str.charCodeAt(i++);
		        if (i == len) {
		            out += base64EncodeChars.charAt(c1 >> 2);
		            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
		            out += "=";
		            break;
		        }
		        c3 = str.charCodeAt(i++);
		        out += base64EncodeChars.charAt(c1 >> 2);
		        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		        out += base64EncodeChars.charAt(c3 & 0x3F);
		    }
		    return out;
		}
        