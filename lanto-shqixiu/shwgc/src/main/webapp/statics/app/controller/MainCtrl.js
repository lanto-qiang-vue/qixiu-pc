Ext.define('app.controller.MainCtrl',{
	extend : 'Ext.app.Controller',
    views: [
		'app.utils.component.ActionTextColumn',
		'app.ux.UploadPanel',
		'app.ux.DateTime',
		'app.ux.TabCloseMenu',
		'app.ux.MonthField',
		'app.ux.ProgressBarPager',
		'app.ux.DateTimeField',
		'app.ux.HtmlEditorImage',
		'app.ux.Notification',
		'app.ux.Plupload',
		'app.ux.PluploadButton',
		'app.ux.SlmComboBox',
		'app.ux.CombGrid',
		'app.ux.Menu'
    ],
   	stores:[
   			],
   	
	init : function() {
		var me = this;
		me.control({
			'panel[itemId=menuPanel] dataview' : {
				itemclick : me.openModule
			}
		});
	},

	openModule : function(view, r, item, index, e, eOpts) {
		var me = this;
		var record = {data:null};
		var targetEl = Ext.fly(e.getTarget('.side-menu-a'));
		if(targetEl){
			var children = r.get('children');
			if(children && children.length > 0){
				var chid = children[0];
				if(chid.funcType == 1){
					record.data = chid;
				}else{
					var ch = chid.children;
					if(ch && ch.length > 0){
						record.data = ch[0];
					}
				}
			}else{
				return false;
			}
		}else{
			var targetMenu2 = Ext.fly(e.getTarget('.menu2'));
			if(!targetMenu2){
				return false;
			}
			var funcId = targetMenu2.getAttribute('data-funcid');
			var childrens = r.get('children');
			Ext.each(childrens,function(children){
				if(children.funcType == 1){
					if(children.funcId == funcId){
						record.data = children;
					}
				}else{
					var childs = children.children;
					Ext.each(childs,function(child){
						if(child.funcId == funcId){
							record.data = child;
						}
					});
				}
			});
		}
		if (!record.data.funcCode) return false;
		var clz = me.application.name + '.controller.' + record.data.funcCode+ "Ctrl";
		// load model ctrl and init.
		if(record.data.noCtrl != 1){
			if (Ext.isEmpty(Ext.ClassManager.get(clz))) {
				try {
					this.getController(clz);
				} catch (err) {
					Ext.Msg.alert('Error', 'load ' + clz
							+ " error !<br>Name:" + err.name
							+ "<br>message:" + err.message);
				}
			}
		}
		
		var tpPath = record.data.funcCode + 'MngPanel';
		if(record.data.noCtrl == 1){
			tpPath = record.data.funcCode + 'MngPanel' + record.data.funcId;
		}
		var tabPanel = Ext.ComponentQuery.query('panel[itemId=maintabs]')[0];
		var tps = Ext.ComponentQuery.query('panel[itemId=' + tpPath + ']');
		var tp = null;
		if(tps && tps.length > 0){
			tp = tps[0];
		}
		if(tabPanel.items.getCount()>=10 && Ext.isEmpty(tp)){
			Ext.Msg.alert('提示','您当前打开的标签页数量过多，请关闭不需要使用<br>的标签页（页面过多会影响系统速度）！');
        	return false;
        }
		if (Ext.isEmpty(tp)) {
			try {
				Ext.create("widget.uxNotification", {
			        title: "信息提示",
			        corner: "br",
			        width:250,
			        stickOnClick: false,
			        autoClose:true,
			        manager: "desktop",
			        iconCls: "info_a_icon",
			        html: '<i class="' + record.data.iconFont + ' bigger-140 blue"></i> 正在载入菜单,请稍候...<br/>菜单名称:' + record.data.funcName
			    }).show();
				clz = me.application.name + '.view.' + record.data.funcCode+ "MngPanel";
				tp = Ext.create(clz,{funcId:record.data.funcId,itemId:tpPath,topLevel:record.data.topLevel, title:'<i class="' + record.data.iconFont + ' bigger-120"></i> ' + record.data.funcName, closable:true,tooltip:'点击鼠标右键可关闭更多页面'});
				tabPanel.add(tp);
			} catch (err) {

                app.utils.FunUtils.printStack(err);
				Ext.Msg.alert('Error', 'create ' + clz
						+ " panel error !<br>Name:" + err.name
						+ "<br>message:" + err.message);
			}
		}
		tabPanel.setActiveTab(tp);
	}
});
