var editor;
$(function(){	
	
  	editor = KindEditor.create('textarea[name="content"]', {
			resizeType : 1,
			allowPreviewEmoticons : false,
			allowImageUpload : true,
			themeType : 'simple',
			uploadJson : ctx + '/cdf/upload',
            fileManagerJson : '../jsp/file_manager_json.jsp',
            allowFileManager : false,
			items : [
				'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
				'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
				'insertunorderedlist', '|', 'emoticons', 'image', 'link', '|','fullscreen']
		});
	
	$('#cnanswerbtn').click(function(){
		var quesId = $('#quesId').val();
		var answerId = $(this).attr('data-id');
		var params = {
			quesId:quesId,
			answerId:answerId
		};
		var url = ctx + "/center/adoptAnswer.do";
		layer.confirm('确认要采纳该回答吗？', {
			icon:3,
			btn : ['确定', '取消']
			}, function() {
				ajaxLoading(url,params,$(this),'采纳中...',function(ret){
					layer.alert('回答采纳成功！', {icon : 1,end:function(){
						window.location.reload();
					}});
				});
			});
		
	 });
	
	$('#submitbutton').click(function(){
		var quesId = $('#quesId').val();
		var content = editor.html(); 
		var text = editor.text();
		if(!text || text.length < 5){
			layer.alert('请输入回答问题的描述至少在5个字符以上!',{icon:2});
			return ;
		}
		var params = {
			quesId:quesId,
			content:content
		};
		var url = ctx + "/center/submitAnswer.do";
		ajaxLoading(url,params,$(this),'提交中...',function(ret){
			layer.alert('回答问题成功！', {icon : 1,end:function(){
				window.location.reload();
			}});
		});
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
















