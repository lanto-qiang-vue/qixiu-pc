/**
 * This file includes the required ext-all js and css files based upon "theme"
 * and "direction" url parameters. It first searches for these parameters on the
 * page url, and if they are not found there, it looks for them on the script
 * tag src query string. For example, to include the neptune flavor of ext from
 * an index page in a subdirectory of extjs/examples/: <script
 * type="text/javascript"
 * src="../../examples/shared/include-ext.js?theme=neptune"></script>
 */
(function() {
	function getQueryParam(name) {
		var regex = RegExp('[?&]' + name + '=([^&]*)');

		var match = regex.exec(location.search) || regex.exec(path);
		return match && decodeURIComponent(match[1]);
	}

//	function getCookieValue(name) {
//		var cookies = document.cookie.split('; '), i = cookies.length, cookie, value;
//
//		while (i--) {
//			cookie = cookies[i].split('=');
//			if (cookie[0] === name) {
//				value = cookie[1];
//			}
//		}
//
//		return value;
//	}

//	var scriptEls = document.getElementsByTagName('script'), path = scriptEls[scriptEls.length
//			- 1].src, theme = getQueryParam('theme')
//			|| getCookieValue('EXT_THEMES_COOKIE') || 'classic', suffix = [], i = 3;
//
//	while (i--) {
//		path = path.substring(0, path.lastIndexOf('/'));
//	}
//	// path = path + "/js/ext/";
//	if (theme && theme !== 'classic') {
//		suffix.push(theme);
//	}
	path = "statics/";

	//suffix = (suffix.length) ? ('-' + suffix.join('-')) : '';

	document.write('<link rel="stylesheet" type="text/css" href="' + path + 'js/ext/resources/css/ext-all-neptune.css"/>');
	document.write('<link rel="stylesheet" type="text/css" href="' + path + 'js/swiper/swiper.min.css"/>');
	document.write('<script type="text/javascript" src="' + path + 'js/jquery-1.10.2.min.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/ext/ext-all.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/ext/locale/ext-lang-zh_CN.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/upload/plupload.full.min.js"></script>');
    document.write('<script type="text/javascript" src="' + path + 'js/upload/i18n/zh_CN.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/swfupload/swfupload.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/extjs-base-all.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/Tip.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'app/view/App.js"></script>');
	document.write('<script type="text/javascript" src="' + path + 'js/LoginTip.js"></script>');
	var theme = 'neptune';
	themes = theme;
	bodyStyle = 'bd_' + theme;
	fieldCls = 'field_' + theme;
})();

function InitOcx() {
	var MisID = "JrIeFrV2";
	var MisName = "军软打印插件V2";
	var MainDllName = "JrIeFrV2.dll";
	var UpdateServer = "http://219.137.166.188:10212";
	var Verification = '4c12564376f2dfb3a9be5fdd137030d2';
	var VersionNo = 'V001';
	plugin.InitOcx(MisName, MainDllName, UpdateServer, MisID, Verification,
			VersionNo, '');
}
if (document.all) {
	document
			.write('<object id="plugin" classid="clsid:0EFD0793-8BFE-4622-BCE2-4FD74647986A" width="0" height="0"></object>');
} else {
	document
			.write('<object id="plugin" type="application/x-itst-activex" progid="JrIeOcx.JrIeOcxPanel" width="0" height="0"></object>');
}

function FreeOcx() {
	plugin.FreeOcx();
}

function changeStyle(obj) {
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

function getCookieValue(name) {
	var cookies = document.cookie.split('; '), i = cookies.length, cookie, value;

	while (i--) {
		cookie = cookies[i].split('=');
		if (cookie[0] === name) {
			value = cookie[1];
		}
	}

	return value;
}
var themes = getQueryParam('theme') || getCookieValue('EXT_THEMES_COOKIE')
		|| 'classic';
var d = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
// Ext.util.Cookies.set('EXT_THEMES_COOKIE',themes,d);
document.cookie = "EXT_THEMES_COOKIE=" + themes + "; expires="
		+ d.toGMTString();

var bodyStyle, fieldCls;
