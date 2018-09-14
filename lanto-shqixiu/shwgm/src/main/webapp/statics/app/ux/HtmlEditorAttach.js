
/**
* @Description	Html编辑器 插入附件控件
* @author	刘新
*/
Ext.define('app.ux.HtmlEditorAttach', {
    extend: 'Ext.util.Observable',
    alias: 'widget.zc_form_HtmlEditorAttach',
    langTitle: '插入附件',
    langIconCls: 'heditAttachIcon',
    init: function (view) {
        var scope = this;
        view.on('render', function () {
            scope.onRender(view);
        });
    },

    /**
    * 添加"插入附件"按钮
    * */
    onRender: function (view) {
        var scope = this;
        view.getToolbar().insert(2,{
            iconCls: scope.langIconCls,
            tooltip: {
                title: scope.langTitle,
                width: 60
            },
            handler: function () {
                scope.showAttachWindow(view);
            }
        });
    },

    /**
    * 显示"插入图片"窗体
    * */
    showAttachWindow: function (view) {
        var scope = this;
        var win = Ext.create('Ext.window.Window', {
            width: 700,
            height: 400,
            title: scope.langTitle,
            layout: 'fit',
            autoShow: true,
            modal: true,
            resizable: false,
            maximizable: false,
            constrain: true,
            plain: true,
            enableTabScroll: true,
            //bodyPadding: '1 1 1 1',
            border: false,
            items: [{
					xtype: 'uploadpanel',
					region:'center',
		            title: '附件列表',
		            region:'center',
		            layout : 'fit',
		            file_size_limit : app.utils.AttachCodes.file_size_limit,//改用常量配置
		            file_total_size : app.utils.AttachCodes.file_total_size,
		            file_deny_types : app.utils.AttachCodes.file_deny_types,
		            forEdit:true,
		            isProgressbar:true,
		            fileBillId : '',
		            fileBillType : app.utils.AttachCodes.HTML_EDITOR_ATTRCH
            }],
            bbar:['->',{
                    text: '确 定',
                    action: 'btn_save',
                    iconCls: 'accept_button',
                    handler: function (btn) {
                    	var upload = win.down('#fileUploadGrid');
						if(!upload.checkBlock() || !upload.checkComplete()){
							return false;
						}
                        scope.saveUploadAttach(btn, view);
                    }
                },'-', {
                    text: '取 消',
                    iconCls : 'close_button',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
        });
        
        win.down('#fileUploadGrid').reload();
    },

    /**
    * 上传附件
    * */
    saveUploadAttach: function (btn, view) {
        var scope = this;
        var windowObj = btn.up('window'); //获取Window对象
        var upload = windowObj.down('#fileUploadGrid');
        console.log(upload);
        scope.insertAttach(view, upload.getData());
        windowObj.close(); //关闭窗体
    },

    /**
    * 插入图片
    * */
    insertAttach: function (view, records) {
    	var type = ['doc','','docx','js','jsp','mp3','pdf','ppt','xls','xlsx','html','rar','zip','txt','mp3','mp4','mpg','flv','fla','exe','dll','chm','3gp','swf','pptx','xml','wav','pps','rtf','png','gif','bmp','jpg'];
        var str = '<div style="color: rgb(204, 51, 0); font-family: 宋体; font-size: 14px; line-height: 24px;width:100%;" align="left"><font color="#000099"><strong>附件：</strong></font></b>';
        str = str + '<div align="left"><ul class="attach">';
        for(var i=0;i<records.length;i++){
        	var expr = '<span style="height:20px;"><img src="js/swfupload/icons/unknown.gif"/> ';
        	for(var j=0;j<type.length;j++){
        		if('.' + type[j] == records[i].type.toLowerCase()){
        			expr = '<span style="height:20px;"><img src="js/swfupload/icons/' + type[j] + '.gif"/> ';
        		}
        	}
        	str = str + '<li><span style="font-family: monospace; font-size: 13px; white-space: pre-wrap;margin-left:10px;height:20px;line-height:20px;">' + (i+1) + '. <a href="/attach/' + records[i].fileId + '" target="_blank">' +
        			records[i].name + '</a>( ' + expr + Ext.util.Format.fileSize(records[i].size) + ' </span>)</span><br></li>';
        }
        str = str + '</ul></div>';
        view.insertAtCursor(str);
    }
});