Ext.define('app.utils.component.ActionTextColumn', {  
    extend: 'Ext.grid.column.Action',  
    alias: ['widget.actiontextcolumn'],  
    constructor: function(config) {  
        var me = this,  
            cfg = Ext.apply({menuText:config.fname,text:config.fname}, config),  
            items = cfg.items || [me],  
            l = items.length,  
            i,  
            t,
            href,
            item;  
        delete cfg.items;  
        me.innerCls='',
        me.callParent([cfg]);  
        me.items = items;  
        me.renderer = function(v, meta, record) { 
        	t = v;
            v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments)||'' : '';  
            meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';  
            for (i = 0; i < l; i++) {  
                item = items[i];  
                item.disable = Ext.Function.bind(me.disableAction, me, [i]);  
                item.enable = Ext.Function.bind(me.enableAction, me, [i]);  
                /*v += '<img alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) + 
                    '" class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (item.disabled ? Ext.baseCSSPrefix + 'item-disabled' : ' ') + (item.iconCls || '') + 
                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope||me.scope||me, arguments) : (me.iconCls || '')) + '"' + 
                    ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + ' />';*/  
                
                if(item.hrefField) {
                	href = record.get(item.hrefField);
                }else {
                	href = "javascript:void(0);";
                }
                if((!Ext.isFunction(item.isShow) && item.isShow) || (Ext.isFunction(item.isShow) && item.isShow(t, meta, record))) {
	                v += '<a href="' + href + '"' +   
	                    ' class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (item.disabled ? Ext.baseCSSPrefix + 'item-disabled' : ' ') + (item.cls || '') +  
	                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope||me.scope||me, arguments) : (me.iconCls || '')) + ' row_btn"' +  
	                    ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>' + (item.text || me.text) + '</a>';
                }
            }
            return v;  
        };  
    }  
});  