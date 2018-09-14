
Ext.define('app.ux.Menu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.uxmenu',
    requires: [
        'Ext.layout.container.VBox',
        'Ext.menu.CheckItem',
        'Ext.menu.Item',
        'Ext.menu.KeyNav',
        'Ext.menu.Manager',
        'Ext.menu.Separator'
    ],
    isMenu:false,
	setActiveItem: function(item) {
        var me = this;
        if (item && (item != me.activeItem)) {
            me.deactivateActiveItem();
            if (me.canActivateItem(item)) {
                if (item.activate) {
                    item.activate(true);
                    if (item.activated) {
                        me.activeItem = item;
                        me.focusedItem = item;
                    }
                } else {
                	if(me.isMenu){
                		item.focus();
                    	me.focusedItem = item;
                	}
                    
                }
            }
        }
    }
});