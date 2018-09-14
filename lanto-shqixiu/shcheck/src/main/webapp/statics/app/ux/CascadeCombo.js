/**
 *
 * 通用级联Combo
 * Created by holysky5 on 14-1-6.
 */
Ext.define('app.ux.CascadeCombo', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.cascadeCb',
    queryMode: 'local',
    parComponent:null,
    displayField: 'NAME',
    valueField: 'ID_', //默认值
    allowBlank: true,
    //初始化函数
    getStoreByTypeAndPid: function (type, pid) { //根据级联选择框的Type和PID来得到数据
        var st = Ext.getStore('sys_casecade_code');
        var datas = [];
        if(pid) { //如果有PID存在则初始化store
            st.each(function (record) {
                if(record.data.PID == pid && record.data.TYPE == type) {
                    datas.push(record.data);
                }
            });
        }
        return datas;
    },
    initComponent: function () {
        var me = this;
        var data = me.getStoreByTypeAndPid(me._type, me.PID);
        me.store = Ext.create('Ext.data.Store', { //重新创建一个store
            fields: [{name:'ID_',type:'string'}, 'CODE', 'NAME', {name:'PID',type:'string'}, 'TYPE']
//            listeners:{ //解决未加载前赋值可能导致的显示id而不显示对应名称的问题
//                add:function(st){
//                    console.log("需要进行select");
//                    if(me.getValue()){
//                        var rec=st.findRecord(me.valueField,me.getValue());
//                        me.select(rec);
//                    }
//                }
//            }
        });
        me.callParent(arguments);
        me.on('select',function(combo, record, index){
        	try {
            	var nextCombo = combo.next('combo[name=' + combo._next + ']');
            	if(me.parComponent){
            		nextCombo = me.parComponent.down('combo[name=' + combo._next + ']');
            	}
                if(!nextCombo) {
                    return;
                }
                var id = record[0].get("ID_");
                var nextValue = nextCombo.getValue();

                //加载
                nextCombo.store.removeAll();
                nextCombo.store.loadData(nextCombo.getStoreByTypeAndPid(nextCombo._type, id + ''));
                if(nextValue) {
                    var hasFlag = nextCombo.store.findRecord(nextCombo.valueField, nextValue);
                    if(hasFlag) {
                        nextCombo.setValue(nextValue);
                    } else {
                        nextCombo.clearValue();
                    }
                }
                var nextNextCombo = combo.next('combo[name=' + nextCombo._next + ']');
                if(me.parComponent){
            		nextNextCombo = me.parComponent.down('combo[name=' + nextCombo._next + ']');
            	}
                 if(!nextNextCombo) {
                    return;
                }
                nextNextCombo.clearValue();
            } catch (e) {
                console.log(e);
            }
        });
        me.store.loadData(data);
        
    },

    //监听函数
    listeners: {
        change: function (combo, newValue, oldValue, eOpts) {
            var selIndex = combo.store.findBy(function (rec) {
                if(rec.get(combo.valueField) == newValue) {
                    return true;
                }
            });
            if(selIndex !== -1) {
                var selRec = combo.store.getAt(selIndex);
                combo.select([selRec]);
                combo.fireEvent('select', combo, [selRec]);
            }
        },
         clear: function (combo, record, index) {
            try {
                var nextCombo = combo.next('combo[name=' + combo._next + ']');
                if(!nextCombo) {
                    return;
                }
                var id = record[0].get("ID_");
                //加载
                nextCombo.store.removeAll();
            } catch (e) {
                console.log(e);
            }
        }
    }
    
});
