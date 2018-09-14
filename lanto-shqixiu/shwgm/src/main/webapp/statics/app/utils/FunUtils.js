/**
 * Created by holysky5 on 13-12-26.
 */
Ext.define('app.utils.FunUtils', {
    singleton: true,
    alternateClassName:'funutils',    
    /**
     *单选
     */
    singleChecks: function (grid) {
        var mds = grid.getSelectionModel().getSelection();
        var ret = {success: false, result: []};
        if(!Ext.isEmpty(mds)) {
            if(mds.length > 1) {
                Ext.MessageBox.alert('警告', '只能选择一条数据!');
            } else {
                ret.success = true;
                ret.result = mds[0];
            }
        } else {
            Ext.MessageBox.alert('警告', '未选择数据!');
        }
        return ret;
    },
    /**
     * 多选
     * @param {} grid
     * @return {}
     */
    mutChecks: function (grid) {
        var mds = grid.getSelectionModel().getSelection();
        var ret = {success: false, result: []};
        if(!Ext.isEmpty(mds)) {
            ret.success = true;
            ret.result = mds;
        } else {
            Ext.MessageBox.alert('警告', '未选择数据!');
        }
        return ret;
    },
   
    //金额显示格式
    formatAmount:function(v){
    	if( Ext.isEmpty(v)){
    		return '0.00'
        }
        return parseFloat(v).toFixed(2);
    },
    rendererEdit:function(v){
    	if(Ext.isEmpty(v)){
			return '<div style="color:#2196f3;width:100%;text-align:center;"><i class="icon-edit"></i> 请填写...</div>'
		}
		return '<span data-qtip="' + v + '">' + v + '</span>';
    },
    rendererEditDate:function(v){
    	if(Ext.isEmpty(v)){
			return '<div style="color:#2196f3;width:100%;text-align:center;"><i class="icon-edit"></i> 请填写...</div>'
		}
		if(Ext.isDate(v)){
			return Ext.util.Format.date(v,'Y-m-d');
		}
		return v;
    },
    rendererFile:function(v){
    	if(Ext.isEmpty(v)){
			return '<div style="color:#2196f3;width:100%;text-align:center;cursor: pointer;"><span class="uptext"><i class="icon-circle-arrow-up"></i> 点击上传</span></div>'
		}
		return v;
    }, 
    rendererDown:function(v,c,r){
    	if(!Ext.isEmpty(v)){
			return '<a href="#" class="blue"><i class="icon-circle-arrow-down"></i> 下载</a> ' + v;
		}
		return v;
    }, 
    renderer: function (v) {
        if(v) {
            return app.utils.DictUtil.getFieldName( '' + v);
        }
        return v==0?'':v;
    },
    findAreaByCode: function (v) {
        var retVal = v;
        if(v) {
            var st = Ext.getStore("sys_belong_area");
            st.each(function (record) {
                if(record.get("CODE") == v ) {
                    retVal = record.get("NAME");
                    return false;
                }
            });
        }
        return retVal;
    },
    findDisplayByCode: function (storeName,v,code,name) {
        var retVal = v;
        if(v) {
            var st = Ext.getStore(storeName);
            var record = st.findRecord(code,v);
			return record?record.get(name):code;
        }
        return retVal;
    },
    /**
     *根据用户id查找用户名,如果不存在则返回参数v
     * @param v   用户id
     * @returns {*}
     */
    findDealerUserByCode: function (v) {
        var retVal = v;
        if(v) {
            var st = Ext.getStore("sys_dealer_users");
            st.each(function (record) {
                if(record.get("CODE") == v) {
                    retVal = record.get("NAME");
                    return false;
                }
            });
        }
        return retVal;
    },
    
    findDealerUserById: function (v) {
        var retVal =v;
        if(v) {
        	if(v==0){
        	  return '';
        	}else{
        	 var st = Ext.getStore("sys_dealer_users");
	             st.each(function (record) {
	                if(record.get("U_ID") == v) {
	                    retVal = record.get("NAME");
	                    return false;
	                }
	             });
        	}
        }
        return retVal;
    },
    findBizNameByCode: function (type, v) {
        var retVal = v;
        if(type && v) {
            var st = Ext.getStore("sys_bizCode");
            st.each(function (record) {
                var t = record.get("TYPE");
                var c = record.get("CODE");
                if(type == t && c == v) {
                    retVal = record.get("NAME");
                    return false;
                }
            });
        }
        return retVal;
    },
    findBizNameById: function (type, v) {
        var retVal = v;
        if(type && v) {
            var st = Ext.getStore("sys_bizCode");
            st.each(function (record) {
                var t = record.get("TYPE");
                var id = record.get("ID_");
                if(type == t && id == v) {
                    retVal = record.get("NAME");
                    return false;
                }
            });
        }
        return retVal;
    },
    getNameById: function (type) {
        return Ext.pass(this.findBizNameById, type);
    },

    createHyperlinks: function (items) {
        (items)
        var v = '';
        var i = 0;
        Ext.each(items, function (item) {
            v += Ext.String.format('<a href="###" class="x-action-col-icon x-action-col-{0}   ">[{1}]</a>'
                , i, item);
            i++;
        });
        return v;
    },
    rendererDate: function (v) { 
        return Ext.Date.format(v, 'Y-m-d')
    },
    rendererDateTime: function (v) {
        return Ext.Date.format(v, 'Y-m-d H:i:s')
    },

    getCellEditorPlugin: function (grid) {
        var editor = null,
            plugins = grid.plugins;

        if(plugins instanceof Array) {
            for (var i = 0; i < plugins.length; i++) {
                if(Ext.getClassName(plugins[i]) == 'Ext.grid.plugin.CellEditing') {
                    editor = plugins[i];
                    break;
                }
            }
        }
        else {
            if(Ext.getClassName(plugins) == 'Ext.grid.plugin.CellEditing') {
                editor = plugins;
            }
        }
        return editor;
    },

    /**
     * 生成唯一uuid
     *
     * */
    getUUID: function () {
        return new Ext.data.UuidGenerator().generate();
    },

    /**
     * 友好格式打印错误堆栈
     * @param e
     */
    printStack: function (e) {
        var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n');
        console.log(stack);
    },
    /**
     * 将带有Y-m-d H:i:s 截断成Y-m-d
     */
    strDateTimeToDate: function (v) {
        if(v) {
            try {
                return Ext.Date.format(Ext.Date.parse(v, 'Y-m-d H:i:s'), 'Y-m-d H:i:s');
            } catch (e) {
                return '';
            }
        }
        return '';
    },
    
    /**
     * 从登录参数中获取是否计算辅料管理费标志,如果没有此参数默认计算.
     */
    getFlagOfCalcManageItem: function () {
        if(this.calcFlag) {
            return this.calcFlag;
        }
        try {
            this.calcFlag = window.GL.params['3001003'].DATA_VALUE === '10041001';
        } catch (e) {
            this.calcFlag = true;
        }

        return this.calcFlag;
    },

    /**
     *
     * @param amount
     * @param precision
     * @param type
     * @returns {{zero: number, amount: *}}
     */
    formatPrecision: function (amount, precision, type) {

        var precisionMap = {   //结算精度map 对应的乘法系数
            56311001: 0,   //元
            56311002: 1,  //角
            56311003: 2  //分
        };
        var n = precisionMap[precision];
        var ret = {zero: 0, amount: amount};

        if(type == 56321001) { //四舍五入
            ret.amount = parseFloat(amount.toFixed(n));
            ret.zero = amount - ret.amount;
        } else { //只舍不入
            ret.amount = Math.floor(amount * Math.pow(10, n)) / Math.pow(10, n);
            ret.zero = amount - ret.amount;
        }
        return ret;
    }
});
