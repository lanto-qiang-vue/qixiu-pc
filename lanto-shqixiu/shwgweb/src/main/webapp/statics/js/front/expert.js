var editor;
$(function(){	
	
  	
	
	$('#qusttypepanel a').click(function(){
		$(this).addClass('active').siblings('a').removeClass('active');
	});
	var check_is_login = $("#check_is_login").html();
	if(check_is_login == '1'){
		editor = KindEditor.create('textarea[name="content"]', {
			resizeType : 1,
			allowPreviewEmoticons : false,
			allowImageUpload : true,
//			afterFocus : function() {				
//				if(editor.html() == '<span id="dt" style="color:#D6D6D6;">请尽可能详细的写明您咨询车辆的信息，以便专家更准确的为您解答...</span>'){
//					editor.html('');
//				}
//			},
//			afterBlur : function() {
//				if(editor.html() == null || editor.html() == ''){
//					editor.html('<span id="dt" style="color:#D6D6D6;">请尽可能详细的写明您咨询车辆的信息，以便专家更准确的为您解答...</span>');
//				}
//			},
			themeType : 'simple',
			uploadJson : ctx + '/cdf/upload',
            fileManagerJson : '../jsp/file_manager_json.jsp',
            allowFileManager : false,
			items : [
				'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
				'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
				'insertunorderedlist', '|', 'emoticons', 'image', 'link', '|','fullscreen']
		});
	}
	
	$('#submitbutton').click(function(){
		if(!$(".content").val()){
            layer.msg('请填写问题！', {time: 2000, icon:5});
            return;
		}
		var param={
			content: $(".content").val()
		}
	});
});
var layedit = layui.layedit;
var editIndex;

//不同浏览器的监听事件
function addEvent(elm, evType, fn, useCapture) {
	   	if (elm.addEventListener) {
	  		elm.contentWindow.addEventListener(evType, fn, useCapture);//DOM2.0
   		return true;
	}
	else if (elm.attachEvent) {
    	var r = elm.contentWindow.attachEvent('on' + evType, fn);//IE5+
    	return r;
	}else {
		elm['on' + evType] = fn;//DOM 0
	}
}
















