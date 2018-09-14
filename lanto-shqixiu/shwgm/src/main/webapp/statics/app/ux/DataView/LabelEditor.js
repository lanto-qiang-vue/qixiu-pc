/**
 *
 */
Ext.define('app.ux.DataView.LabelEditor', {

    extend: 'Ext.Editor',

    alignment: 'tl-tl',

    completeOnEnter: true,

    cancelOnEsc: false,

    shim: true,

    autoSize: {
        width: 'boundEl',
        height: 'field'
    },

    labelSelector: 'x-editable',

    requires: [
        'Ext.form.field.Text'
    ],

    constructor: function(config) {
        config.field = config.field || Ext.create('Ext.form.field.Text', {
//            allowOnlyWhitespace: false,
            selectOnFocus:true
        });
        this.callParent([config]);
    },

    init: function(view) {
        this.view = view;
        this.mon(view, 'render', this.bindEvents, this);
        this.on('complete', this.onSave, this);
    },

    // initialize events
    bindEvents: function() {
        this.mon(this.view.getEl(), {
            click: {
                fn: this.onClick,
                scope: this
            }
        });
    },

    // on mousedown show editor
    onClick: function(e, target) {
        var me = this,
            item, record;
        
        if(me.isEditing){
        	me.field.blur();
        	return false;
        }
		
        if(!Ext.isEmpty(target.getAttribute('fieldId'))){
        	me.dataIndex = target.getAttribute('fieldId');
        }
			
        if (Ext.fly(target).hasCls(me.labelSelector) && !me.editing && !e.ctrlKey && !e.shiftKey) {
            e.stopEvent();
            me.isEditing = true;
            item = me.view.findItemByChild(target);
            record = me.view.store.getAt(me.view.indexOf(item));
            me.startEdit(target, record.data[me.dataIndex]);
            me.activeRecord = record;
        } else if (me.editing) {
            me.field.blur();
            e.preventDefault();
        }
    },

    // update record
    onSave: function(ed, value) {
    	var me= this;
    	var old = this.activeRecord.data[me.dataIndex];
        this.activeRecord.set(this.dataIndex, value);
        me.isEditing = false;
        if(old != value){
        	var div = Ext.query(".x-editable");
        	me.divids.push(me.dataIndex);
        	for(var i=0;i<div.length;i++){
    			for(var j=0;j<me.divids.length;j++){
    				var field = me.divids[j];
    				var fieldId = div[i].getAttribute('fieldId');
    				if(field == fieldId){
    					div[i].style.lineHeight = '20px';
	        			div[i].style.backgroundColor = "#FFE4B5";
    				}
        		}
        	}
    	}
    },
    divids : []
});

