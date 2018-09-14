UE.registerUI('addimg',function(editor,uiName){

    editor.ACCESSTOKEN=localStorage.getItem('ACCESSTOKEN')
    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl:'/statics/js/ueditor/addimg.html',
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        //dialog的标题
        title:"添加图片",

        //指定dialog的外围样式
        cssRules:"width:600px;height:300px;",

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                    // console.log($("#"+dialog.id+'_iframe').contents())
                    // console.log($("#"+dialog.id+'_iframe').contents().find('.addimg')[0].src)
                    // var src=$("#"+dialog.id+'_iframe').contents().find('.addimg')[0].src
                    var src=$("#"+dialog.id+'_iframe').contents().find('#address').val()
                    if(src){
                        var html='<img src="'+src+'"/>'
                        editor.focus();
                        editor.execCommand('inserthtml',html);
                    }
                    dialog.close(true);
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});

    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'添加图片' ,
        title:'添加图片',
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -380px 0px;',
        onclick:function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });

    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);

UE.registerUI('addfile',function(editor,uiName){
    editor.ACCESSTOKEN=localStorage.getItem('ACCESSTOKEN')
    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl:'/statics/js/ueditor/addfile.html',
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        //dialog的标题
        title:"添加附件",

        //指定dialog的外围样式
        cssRules:"width:600px;height:300px;",

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                    var name= $("#"+dialog.id+'_iframe').contents().find('#name').val()
                    var href= $("#"+dialog.id+'_iframe').contents().find('#address').val()
                    console.log(name, href)
                    if(!href){
                        layer.msg('请上传文件', {time: 2000, icon:5})
                        return
                    }
                    if(!name){
                        layer.msg('请填写文件名', {time: 2000, icon:5})
                        return
                    }
                    html='<a href="'+href+'"  target="_blank">'+name+'</a>'
                    editor.focus();
                    editor.execCommand('inserthtml',html);

                    dialog.close(true);
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});

    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'添加附件' ,
        title:'添加附件',
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -620px -40px;',
        onclick:function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });

    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);

