/**
 * 使用前需加入requires : ['dms.utils.YearComboBox' ]
 * 使用中一些参数设定：
 * minYear：（数据类型：整型）最小年度,此参数不设置时，默认最小年份为2000年
 * nowAfter：（数据类型：整型）当前年度向后推的年度数（例：当前年度为2014年，当此参数设定为2时则下拉列表中显示的最大年度为2014 + 2 = 2016年），此参数不设置时默认为0
 * orderType：（数据类型：字符串）排序方式：desc表示降序，asc表示升序，默认为asc
 * defaultValue：（数据类型：整型）默认选择的年份(例：2014),优先级比selectThisYear、selectFirst大
 * selectedThisYear:（数据类型：布尔型）selectedThisYear=true选择当前年度，优先级比selectFirst大，默认为false
 * selectedFirst：（数据类型：布尔型）当未设置默认值defaultValue时：selectedFirst为true表示默认选择下拉列表中的第一条，为false或不设置时不选择，默认为false
 * blankItem：（数据类型：布尔型）是否有空白选项:true为有，false为没有
 */
Ext.define('app.ux.SlmComboBox', {  
    extend: 'Ext.form.ComboBox',  
    alias: ['widget.slmbox'], 
    initComponent: function() {  
	    var me = this;  
	    
	    me.storeData = [];
 		var blankItem = me.blankItem;//是否有空白选项:true为有，false为没有
	    if(blankItem == true){
	    	me.storeData.push(['', '\u00a0']);
	    }
	    var seldata = me.seldata;
	    if(!Ext.isEmpty(seldata)){
	   		for(var i=0;i<seldata.length;i++){
	   			me.storeData.push([seldata[i], seldata[i]]);
	   		}
	   	}
	    var defaultValue = me.defaultValue;//默认选择的值
	    var value = null;
	    if(!Ext.isEmpty(defaultValue)){
	    	value = defaultValue;
	    }
    	me.on('afterRender',function(){
    		if(value != null){
    			me.setValue(value);//给combo赋值
    		}
    	});
	    Ext.apply(me, {  
			fieldLabel : me.fieldLabel,
            anchor : '100%',
            forceSelection : true,// 值为true时将限定选中的值为列表中的值，值为false则允许用户将任意文本设置到字段（默认为false）。
            selectOnFocus : false,// 值为 ture时表示字段获取焦点时自动选择字段既有文本,为true时editable也要设为true(默认为false)。
            mode : 'local',
            store : new Ext.data.SimpleStore({
                        fields : ['value', 'text'],
                        data : me.storeData
            }),
            triggerAction : 'all',
            valueField : 'value',
            displayField : 'text'
	    });  
	    me.callParent();    
	 }  
});  