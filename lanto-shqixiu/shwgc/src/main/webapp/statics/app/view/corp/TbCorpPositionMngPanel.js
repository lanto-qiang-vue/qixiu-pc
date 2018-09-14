Ext.define('app.view.corp.TbCorpPositionMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.corp.TbCorpPositionMngPanel',
	itemId: 'corp.TbCorpPositionMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	change:0,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getMapPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getMapPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId:'mapPanel',
			bodyPadding : 5,
			frame:true,
			region : 'center',
			html:'<iframe height="100%" width="100%" src="client/corp/tbcorpposition/position" scrolling="yes" frameborder="0" id="bmapFrame" name="bmapFrame"></iframe>',
			bbar:[{xtype:'form',itemId:'map_form',
							layout : {
								pack : 'start',
								type : 'hbox'
							},
							border:0,
							frame:true,
							defaults: {margin:'0 2 0 2'},
							items:[{
						            	xtype:'textfield',
						            	name:'addr',
						            	width:300,
						            	margin:'0 2 0 40',
						            	tooltip:'地址搜索用于根据地址查找地图上的位置以便于企业定位！',
						            	emptyText:'地址搜索'
						            },
									{xtype:'button',text:'搜索',iconCls:'icon-search bigger-120 blue',width:60,handler : function(btn) {
										var form = btn.up('form[itemId=map_form]').getForm();
										var params = form.getValues();
										bmapFrame.window.setAddPlace(params.addr,form.findField('result'));
									}},
									{xtype:'button',text:'清除',iconCls:'icon-reply bigger-120 blue',width:60,handler : function(btn) {
											var form = btn.up('form[itemId=map_form]').getForm();
											form.reset();
											bmapFrame.window.stopAnimaMarker();
											bmapFrame.window.closeCircles();
										}
									},{
						            	xtype:'displayfield',
						            	fieldStyle:'color:red;',
						            	width:250,
						            	name:'result'
						            },{
										xtype : 'button',
										itemId : 'panBtn',
										icon : 'images/menus/1002.png',
										text : '全景地图',
										handler : function(btn) {
											if(btn.text == '全景地图'){
												btn.setText('取消全景');
												bmapFrame.window.toPanorama();
											}else{
												btn.setText('全景地图');
												bmapFrame.window.closePanorama();
											}
										}
								    },{xtype:'button',text:'编辑模式',iconCls:'edit_button',handler : function(btn) {
											bmapFrame.window.toEdit();
										}},
						              {xtype:'button',text:'保 存',iconCls:'save_button',handler : function(btn) {
										var params = {};
										params.CORP_ID = bmapFrame.window.$('#corpId').html();
										params.CORP_ADDR = bmapFrame.window.$('#corpAddr').val();
										params.CORP_TEL = bmapFrame.window.$('#corpTel').val();
										params.CORP_STAR_LEVEL = bmapFrame.window.$('#corpStarLevel').val();
										params.SELF_INTRODUCTION = bmapFrame.window.$('#selfIntroduction').html();
										params.LONGITUDE = bmapFrame.window.marker.getPosition().lng;
										params.LATITUDE = bmapFrame.window.marker.getPosition().lat;
										Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
											if(flag=='yes'){
												var url = "client/corp/tbcorpposition/savePosition";
												Ext.Ajax.request({
										            url: url,
										            params: {data:Ext.JSON.encode(params)},
										            method: 'POST',
										            success: function (response, opts) {
										                var ret = Ext.decode(response.responseText);
										                if(ret.success) {
										                	me.down('panel').update('<iframe height="100%" width="100%" src="client/corp/tbcorpposition/position" scrolling="yes" frameborder="0" id="bmapFrame" name="bmapFrame"></iframe>');
										                    Ext.Msg.alert('系统提示','保存成功！'); 
										                }
										            },
										            failure: function (response, opts) {
										               Ext.Msg.alert('系统提示','保存失败！');
										            }
										        });
											}
										});
								}}]
					}]
		};
	}
});
