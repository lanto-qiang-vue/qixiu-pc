/** Months picker
      重写 field.Date
**/
Ext.define('app.ux.MonthField', {
   extend:'Ext.form.field.Date',
   alias: 'widget.monthfield',
   requires: ['Ext.picker.Month'],
   alternateClassName: ['Ext.MonthPicker','Ext.form.DateField', 'Ext.form.Date'],
   selectMonth: null,
   createPicker: function() {
       var me = this,
       format = Ext.String.format;
       return Ext.create('Ext.picker.Month', {
       	   renderTpl: [
		        '<div id="{id}-bodyEl" class="{baseCls}-body" style="height:200px;">',
		          '<div id="{id}-monthEl" class="{baseCls}-months">',
		              '<tpl for="months">',
		                  '<div class="{parent.baseCls}-item {parent.baseCls}-month">',
		                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
		                      '<a style="margin: 0 2px;" hidefocus="on" class="{parent.baseCls}-item-inner" href="#">{.}</a>',
		                  '</div>',
		              '</tpl>',
		          '</div>',
		          '<div id="{id}-yearEl" class="{baseCls}-years">',
		              '<div class="{baseCls}-yearnav">',
		                  '<div class="{baseCls}-yearnav-button-ct">',
		                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
		                      '<a id="{id}-prevEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-prev" href="#" hidefocus="on" ></a>',
		                  '</div>',
		                  '<div class="{baseCls}-yearnav-button-ct">',
		                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
		                      '<a id="{id}-nextEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-next" href="#" hidefocus="on" ></a>',
		                  '</div>',
		              '</div>',
		              '<tpl for="years">',
		                  '<div class="{parent.baseCls}-item {parent.baseCls}-year">',
		                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
		                      '<a hidefocus="on" class="{parent.baseCls}-item-inner" href="#">{.}</a>',
		                  '</div>',
		              '</tpl>',
		          '</div>',
		          '<div class="' + Ext.baseCSSPrefix + 'clear"></div>',
		        '</div>',
		        '<tpl if="showButtons">',
		            '<div id="{id}-buttonsEl" class="{baseCls}-buttons" style="padding-left:6px;text-align:left;">{%',
		                'var me=values.$comp, okBtn=me.okBtn, cancelBtn=me.cancelBtn;',
		                'okBtn.ownerLayout = cancelBtn.ownerLayout = me.componentLayout;',
		                'okBtn.ownerCt = cancelBtn.ownerCt = me;',
		                'Ext.DomHelper.generateMarkup(okBtn.getRenderTree(), out);',
		                'Ext.DomHelper.generateMarkup(cancelBtn.getRenderTree(), out);',
		            '%}<span style="margin-left:4px;text-align:left;color:blue;">双击快速选择</span></div>',
		        '</tpl>'
		    ],
           pickerField: me,
           ownerCt: me.ownerCt,
           cancelText: '清空',
           renderTo: document.body,
           floating: true,
           hight:600,
           hidden: true,
           focusOnShow: true,
           minDate: me.minValue,
           maxDate: me.maxValue,
           disabledDatesRE: me.disabledDatesRE,
           disabledDatesText: me.disabledDatesText,
           disabledDays: me.disabledDays,
           disabledDaysText: me.disabledDaysText,
           format: me.format,
           showToday: me.showToday,
           startDay: me.startDay,
           minText: format(me.minText, me.formatDate(me.minValue)),
           maxText: format(me.maxText, me.formatDate(me.maxValue)),
           listeners: { 
		       select:        { scope: me,   fn: me.onSelect     }, 
		       monthdblclick: { scope: me,   fn: me.onOKClick     },    
		       yeardblclick:  { scope: me,   fn: me.onOKClick     },
		       OkClick:       { scope: me,   fn: me.onOKClick     },    
		       CancelClick:   { scope: me,   fn: me.onCancelClick }        
           },
           keyNavConfig: {
               esc: function() {
                   me.collapse();
               }
           }
       });
   },
   onCancelClick: function() {
       var me = this;    
   	   me.selectMonth = null;
   	   me.setValue('');
//       me.collapse();
   },
   onOKClick: function() {
       var me = this;    
	   if( me.selectMonth ) {
	              me.setValue(me.selectMonth);
	           me.fireEvent('select', me, me.selectMonth);
	   }else{
	   	   me.setValue(new Date());
	   }
       me.collapse();
   },
   onSelect: function(m, d) {
       var me = this;    
   	   me.selectMonth = new Date(( d[0]+1 ) +'/1/'+d[1]);
   }
}); 
/** Months picker **/
